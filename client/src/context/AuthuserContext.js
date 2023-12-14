import { createContext, useContext, useReducer, useState } from "react";
import reducer from '../reducer/AuthReducer';

const AuthContext = createContext();

const AuthProvider =(props)=>{
 
    const initialState = {
        isLoading : false,
        token : "",
        userDetails : {}
    }

    console.log(initialState);
      // declaring reducer
      const[state , dispatch] = useReducer(reducer , initialState);

    const setToken = (token)=>{
        dispatch({type : "SET_TOKEN" , payload : token});
    }

    // fucntion to fetch and set userDetails on load
    const setUser =(detailes)=>{
       
        dispatch({type : "SET_USER" , payload : detailes});
        
    }


    useState(()=>{
        const {userDetails , token} = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
        if(userDetails){
            setUser(userDetails);
            setToken(token);
        }
    },[]);
  
    return <AuthContext.Provider value={{...state , setToken , setUser}}>
        {props.children}
    </AuthContext.Provider>
}

// creting custom hook
const useAuthContext = ()=> useContext(AuthContext);

export default AuthProvider
export {useAuthContext , AuthContext};