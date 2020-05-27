import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ChartPage from './chartPage.js';
import GetData from './getData.js';
import CommunityPage from './input.js'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  listText: {
    fontSize: 16
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  message: {
    color: "black"
  },
}));

//Note to self: use uppercase for name of export default function
//otherwise it compilier complains about hook
export default function RoutePage() {
  const classes = useStyles();
  const [languageData, setLanguageData] = useState("");

  useEffect(() => {
    GetData()
      .then((data) => {
        let count = 0;
        let total = Array(39).fill(0);
        let allLanguages = Array(39).fill(0);


        for (let i = 0; i < data.length; i++) {
          //When I type j in data[i], j is the name of the key
          //so to get to the value, I have to type data[i][j]
          for (let j in data[i]) {
            if (j != "community_area" && j != "community_area_name" && j != "predominant_non_english_language_") {
              total[count] += parseInt(data[i][j]);
              count++;
            }
          }

          count = 0;
        }

        // I created this instead of using Object.keys(data[0]) 
        // because I don't want the keys specified following if statement.
        for (let key in data[0]) {
          if (key != "community_area" && key != "community_area_name" && key != "predominant_non_english_language_") {
            allLanguages[count] = key.replace(/_/g, " "); //the first argument /_/g means to replace all underscores in the String 
            count++;
          }
        }

        //create random colors for the languages in the bar chart
        let colors = Array(39).fill(0);
        let r, g, b;
        for(let i = 0; i < allLanguages.length; i++){
          r = Math.floor(Math.random() * 255);
          g = Math.floor(Math.random() * 255);
          b = Math.floor(Math.random() * 255);
          colors[i] = "rgba(" + r + "," + g + "," + b + "," + "0.5)";
        }

        setLanguageData({
          total: total,
          language: allLanguages,
          color: colors
        });
      });
  }, []);


  //Composition of website...Not the official version, Just a placeholder until the official version is finished. 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Final Project Concept
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div>
            <List className={classes.listText}>
              <Link to="/">
                <ListItem button>Home</ListItem>
              </Link>
              <Link to="/chart">
                <ListItem button>Chart</ListItem>
              </Link>
              <Link to="/community">
                <ListItem button>Data by Community</ListItem>
              </Link>
            </List>
          </div>
        </div>
      </Drawer>

      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route path="/chart">
            <ChartPage languageData={languageData} />
          </Route>
          <Route path="/community">
            <CommunityPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

//When the website initially opens, the user should be brought to the Home page
function Home(props) {
  const classes = useStyles();

  return (
    <Typography className={classes.message}>
      Hello, this is the dummy Home page
      <form >
        <label>
          Hello! <br />
          Please enter welcome message:
        <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Typography>
  );
}

