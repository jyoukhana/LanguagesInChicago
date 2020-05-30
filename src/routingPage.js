import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


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

const cityStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
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
            Chicago Language Data
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
                <ListItem button><HomeIcon/>Home</ListItem>
              </Link>
              <Link to="/chart">
                <ListItem button><AssessmentIcon/>City-Wide Language Visualizer</ListItem>
              </Link>
              <Link to="/community">
                <ListItem button><AccountCircle/>Community Input Visualizer</ListItem>
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
            <CityCard />
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
  const [data, setData] = useState('')
  const [submited, setSubmit] = useState(false);
  console.log('comunity' + '' + communities);


  //below is the basic from I had t take input for chart onSubmit,
  //              //communities.map((item, i) => {
  //return <option value={item.community_area_name} >{item.community_area_name}</option>})

  if (submited === true) {
    return <Redirect push to={`/community?name=${encodeURIComponent(data)}`} />

  } else {

    return (

      <Typography className={classes.message}>
        {(Object.entries(communities).length > 0) ? (
          <form onSubmit={() => { setSubmit(true) }}>
            <label>
              Language statistics in Chicago<br />
              <input 
                list="selector" 
                name="name" 
                placeholder="Choose neighborhood..." 
                onChange={(event) => {
                  setData(event.target.value)
                }} 
              />
              <datalist id="selector" name="mane">
                {props.communities.map((item, i) => {
                  return <option value={item} />
                })}
              </datalist>
            </label>
            <input type="submit" value="Submit"/>
          </form>
        ) : ((<p></p>))}

      </Typography>
    );
  }
}

export function CityCard() {
  const classes = cityStyles();
  const [expanded, setExpanded] = React.useState(false);
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt="Chicago Flag" src="/images/chicago-flag.png" aria-label="chicago flag icon"/>
        }
        action={
          <IconButton aria-label="settings">
       
          </IconButton>
        }
        title="Chicago Illinois"
        subheader="One of the most diverse cities in the US"
      />
      <CardMedia
        className={classes.media}
        image="/images/city-pan.jpg"
        title="Chicago, Illinois"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This application displays language data within Chicago and its many neighborhoods. Click the collapse arrow on the bottom to view more info.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
       
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Overview:</Typography>
          <Typography paragraph>
            This project displays census data of languages spoken in Chicago from 2008 - 2012. The data is pulled
            from the Chicago Data Portal and uses their API to fetch JSON data of each neighborhood and their language
            statistics. In this application, you can view city-wide language statistics on a bar chart by clicking on the
            accompanying link in the drawer on the left. You can also submit a neighborhood on the homepage drop-down menu which
            will redirect you to a pie chart that visualizes data on that specific neighborhood.

            All data is taken from https://data.cityofchicago.org/Health-Human-Services/Census-Data-Languages-spoken-in-Chicago-2008-2012/a2fk-ec6q
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

