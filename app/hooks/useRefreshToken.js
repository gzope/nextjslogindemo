// this hook is used to intrecept axios api call and append token at req and response
// it will return plain axios object 
import axios from "../api/AxiosAPI";

const useRefreshToken = ()=>{    
    const getAccessRefresh = async ()=>{
        let response= await axios.get('/getTokenRefresh',
                            {
                                headers: { 'abc': 'xyz' },
                                withCredentials: true
                            }
        );
        return response;
    }     
    return getAccessRefresh;
}

export default useRefreshToken;