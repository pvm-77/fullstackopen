
import axios from 'axios';
import { DiaryEntryType,NewDiaryEntry } from '../types';
const url='http://localhost:3004/api/diaries'
export const getAllDiaries=async()=>{
    const response=await axios.get<DiaryEntryType[]>(url);
    return response.data;
}

export const createDiaryEntry=async(formData:NewDiaryEntry)=>{
    const response=await axios.post<DiaryEntryType>(url,formData);
    return response.data

}