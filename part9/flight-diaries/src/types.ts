// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export enum Weather{
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export enum Visibility {
    Great='great',
    Rainy='good',
    Ok='ok',
    Poor='poor'
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'commit'>;
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;