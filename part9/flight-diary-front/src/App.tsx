import DiaryEntryList from "./components/DiaryEntryList";
import DiaryForm from "./components/DiaryForm";
import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./API/diary";
function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const fetchData = async () => {
    try {
      const data = await diaryService.getAllDiaries();
      setDiaryEntries(data);
    } catch (error) {
      console.log("error is", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <DiaryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
      />
      <DiaryEntryList diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
