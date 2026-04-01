import {useEffect} from  "react"
import { getSchemas } from "../services/apiServices"

export function useSchemas(){
    useEffect(() => {
    getSchemas().then(res => {
      console.log(res);
    });
  }, []);
}