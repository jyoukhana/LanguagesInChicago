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
  Redirect
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
  const [communities, setComData] = useState("");

  useEffect(() => {
    GetData()
      .then((data) => {
        let count = 0;
        let total = Array(39).fill(0);
        let allLanguages = Array(39).fill(0);
        let comOptions = [];



        for (let i = 0; i < data.length; i++) {
          comOptions.push(data[i].community_area_name);
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
        for (let i = 0; i < allLanguages.length; i++) {
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
        setComData(comOptions)
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
            <Home communities={communities} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

//When the website initially opens, the user should be brought to the Home page
function Home(props) {
  const classes = useStyles();
  const communities = props.communities;
  const [data, setData]= useState('')
  const [submited, setSubmit] = useState(false);
  console.log('comunity' + '' + communities);


  //below is the basic from I had t take input for chart onSubmit,
  //              //communities.map((item, i) => {
  //return <option value={item.community_area_name} >{item.community_area_name}</option>})
  
  if(submited === true){
 
   return <Redirect push to = {`/community?name=${encodeURIComponent(data)}`}/>
  

  }else{
  return (
  
    <Typography className={classes.message}>
      Hello, this is the dummy Home page
        {(Object.entries(communities).length > 0) ? (
        <form onSubmit = {()=>{setSubmit(true)} }>
    
          <input list="selector" name="name" onChange={(event)=>{
            setData(event.target.value)
          }} />
          <datalist id="selector" name="mane">
            {props.communities.map((item, i) => {
              return <option value={item} />
            })}
          </datalist>
          <input type="submit" />
        </form>
      ) : ((<p></p>))}

    </Typography>
    );
  }
}

