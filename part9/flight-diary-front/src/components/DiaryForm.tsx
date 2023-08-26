import React, { useState } from "react";
import { createDiaryEntry } from "../API/diary";
const DiaryForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });
  const addDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await createDiaryEntry(formData);
      
    } catch (error) {
        console.log('the error is ',error);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div>
      <form onSubmit={addDiaryEntry}>
        <div>
          <span>date</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>visibility</span>
          <label>
            <input
              type="radio"
              name="visibility"
              value="great"
              onChange={handleInputChange}
            />
            great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="good"
              onChange={handleInputChange}
            />
            good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              onChange={handleInputChange}
            />
            ok
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              onChange={handleInputChange}
            />
            poor
          </label>
        </div>
        <div>
          <span>weather</span>
          <label>
            <input
              type="radio"
              name="weather"
              value="sunny"
              onChange={handleInputChange}
            />
            sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              onChange={handleInputChange}
            />
            rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              onChange={handleInputChange}
            />
            cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              onChange={handleInputChange}
            />
            stormy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value="windy"
              onChange={handleInputChange}
            />
            windy
          </label>
        </div>
        <div>
          <span>comment</span>
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="your comment"
          />
        </div>
        <button>add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
