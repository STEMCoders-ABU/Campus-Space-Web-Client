import { AppBar, Button, Grid, IconButton, makeStyles, Paper, Switch, ThemeProvider, Toolbar, Typography, useScrollTrigger, withStyles } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import { cloneElement, useState } from "react";
import darkTheme from './themes/dark';
import lightTheme from './themes/light';
import Moon from './images/moon.png';
import Sun from './images/sun.png';
import { Link } from "react-router-dom";
import {ReactComponent as Reading} from './images/reading.svg';
import {ReactComponent as Storage} from './images/cloud_storage.svg';
import {ReactComponent as Discussion} from './images/discussion.svg';
import {ReactComponent as TimeManagement} from './images/time_management.svg';
import {ReactComponent as Questions} from './images/questions.svg';

const NavBar = ({ themeName, changeTheme, ...props }) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.navbar.color,
    },
    appBarIcon: {
      fontSize: '3rem',
      color: theme.palette.secondary.light,
    },
    title: {
      flexGrow: 1,
      paddingTop: 3.5,
    },
    loginButton: {
      borderRadius: '1rem',
    },
    navlinksContainer: {
      
    },
    navlink: {
      color: theme.navbar.linkColor,
      textTransform: 'capitalize',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textDecoration: 'none !important',
      marginRight: theme.spacing(5),
      transition: '.1s ease',

      '&:hover': {
        color: theme.navbar.linkHoverColor,
        transition: '.1s ease',
      }
    },
  }));

  const switchHeight = 32;
  const switchWidth = 65;
  const switchThumb = 25;
  const ThemeSwitch = withStyles((theme) => ({
    root: {
      width: switchWidth,
      height: switchHeight,
      padding: 1.5,
      margin: theme.spacing(1),
      marginRight: theme.spacing(5),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: `translateX(${switchWidth - switchThumb}px)`,
        color: theme.palette.common.white,
        '& + $track': {
          backgroundImage: `url(${Moon})`,
          backgroundColor: '#6e6e6e',
          backgroundPositionX: 'left',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      color: 'white',
      width: switchThumb,
      height: switchThumb,
      marginTop: 2,
      border: `.5px solid ${theme.palette.secondary.main}`,
      transition: theme.transitions.create(['all'], '1s', 'ease'),
    },
    track: {
      borderRadius: (switchHeight / 2),
      backgroundColor: '#6e6e6e',
      backgroundImage: `url(${Sun})`,
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'right',
      backgroundPositionY: 'center',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {
      
    },
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        defaultChecked={themeName === 'dark'}
        onChange={e => changeTheme()}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} {...props}>
      <Toolbar>
        <IconButton edge="start" size="medium" color="secondary" aria-label="icon">
          <ImportContactsRoundedIcon fontSize="large" className={classes.appBarIcon} />
        </IconButton>

        <Typography variant="h6" className={classes.title}>Campus Space</Typography>
        
        <div className={classes.navlinksContainer}>
          <Link className={classes.navlink}>Home</Link>
          <Link className={classes.navlink}>Resources</Link>
          <Link className={classes.navlink}>Moderation</Link>
          <Link className={classes.navlink}>Contact</Link>
          <Link className={classes.navlink}>About</Link>
        </div>

        <ThemeSwitch />

        <Button className={classes.loginButton} variant="contained" color="secondary" size="large">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

const Contents = () => {
  const useStyles = makeStyles(theme => ({
    contentAreaOffset: theme.mixins.toolbar,
    root: {
      marginTop: theme.spacing(1),
    },
    heroPaper: {
      backgroundColor: '#006253',
      paddingTop: theme.spacing(8),
      paddingBottom: 0,

      '& svg': {
        width: '100%',
        height: 'auto'
      },
    },
    heroTitle: {
      marginTop: theme.spacing(5),
      fontWeight: 'bold',
      color: '#fafafa',
    },
    heroSubtitle: {
      backgroundColor: theme.palette.background.default,
      opacity: 0.8,
      padding: theme.spacing(2),
      borderRadius: '.8rem',
    },
    heroBtn: {
      marginTop: theme.spacing(20),
      textTransform: 'capitalize',
      padding: theme.spacing(3),
      borderRadius: '.5rem',
      fontSize: '1.5rem',
      width: '100%',
    },
    featuresPaper: {
      backgroundColor: theme.palette.primary.main,
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(2),
      
      '& svg': {
        width: '100%',
        height: '50%',
        flexGrow: 1,
      },

      '& h4': {
        textAlign: 'center',
        marginBottom: theme.spacing(3),
        padding: '.9rem',
        //borderRadius: '.2rem',
        //borderLeft: `.4rem solid ${theme.palette.secondary.main}`,
        //borderRight: `.4rem solid ${theme.palette.secondary.main}`,
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className={classes.contentAreaOffset}/>

      <div className={classes.root}>
        <Paper elevation={0} square className={classes.heroPaper}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Reading/>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <Typography variant="h1" className={classes.heroTitle}>CAMPUS SPACE</Typography>
                  <Typography variant="h5" className={classes.heroSubtitle}>More Space, More Info...</Typography>
                  
                  <Grid container justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Button variant="contained" color="secondary" size="large" className={classes.heroBtn}>Explore Resources</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button variant="contained" color="primary" size="large" className={classes.heroBtn}>Download App</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={0}  className={classes.featuresPaper}>
          <Grid container justify="space-around">
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Save Space</Typography>
              <Storage/>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h4">Share Thoughts</Typography>
              <Discussion/>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h4">Save Time</Typography>
              <TimeManagement/>
            </Grid>
          </Grid>
        </Paper>

        <Paper>

        </Paper>
      </div>
    </>
  );
};

const App = (props) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    if (theme === 'dark')
      setTheme('light');
    else
      setTheme('dark');
  };

  const ElevationScroll = (props) => {
    const { children, window } = props;
    
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />

      <ElevationScroll {...props}>
        <NavBar themeName={theme} changeTheme={changeTheme} />
      </ElevationScroll>
      
      <Contents/>
       
    </ThemeProvider>
  );
};

export default App;
