import { useEffect } from "react";
import AxiosAPI from "../api/AxiosAPI";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import CryptoJS from 'crypto-js' ;
import nodeRSA  from "node-rsa";
const useApi = () => {

   const {auth,setAuth}=useAuth();    
   
    const refresh=useRefreshToken();
    useEffect(()=>{
        let aesKey = (Math.random() + 1).toString(36).substring(2);
        const requestIntercept =AxiosAPI.interceptors.request.use((config)=>{ 
            let publicKey;
            if(config.data?.publicKey)
            { 
                publicKey= config.data?.publicKey;               
                config.data=config.data?.data;            
                var encryptedPayload = CryptoJS.AES.encrypt(JSON.stringify(config.data),aesKey).toString();                                
                const key = new nodeRSA(publicKey);
                const encryptedAESKey = key.encrypt(aesKey, 'base64');

                config.data={ key: encryptedAESKey, encryption : encryptedPayload }            

            }    
            if (!config.headers['Authorization']) {
            config.headers["Authorization"] = 'Bearer ' + auth.accessToken;
            }
            return config;
         
        },(error)=>{console.log('INETRECET REQ ERROR',error);});

        const responseIntercept= AxiosAPI.interceptors.response.use((config)=>{ 
             
            if(config.data.data)
            {
            var bytes  = CryptoJS.AES.decrypt(config.data.data, aesKey);
            var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            config.data.data=originalText; 
            }                      
            return config;
         },        
            async (error)=>{
             console.log('INETRECET ERROR',error);                   
             const prevRequest = error?.config;    
              if(error.response.status===403)
              {
                console.log('INETRECET Hello'); 
                const newToken= await refresh();  
                console.log('newToekan',newToken);
                setAuth({user: 'AAA', accessToken: newToken.data.accesstoken});
                prevRequest.headers["Authorization"] = 'Bearer ' + newToken.data.accesstoken;            
                prevRequest.sent = true;                        
                return AxiosAPI(prevRequest);
              }
             return Promise.reject(error);
         } 
        )
        return () => {
            AxiosAPI.interceptors.request.eject(requestIntercept);
            AxiosAPI.interceptors.response.eject(responseIntercept);
        }
    },[auth,refresh]);
    
  return AxiosAPI;
}

// const encryptRSAWithPublicKey = (data)=>{
//     try{

//         var crypt1 = new JSEncrypt({default_key_size: 2048}); 
//         var PublicPrivateKey = {PublicKey: crypt.getPublicKey(), PrivateKey:crypt.getPrivateKey()};
        
//         let crypt = new JSEncrypt({});
//         crypt.setPublicKey();
//         let cipherText =crypt.encrypt(data).toString();
//         //return cipherText;
//         return data;

//     }
//     catch (err)
//     {
//         return "something went wrong ";
//     }
// }

// encryptRSAWithPublicKey



export default useApi;
