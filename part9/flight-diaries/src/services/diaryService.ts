
import diaries from '../../data/diaries'
import { DiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types';
// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id)
    return entry;
}
const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addDiary = (date: string, weather: Weather, visibility: Visibility, comment: string): DiaryEntry => {
    // return null;
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        date,
        weather, visibility, comment
    }

    diaries.push(newDiaryEntry);
    return newDiaryEntry
};
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id, date, weather, visibility
    }));

}


export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
}