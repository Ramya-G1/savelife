import React,{useState,useEffect} from "react";
import {FormControl,NativeSelect} from "@material-ui/core";
import styles from "./Countrypicker.module.css";
import {fetchCountries} from "../../api";
function Countrypicker({handlecountrychange}){
    const [countrieslist,setCountriesList]=useState([]);
    useEffect(()=>{
   const fetchAPI=async()=>{
       setCountriesList(await fetchCountries());
   }
   fetchAPI();
    },[setCountriesList]);
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(event)=>handlecountrychange(event.target.value)}>
                <option value="">
                    Global
                </option>
    {countrieslist.map((country,i)=> <option key={i} value={country}>{country}</option>)};
            </NativeSelect>
        </FormControl>
    )
}
export default Countrypicker;