'use client'

import { useEffect, useRef, useState } from "react";
import useApi from "@/app/hooks/useAPI";
import CheckLogin from "@/app/hooks/CheckLogin";

import useAuth from "../../hooks/useAuth";
import AxiosAPI from "../../api/AxiosAPI";


export default function About() {
  const api=useApi();
  let isLogin=CheckLogin();
  let resp;
  const [data,setData] = useState('');
  const flag = useRef(false);  
  
  const {auth,setAuth}=useAuth();


  const controller = new AbortController();
   useEffect(()=>{

      const myFun = async () =>{
        console.log('inside abt');
       try{        
        if(!flag.current && isLogin)
        {
          
          let response= await AxiosAPI.post('/getPublicKey',
                                    { data :'dummy data'},    
                                    {
                                        headers: { 'abc': 'xyz' ,
                                        'Authorization' : 'Bearer ' + auth.accessToken
                                    },
                                        withCredentials: true
                                    }
           );
          console.log('inside get pub key',response?.data?.publicKey);

          resp= await api.post('/getAbout',
          { data :'sampele data', publicKey : response?.data?.publicKey},    
          {
            headers: { 'abc': 'xyz' } ,
            signal: controller.signal
          }
          ).catch((err)=>{console.log(err); throw err;});
          setData(resp?.data?.data);          
          flag.current=true;           
        }  
       }
       catch(err)
       {        
          flag.current=true;         
          setData('something went wrong'+err);
       }
     }        
     if(!flag.current)
     {                        
        myFun();      
     }    
    return () => {
      controller.abort();
    };     
  },[])
  return (
<>
<h1>this is About {data}</h1>
</>
  )
}
