import React, { useState, useEffect } from 'react';
import { WanikaniReviewStatistic } from '../../types/Wanikani';
import WanikaniApi from '../../utils/WanikaniApi';

type WeakItemsProps = {
    apiKey: string,
    reviewStatistics: WanikaniReviewStatistic[],
}

const WeakItems: React.FC<WeakItemsProps> = ({
        apiKey,
        reviewStatistics,
}) => {
    const [weakItems, setWeakItems] = useState([]);

    useEffect(() => {
        const weak = reviewStatistics
            .filter((reviewStatistics: WanikaniReviewStatistic) => reviewStatistics.data.subject_type === 'vocabulary')
            .filter((reviewStatistic: WanikaniReviewStatistic) => {
                return reviewStatistic.data.percentage_correct < 70;
            });

        console.log(weak);

        const ids: number[] = weak.map((reviewStatistic: WanikaniReviewStatistic) => reviewStatistic.data.subject_id);

        const getSubjects = async (ids: number[]) => {
            const subjects = await WanikaniApi.getSubjects(apiKey, ids);
            console.log(subjects);
        };

        getSubjects(ids);
    }, [apiKey, reviewStatistics]);

    return (
        <div></div>
    )
};

export default WeakItems;