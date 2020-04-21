import React, { useEffect, useState } from 'react';
import { Grid, Segment, Statistic, Container } from 'semantic-ui-react';
import { WanikaniUser, WanikaniReview, WanikaniReviewStatisticObject, WanikaniReviewStatistic } from '../../types/Wanikani';
import WanikaniApi from '../../utils/WanikaniApi';
import Calendars from '../Calendars/Calendars';
import WeakItems from '../WeakItems/WeakItems';

type StatsProps = {
    apiKey: string,
    user: WanikaniUser,
}

const Stats: React.FC<StatsProps> = ({
    apiKey,
    user,
}) => {
    const [reviews, setReviews] = useState<WanikaniReview[]>([]);
    const [reviewStatistics, setReviewStatistic] = useState<WanikaniReviewStatistic[]>([]);

    useEffect(() => {
        if (apiKey) {
            let reviewsCumul: WanikaniReview[] = [];
            let reviewStatisticCumul: WanikaniReviewStatistic[] = [];
            const getReviews = async (url: string | undefined = undefined) => {
                const reviewsObject = await WanikaniApi.getReviews(apiKey, url);

                if (Array.isArray(reviewsObject.data)) {
                    reviewsCumul = [...reviewsCumul, ...reviewsObject.data];
                    setReviews(reviewsCumul);
                }

                const nextUrl = reviewsObject?.pages?.next_url;

                if (nextUrl) {
                    getReviews(nextUrl);
                }
            }

            const getReviewStatistics = async (url: string | undefined = undefined) => {
                const reviewStatisticsObject: WanikaniReviewStatisticObject = await WanikaniApi.getReviewStatistics(apiKey, url);

                if (Array.isArray(reviewStatisticsObject.data)) {
                    reviewStatisticCumul = [...reviewStatisticCumul, ...reviewStatisticsObject.data];
                    setReviewStatistic(reviewStatisticCumul);
                }

                const nextUrl = reviewStatisticsObject?.pages?.next_url;

                if (nextUrl) {
                    getReviewStatistics(nextUrl);
                }
            }
    
            getReviews();
            getReviewStatistics();
        }
    }, [apiKey]);

    return (
        <Container style={{marginTop: '5px'}}>
            <Segment>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Statistic size='mini'>
                                    <Statistic.Label>username</Statistic.Label>
                                    <Statistic.Value>{user?.data?.username || ''}</Statistic.Value>
                                </Statistic>
                                <Statistic size='mini'>
                                    <Statistic.Label>level</Statistic.Label>
                                    <Statistic.Value>{user?.data?.level || ''}</Statistic.Value>
                                </Statistic>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Calendars reviews={ reviews } />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <WeakItems apiKey={ apiKey } reviewStatistics={ reviewStatistics } />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
};

export default Stats;