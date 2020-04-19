import React from 'react';
import { WanikaniReview } from '../../../types/Wanikani';
import { Moment } from 'moment';

import './calendar.scss';
import { Popup } from 'semantic-ui-react';

type CalendarProps = {
    date: Moment,
    reviewsByDate: {[date: string]: WanikaniReview[]},
}

const Calendar: React.FC<CalendarProps> = ({
    date,
    reviewsByDate,
}) => {
    const showCalendar = () => {
        const currentMonth = date.format('MM');
        const currentYear = date.year();

        const firstDay = date.startOf('month').day() % 6;
        const daysInMonth = date.daysInMonth();

        let tempDate = 1;

        return (
            <div>
                <div>{`${date.format('MMMM')} ${currentYear}`}</div>
                <table className='calendar'>
                    <tbody>
                        {
                            Array.from(Array(6).keys()).map((_, i: number) => {
                                return (
                                    <tr key={i} className='week'>
                                        {
                                            Array.from(Array(7).keys())
                                                .map((_, j: number) => {
                                                    if (i === 0 && j < firstDay) {
                                                        return <td key={`${i}-${j}`}>-</td>
                                                    } else if (tempDate > daysInMonth) {
                                                        return 'delete'
                                                    } else {
                                                        tempDate++;
                                                        const dateString = `${currentYear}-${currentMonth}-${`${tempDate}`.length > 1 ? tempDate : `0${tempDate}` }`;
                                                        
                                                        let stats;

                                                        if (reviewsByDate[dateString]) {
                                                            stats = reviewsByDate[dateString].reduce((stats: any, review: WanikaniReview) => {
                                                                return {
                                                                    incorrectMeaning: stats.incorrectMeaning + review.data.incorrect_meaning_answers,
                                                                    incorrectReading: stats.incorrectReading + review.data.incorrect_reading_answers,
                                                                    total: stats.total + 1,
                                                                }
                                                            }, {
                                                                total: 0,
                                                                incorrectMeaning: 0,
                                                                incorrectReading: 0,
                                                            });
                                                        }

                                                        return (
                                                            <Popup
                                                                on='click'
                                                                key={`${i}-${j}`}
                                                                trigger={
                                                                    <td 
                                                                        className={reviewsByDate[dateString] ? 'active day' : 'day'}
                                                                    >
                                                                        {tempDate - 1}
                                                                    </td>
                                                                }
                                                                disabled={!stats}
                                                                content={
                                                                    <>
                                                                        <div># of reviews: {stats?.total}</div>
                                                                        <div># of incorrect meaning: {stats?.incorrectMeaning}</div>
                                                                        <div># of incorrect reading: {stats?.incorrectReading}</div>
                                                                    </>
                                                                }
                                                            />
                                                        )
                                                    }
                                                })
                                                .filter((comp: any) => comp !== 'delete')
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    };

    return (
        <>
            {
                showCalendar()        
            }
        </>
    );
};

export default Calendar;