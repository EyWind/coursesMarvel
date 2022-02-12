import { useState, useCallback } from "react";

const useHttp = () => {  // often called entities that works with requests

   const [process, setProcess] = useState('waiting');

   const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

      setProcess('loading');

      try {
         const res = await fetch(url,{method, body, headers});

         if (!res.ok) {
            throw new Error(`Could not fetch: ${url}, status is: ${res.status}`);
         }

         const data = res.json();

         // setProcess('loading'); !NOOTE WE CANT DO IT HERE, it will cause an error
         return data;

      } catch (e) {
         setProcess('error');
         throw e;
      }
      
   }, [])

   const cleartError = useCallback(() => {
      setProcess('loading');
   }, [])

   return {process, setProcess, request, cleartError};
}

export default useHttp;