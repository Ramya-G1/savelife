import React, {useState,useEffect} from "react";
import {fetchDailyData} from "../../api";
import {Line,Bar} from "react-chartjs-2";
import styles from "./Chart.module.css";
const Chart=({data:{confirmed,recovered,deaths},country})=>{
    const [dailydata,setDailyData]=useState([]);
    useEffect(()=>{
        const fetchAPI= async()=>{
        setDailyData(await fetchDailyData());
        }
        fetchAPI();
    },[]);
    const linechart=(
        dailydata.length
        ?
       ( <Line 
        data={{
         labels:dailydata.map(({date})=>date),
         datasets:[{
             data:dailydata.map(({confirmed})=>confirmed),
             label:'Infected',
             borderColor:"#3333ff",
             fill:true,
         },{
            data:dailydata.map(({deaths})=>deaths),
            label:"Deaths",
            borderColor:"red",
            backgroundColor:"rgba(255,0,0,0.5)",
            fill:true,
         }],
        }}
        />):null
    );
    const barchart=(
        confirmed?(
            <Bar
            data={{
                labels:['Infected','Recovered','Deaths'],
                datasets:[{
                    label:'people',
                    backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                    data:[confirmed.value,recovered.value,deaths.value],
                }],

            }}
            options={{
               legend:{display:false},
                title:{display:true,text:`current state in ${country}`},
            }}
             />
            
        ):null
    );
    return (
        <div className={styles.container}>
        {country?barchart:linechart}
        </div>
    )
}
export default Chart;
