import React from "react";
import {default as Cards} from "../covid components/Cards/Cards"
import {default as Chart} from "../covid components/Chart/Chart"
import {default as Countrypicker} from "../covid components/Countrypicker/Countrypicker"
import styles from "./App.module.css";
import {fetchData} from "../api";
import coronaimage from "../images/image.png";
class Covid extends React.Component
{
    state={
        data:{},
        country:'',
    }
    async  componentDidMount(){
        const fetchedData=await fetchData();
        this.setState({data:fetchedData});
    }
    handlecountrychange =async(country)=>{
        const fetcheddata=await fetchData(country);
        this.setState({data:fetcheddata,country:country});
    }
   render(){
    const {data,country}=this.state; 
    return (
    <div className={styles.container}>
        <img className={styles.image} src={coronaimage} alt="COVID-19"/>
   <Cards
   data={data}
   />
   <Countrypicker handlecountrychange={this.handlecountrychange}/>
   <Chart data={data}
   country={country}/>
   
    </div>);
   }
}
export default Covid;