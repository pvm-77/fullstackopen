import { useState, useEffect } from "react";
import { getAllDiaries } from "../API/diary";
import { DiaryEntryType } from "../types";
import DiaryEntry from "./DiaryEntry";
const DiaryEntryList = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntryType[]>([]);
  const fetchData = async () => {
    try {
      const data = await getAllDiaries();
      setDiaryEntries(data as DiaryEntryType[]);
    } catch (error) {
      console.log("error is", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaryEntries.map(d=><DiaryEntry key={d.id} diary={d} />)}
    </div>
  );
};

export default DiaryEntryList;
