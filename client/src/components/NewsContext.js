import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const {newsapi}=require('../keys')
export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState();
  const apiKey = newsapi;

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?category=health&country=in&pageSize=30&apiKey=${apiKey}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [data]);
 
  return (
    <NewsContext.Provider value={{ data }}>
      {props.children}
    </NewsContext.Provider>
  );
};
