import React, { useEffect, useState, useRef } from 'react';
import { WanikaniReview } from '../../types/Wanikani';
import moment from 'moment';

import './calendars.scss';
import Calendar from './Calendar/Calendar';

type CalendarsProps = {
    reviews: WanikaniReview[]
}

const Calendars: React.FC<CalendarsProps> = ({
    reviews,
}) => {
    const [reviewsByDate, setReviewsByDate] = useState<{[date: string]: WanikaniReview[]}>({});
    const calendarEndRef = useRef<any>(null);

    useEffect(() => {
        if (calendarEndRef.current) {
            calendarEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {        
        const reviewsByDate = reviews.reduce((result: any, review: any) => {
            const date: string = review.data_updated_at.split('T')[0];

            if (result[date]) {
                result[date].push(review);
            } else {
                result[date] = [review];
            }

            return result;
        }, {});

        setReviewsByDate(reviewsByDate);

    }, [reviews]);

    return (
        <div className='calendars-container'>
            {
                Array.from(Array(10).keys()).map((i: number) => {
                    return (
                        <Calendar 
                            key={i}
                            reviewsByDate={ reviewsByDate } 
                            date={ moment().subtract(9 - i, 'months') }
                        />
                    )
                })
            }
            <div ref={calendarEndRef}></div>
        </div>
    );
};

export default Calendars;