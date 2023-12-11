"use client"

import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect , useRef , useState} from "react";
import axios from "../../api/AxiosAPI";
import styles from './page.module.css';

const Login = ()=>{
    const { auth, setAuth}=useAuth();
    const router = useRouter();
    
    const userRef=useRef(); 
    const errRef = useRef();  
    const passwordRef=useRef(); 

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [login, setLogin] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[]);
    
    useEffect(()=>{
        if (auth?.user)
        {  
            let from =sessionStorage.getItem('from');  
            sessionStorage.removeItem('from');        
            router.push(from?from:'/');
        }      
    },[auth]);

    const onformSubmit = async (e)=>{
        e.preventDefault();
        try{
        let response=  await axios.post('/login',
                        {user:user ,pass:pwd},
                        {headers: { 'abc': 'xyz' } }
                        );

        if(response.data?.accesstoken)
            {  
                setLogin(true);        
                setAuth({'user':user,'accessToken':response.data?.accesstoken});                                
            }    
        }
        catch(e)
        {
            setErrMsg(e?.message);            
        }                                                   
    }
    return (<div>
        { login?(<div>You are logged in </div>)  :(
        <form className={styles.login} onSubmit={onformSubmit}>
        <p ref={errRef} className={errMsg ? styles.errmsg : "offscreen"} aria-live="assertive">{errMsg}</p>  
        <label htmlFor="username">Username:</label>
        <input type='text' 
        ref={userRef} 
        id="username"
        autoComplete="off"
        className={styles.child}
        onChange={(e)=>{setUser(e.target.value)}}
        required
        />
  
  
        <label htmlFor="password">Password:</label>
        <input type='password' 
        ref={passwordRef} 
        id="password"
        autoComplete="off"
        className={styles.child}
        onChange={(e)=>{setPwd(e.target.value)}}
        />
  
        <input type="submit" 
        value='Sign in'      
        className={styles.child+ ' ' +styles.submit}/>
        </form>
         )} 
  
      </div>)
}

export default Login;