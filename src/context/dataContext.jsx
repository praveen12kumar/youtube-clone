import { createContext, useState, useEffect, useReducer } from "react";
import { fetchDataFromApi } from "../utils/api";
import { dataReducer } from "../reducer/dataReducer";


export const DataContext = createContext();

export const DataProvider = ({children})=>{

    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState("");
    const [selectCategory, setSelectCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);

    const initialValues = {
        selectedCategory:"",
    }

    const [state, dispatch] = useReducer(dataReducer, initialValues)

    const fetchSelectedCategoryData = (query)=>{
        setLoading(true);
        fetchDataFromApi(`search/?q=${query}`)
        .then(({contents})=>{
            console.log(contents);
            setSearchResult(contents);
            setLoading(false)
        })
    }





    useEffect(()=>{
        fetchSelectedCategoryData(selectCategory)
    },[selectCategory])
 
    return(
        <DataContext.Provider
            value={{
                loading,
                setLoading,
                searchResult, 
                setSearchResult,
                selectCategory,
                setSelectCategory,
                mobileMenu,
                setMobileMenu,
                selectedCategory:state.selectedCategory,
                dataDispatch:dispatch,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}