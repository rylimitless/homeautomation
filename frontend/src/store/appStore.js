import {defineStore} from 'pinia'
import {ref} from 'vue'


export const useAppStore =  defineStore('app', ()=>{

   const getUpdateData= async (data) => {
       const controller = new AbortController();
       const signal = controller.signal;
       const id= setTimeout(() => controller.abort(), 60000);
       const URL= '/api/update';

         try {
                const response = await fetch(URL, {
                    method: 'POST',
                    signal: signal,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                console.log(result);
                clearTimeout(id);
                return result;
            } catch (error) {
                console.log(error);
                clearTimeout(id);
                return {status: 'getUpdatedata error', message: error.message};
            }
            return [];
    }
    
    const set_password = async (data) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id= setTimeout(() => controller.abort(), 60000);
        const URL= '/api/set/combination';
        console.log(data);
        let data_b  = JSON.stringify({"passcode": data.toString()});

             try {
                  const response = await fetch(URL, {
                        method: 'POST',
                        signal: signal,
                        body: data_b,
                        headers: {
                             'Content-Type': 'application/json'
                        }
                  });
                  console.log(response);
                  const result = await response.json();
                  console.log(result);
                  clearTimeout(id);
                  return result;
                 } catch (error) {
                    console.log(error);
                 }
    }

    const getCheckPwd= async (data) => {
        const s = {'passcode': data};
        const controller = new AbortController();
        const signal = controller.signal;
        const id= setTimeout(() => controller.abort(), 60000);
        // const BASE_URL = 'http://10.22.16.114:8080';
        const URL = `/api/set/combination`;
            console.log(`data is ${data}`);
             try {
                  const response = await fetch(URL, {
                        method: 'POST',
                        signal: signal,
                        headers: {
                             'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(s)
                  });
                  const result = await response.json();
                  console.log(result);
                  clearTimeout(id);
                  return result;
                 } catch (error) {
                  console.log(error);
                  clearTimeout(id);
                  return {status: 'getCheckPwd error', message: error.message};
                 }
                 return [];

    }

    const getRetrieveData= async (start, end) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id= setTimeout(() => controller.abort(), 60000);
        const URL= `/api/reserve/${start}/${end}`;
        try {
            const response = await fetch(URL, {
                method: 'GET',
                signal: signal});
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    let keys = Object.keys(data);
                    if (keys.includes('status')) {
                        if(data["status"]=="success"){
                            return data["data"];
                        }
                    if (data["status"]=="failed"){
                        console.log("getRetrieveData returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        } catch (err) {
            console.log('getRetrieveData error', err.message);
        }
        return [];
    }

    const get_avg= async (start,end) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/avg/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                var keys = Object.keys(data);
                if (keys.includes('status')) {
                    if (data["status"] =="success") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] =="failed"
                    ) {
                        console.log("avg request failed");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {

            console.error('getCalcualateAverage error:', err.message);
        }
        return []
    }
    


    return { 
    // EXPORTS	
        getUpdateData,
        set_password,
        getCheckPwd,
        getRetrieveData,
        get_avg,
         

       }
},{ persist: true  });