import { DiaryEntry } from '../types'

const DiaryEntryContent = ({diary}:{diary:DiaryEntry}) => {
  return (
    <div>
        <p><strong>{diary.date}</strong></p>
        <p>visibility:{diary.visibility}</p>
        <p>weather: {diary.weather}</p>
    </div>
  )
}

export default DiaryEntryContent