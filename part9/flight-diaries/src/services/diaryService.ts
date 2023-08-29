// fetch diary entries
// import diaryData from '../../data/diaryentries.json';

import diaries from '../../data/diaries';
import { DiaryEntry } from '../../types';

// const diaries:DiaryEntry[]=diaryData as DiaryEntry[];
export const getEntries=():DiaryEntry[]=>{
    return diaries;
}

// saving diary entries

export const addDiary=()=>{
    return null;
}