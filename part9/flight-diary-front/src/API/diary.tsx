import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";
const url = "http://localhost:3004/api/diaries";
const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(url);
  console.log("all diary entry data", response);
  return response.data;
};

const createDiaryEntry = async (formData: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(url, formData);
  return response.data;
};
const diaryService={getAllDiaries,
  createDiaryEntry,}
export default diaryService;
