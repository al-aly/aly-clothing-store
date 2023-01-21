import { createContext,useState,useEffect } from "react";
import {getCategoriesAndDocuments } from "../utils/firebase/firebase.util.js";
// import SHOP_DATA from '../shop-data.js'
// import PRODUCTS from '../shop-data.json'

export const CategoriesContext = createContext({
    categoriesMap :{}
})

export const CategoriesProvider = ({children}) =>{
    const [categoriesMap,setCategoriesMap] = useState({})
    // const [products,setProducts] = useState(PRODUCTS)
    // calls once to store firebase
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // },[]);

    useEffect(()=>{
        const getCategoriesMap = async () =>{
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap);
            setCategoriesMap(categoriesMap)
        }
         getCategoriesMap();  
    },[]);
    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}