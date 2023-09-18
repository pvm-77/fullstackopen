import { EntryFormValues,Entry} from "../types";

import axios from "axios";
import { apiBaseUrl } from "../constants";

export const create=async(patientId:string,object:EntryFormValues)=>{
    const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        object
      );
      return data;
}