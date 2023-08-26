import { DiaryEntryType } from '../types'

const DiaryEntry = ({diary}:{diary:DiaryEntryType}) => {
  return (
    <div>
        <p><strong>{diary.date}</strong></p>
        <p>visibility:{diary.visibility}</p>
        <p>weather: {diary.weather}</p>
    </div>
  )
}

export default DiaryEntry