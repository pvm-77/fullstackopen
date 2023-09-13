import { EntryFormValues,Entry} from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";




export const create=async(patientId:string,object:EntryFormValues)=>{
  console.log('patient id',patientId);
  console.log('entry data',object);
  
    const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        object
      );
    console.log('data from backend',data);
      return data;

}