import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


import {
  Switch,
  Route,
  Link,
  withRouter,
  useHistory,
  useLocation
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
    fontSize: 14
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  message: {
    color: "black"
  },
  root2: {
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
function RoutePage() {
  const classes = useStyles();
  const [languageData, setLanguageData] = useState("");
  const [communities, setComData] = useState("");
  const [data, setData] = useState('')
  const history = useHistory();
  const location = useLocation();

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
            if (j !== "community_area" && j !== "community_area_name" && j !== "predominant_non_english_language_") {
              total[count] += parseInt(data[i][j]);
              count++;
            }
          }
          count = 0;
        }

        // I created this instead of using Object.keys(data[0]) 
        // because I don't want the keys specified following if statement.
        for (let key in data[0]) {
          if (key !== "community_area" && key !== "community_area_name" && key !== "predominant_non_english_language_") {
            var splitStr = key.toLowerCase().split('_');
            for (var i = 0; i < splitStr.length; i++) {
              splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            allLanguages[count] = splitStr.join(' ');; //the first argument /_/g means to replace all underscores in the String 
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
        setComData(comOptions.sort())
      });
  }
    , []);




  //Composition of website

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

          <List className={classes.listText}>
            <Link to="/">
              <ListItem button><HomeIcon />Home</ListItem>
            </Link>
            <Link to="/chart">
              <ListItem button><AssessmentIcon />City-Wide Language Visualizer</ListItem>
            </Link>

            <ListItem>
              <Typography >
                {(Object.entries(communities).length > 0) ? (

                  <FormControl variant="outlined" >
                    <InputLabel htmlFor="Community selector">Community</InputLabel>
                    <NativeSelect
                      value={(location.pathname === "/community") ? (data) : ""}
                      onChange={(event) => {
                        setData(event.target.value)
                        history.push({
                          pathname: '/community',
                          search: '?name=' + encodeURIComponent(event.target.value)
                        })

                      }}
                      inputProps={{
                        name: 'age',
                        id: 'Community selector',
                      }}
                    >
                      <option aria-label="None" disabled></option>
                      {communities.map((item, i) => {
                        return <option aria-label={item} value={item}>{item}</option>
                      })}
                    </NativeSelect>
                    <FormHelperText>Select a community to view language distributions</FormHelperText>
                  </FormControl>) : ((<p></p>))}
              </Typography>
            </ListItem>
          </List>

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
  const [expanded, setExpanded] = React.useState(false);

  //I used alt+255 to make a space between the text and the link in typography
  return (
    <Card className={classes.root2}>
      <CardHeader
        avatar={
          <Avatar alt="Chicago Flag" src="/images/chicago-flag.png" aria-label="chicago flag icon" />
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
          This application displays language data within Chicago and its many neighborhoods.
          Click the collapse arrow below for more info.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => {
            setExpanded(!expanded)
          }}
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
            This project displays census data of non-English languages spoken in Chicago from 2008 - 2012. The data is pulled
            from the Chicago Data Portal and uses their API to fetch JSON data of each neighborhood and their language
            statistics. In this application, you can view a bar chart of city-wide language statistics by clicking the
            link in the drawer on the left. alternatively, you may select a community to
            view a pie chart of any given neighborhood's language statistics.
            All data is taken from 
			<a href="https://data.cityofchicago.org/Health-Human-Services/Census-Data-Languages-spoken-in-Chicago-2008-2012/a2fk-ec6q" aria-label="Chicago Data Portal">
				Chicago Data Portal
			</a>
			.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default withRouter(RoutePage);

