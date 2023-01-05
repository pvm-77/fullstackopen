import express from 'express';
import diaryService from '../services/diaryService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  // res.send('Saving a diary!');
  const {date,weather,visibility,comment}=req.body;
  const newDiaryEntry=diaryService.addDiary(date,weather,visibility,comment);
  res.json(newDiaryEntry)
});

export default router;