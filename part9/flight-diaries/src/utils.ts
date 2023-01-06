
import { NewDiaryEntry, Weather, Visibility } from "./types"
// type guard ***********
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isWeather = (weather: any): weather is Weather => {
    return Object.values(Weather).includes(weather);
};
const isVisibility = (visibility: any): visibility is Visibility => {
    return Object.values(Visibility).includes(visibility);
};
// ****************************
const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }
    return comment;
}
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date:' + date);

    }
    return date
}
const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isWeather(weather)) {
        throw new Error('Incorrect or missing');
    }
    return weather;
};
const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing');

    }
    return visibility;
}

type Fields = { comment: unknown, date: unknown, weather: unknown, visibility: unknown }
export const toNewDiaryEntry = ({ comment, date, weather, visibility }: Fields): NewDiaryEntry => {
    const newEntry: NewDiaryEntry = {
        comment: parseComment(comment),
        date: parseDate(date),
        weather: parseWeather(weather),
        visibility: parseVisibility(visibility)
    };
    return newEntry;
}
