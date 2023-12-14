import { createContext, useContext, useState } from "react";

const searchContext = createContext();

const SearchVal = (props)=>{
    const [search , setSearch] = useState();
    
    return <searchContext.Provider value={{search , setSearch}}> {props.children} </searchContext.Provider>
}

const useSearchContext = ()=> useContext(searchContext);

export default SearchVal;
export {searchContext , useSearchContext};