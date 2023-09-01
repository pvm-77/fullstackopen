import { DiaryEntry } from "../types";
import DiaryEntryContent from "./DiaryEntry";
const DiaryEntryList = ({diaryEntries}:{diaryEntries:DiaryEntry[]}) => {
  
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaryEntries.map(d=><DiaryEntryContent key={d.id} diary={d} />)}
    </div>
  );
};

export default DiaryEntryList;
