import { useRouter , usePathname  } from "next/navigation";
import useAuth from "./useAuth";
import { useEffect } from "react";
const CheckLogin= ()=>{
    const {auth,setAuth} = useAuth();
    const router =useRouter();
    const currentPage = usePathname() || '/';
    useEffect(()=>{
            if(auth)
            {
                //return true;
            }
            else
            {                
                sessionStorage.setItem('from',currentPage)
                router.push('/comp/login');
            }
    })     
    return (auth?.user?true:false);
}

export default CheckLogin;