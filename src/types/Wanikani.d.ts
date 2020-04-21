export interface WanikaniObjet {
    object: string;
    url: string;
    data_updated_at: string;
    pages?: WanikaniPages;
}

export interface WanikaniUser extends WanikaniUserData, WanikaniObjet {
    data: WanikaniUserData
}

export interface WanikaniUserData {
    id: string;
    username: string;
    level: number;
    profile_url: string;
    started_at: string;
    current_vacation_started_at: string,
    subscription: WanikaniSubscription,
    preferences: WanikaniPreferences,
}

export interface WanikaniSubscription {
    active: boolean;
    type: string;
    max_level_granted: string;
    period_ends_at: string;
}

export interface WanikaniPreferences {
    default_voice_actor_id: number,
    lessons_autoplay_audio: boolean,
    lessons_batch_size: number,
    lessons_presentation_order: LessonsPresentationOrder,
    reviews_autoplay_audio: boolean,
    reviews_display_srs_indicator: boolean,
}

export enum LessonsPresentationOrder {
    ASCENDING_LEVEL_THEN_SUBJECT = 'ascending_level_then_subject',
    SHUFFLED = 'shuffled',
    ASCENDING_LEVEL_THEN_SHUFFLED = 'ascending_level_then_shuffled',
}

export interface WanikaniReview extends WanikaniObjet, WanikaniPages {
    data: WanikaniReviewData;
}

export interface WanikaniReviewData {
    created_at: string;
    assignment_id: number;
    subject_id: number;
    starting_srs_stage: number;
    starting_srs_stage_name: string;
    ending_srs_stage: number;
    ending_srs_stage_name: string;
    incorrect_meaning_answers: number;
    incorrect_reading_answers: number;
}

export interface WanikaniReviewStatisticObject extends WanikaniObjet {
    total_count: number;
    data: WanikaniReviewStatistic;
}

export interface WanikaniReviewStatistic extends WanikaniObjet {
    id: string;
    data: WanikaniReviewStatisticData;
}

export interface WanikaniReviewStatisticData extends WanikaniObject {
    created_at: string;
    subject_id: number;
    subject_type: string;
    meaning_correct: number;
    meaning_incorrect: number;
    meaning_max_streak: number;
    meaning_current_streak: number;
    reading_correct: number;
    reading_incorrect: number;
    reading_max_streak: number;
    reading_current_streak: number;
    percentage_correct: number;
    hidden: boolean;
}

export interface WanikaniPages {
    per_page: number;
    next_url: string;
    previous_url: string;
}
