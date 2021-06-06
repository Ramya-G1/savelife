import React from "react";
import { NewsContextProvider } from "./NewsContext";
import News from "./newscomponents/News";
import './newsApp.css'
function NewsApp() {
  return (
    <NewsContextProvider>
    <News />
  </NewsContextProvider>
  );
}
export default NewsApp;

