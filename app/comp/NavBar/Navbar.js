"use client"
import Link from 'next/link'
import styles from "./NavBar.module.css";
import useAuth from "../../hooks/useAuth";

const NavBar = ()=>{
     const {auth, setAuth}=useAuth();
     const onLogout = ()=>{
        setAuth(false);
     }
    console.log('Auth State',auth);
    return (<div className= {styles.main}> 
            <div className= {styles.left}>
                <div className= {styles.link}>
                    <Link href='/' >Home</Link>
                </div>
                <div className= {styles.link}>
                    <Link href='/comp/about' >About</Link>
                </div>
            </div>
            <div className= {styles.right}>
                {auth?(<div className= {styles.login}>
                    <a  onClick={onLogout}>Logout</a>
                </div>):(<div className= {styles.login}>                    
                    <Link href='/comp/login' >Login</Link>
                </div>)
                }
            </div>
    </div>);
}

export default NavBar;