import React from "react";
import  Card from '@material-ui/core/Card';
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../newsApp.css'
const useStyles = makeStyles({
  root: {
    minWidth: 200
  },
  typo:
  {
    color: "#000000",
  }
});

function NewsArticle({ data }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea href={`${data.url}`}>
    <CardContent >
      <Typography >
        <h2 className="cch">{data.title}</h2>
      </Typography>
      <Typography className={classes.typo} >
         {data.description}
        </Typography>
      <Typography className={classes.typo}>{data.author}</Typography>
      <Typography className={classes.typo}>{data.published}</Typography>
      <Typography className={classes.typo}>{data.source.name}</Typography>
    </CardContent>
    </CardActionArea>
    </Card>
  );
}

export default NewsArticle;