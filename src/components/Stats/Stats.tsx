import React, { useEffect, useState } from 'react';
import { Grid, Segment, Statistic, Container } from 'semantic-ui-react';
import { WanikaniUser, WanikaniReview } from '../../types/Wanikani';
import WanikaniApi from '../../utils/WanikaniApi';
import Calendars from '../Calendars/Calendars';

type StatsProps = {
    apiKey: string,
    user: WanikaniUser,
}

const Stats: React.FC<StatsProps> = ({
    apiKey,
    user,
}) => {
    const [reviews, setReviews] = useState<WanikaniReview[]>([]);

    useEffect(() => {
        if (apiKey) {
            let reviewsCumul: any[] = [];
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
    
            getReviews();
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
                </Grid>
            </Segment>
        </Container>
    )
};

export default Stats;