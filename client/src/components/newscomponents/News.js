import React, { useContext } from "react";
import { NewsContext } from "../NewsContext";
import NewsArticle from "./NewsArticle";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    marginTop:"30px"
  }
});

function News(props) {
  const { data } = useContext(NewsContext);
  const classes = useStyles();
  return (
    
    <Grid
    container
    spacing={4}
    className={classes.gridContainer}
    justify="center"
  >
   
        {data
          ? data.articles.map((news) => (
           
            <Grid item xs={12} sm={6} md={4} display="inline-block">
              <NewsArticle data={news} key={news.url} />
             
              </Grid>
            ))
          : "loading"}
     </Grid>
  );
}

export default News;