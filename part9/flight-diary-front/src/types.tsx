

export interface DiaryEntryType{
    id:number;
    date:string;
    weather:string;
    visibility:string;
    comment?:string

}

export type NewDiaryEntry=Omit<DiaryEntryType,'id'>;