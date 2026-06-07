import React, { createContext } from 'react'
import { supabase } from '../supabaseClient'
export const MyContext=createContext()
const Context = ({children}) => {
    const signInUser=async({email,password})=>{
        const {data,error}=await supabase.auth.signInWithPassword({email,password})
        if (data){
            console.log("correct password")
        }
    }
  return (

    <div>
       < MyContext.Provider value={"no"}>
          {children}
       </MyContext.Provider>
     
    </div>
  )
}

export default Context
