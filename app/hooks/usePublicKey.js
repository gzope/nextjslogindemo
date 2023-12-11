import AxiosAPI from "../api/AxiosAPI";
import useAuth from "./useAuth";

const usePublicKey =  ()=>{    
    
        const getPublicKey = async ()=>{
            const {auth,setAuth}=useAuth();
            let response;         
            if (auth.accessToken)
            {
                response= await AxiosAPI.post('/getPublicKey',
                                    { data :'dummy data'},    
                                    {
                                        headers: { 'abc': 'xyz' ,
                                        'Authorization' : 'Bearer ' + auth.accessToken
                                    },
                                        withCredentials: true
                                    }
                );
            }
        return  response;
        }

        return getPublicKey;
    
}

export default usePublicKey;