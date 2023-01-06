
import diaries from '../../data/diaries'
import {NewDiaryEntry, DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id)
    return entry;
}
const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const addDiary = (entry:NewDiaryEntry): DiaryEntry => {
    // return null;
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
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