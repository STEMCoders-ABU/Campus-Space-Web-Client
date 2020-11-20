import { AppBar, Button, Grid, Hidden, IconButton, makeStyles, Menu, MenuItem, Switch, ThemeProvider, Toolbar, Typography, useScrollTrigger, withStyles } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import 'animate.css/animate.min.css';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import { cloneElement, useEffect, useState } from "react";
import { Link, Route, Switch as Router } from "react-router-dom";
import Moon from './images/moon.png';
import Sun from './images/sun.png';
import darkTheme from './themes/dark';
import lightTheme from './themes/light';
import Home from './components/home';
import ResourcesFilter from './components/resources-filter';
import stemLogo from './images/stemlogo.jpg';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Resources from "./components/resources";
import Resource from "./components/resource";
import Moderation from "./components/moderation";
import Admin from "./components/admin";
import Contact from "./components/contact";
import { connect } from "react-redux";

const RawNavBar = ({ themeName, changeTheme, ...props }) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.navbar.color,
    },
    toolbar: {
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0,
      },
    },
    appBarIcon: {
      fontSize: '3rem',
      color: theme.palette.secondary.light,
    },
    title: {
      flexGrow: 1,
      paddingTop: 3.5,
      [theme.breakpoints.only('md')]: {
        fontSize: '1.1rem',
      },
    },
    menu: {
      '& div': {
        width: '50%',
      }
    },
    menuIcon: {
      color: theme.palette.text.primary,
    },
    loginButton: {
      borderRadius: '1rem',
    },
  
    navlink: {
      color: theme.navbar.linkColor,
      textTransform: 'capitalize',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textDecoration: 'none !important',
      marginRight: theme.spacing(4),
      transition: '.1s ease',
      [theme.breakpoints.only('md')]: {
        fontSize: '1.1rem',
      },

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
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(3),
      },
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
      marginTop: 3,
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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} {...props}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdDown>
          <IconButton edge="start" size="medium" color="secondary" aria-label="icon">
            <ImportContactsRoundedIcon fontSize="large" className={classes.appBarIcon} />
          </IconButton>
        </Hidden>

        <Typography variant="h6" className={classes.title}>Campus Space</Typography>
        
        <Hidden smDown>
          <div className={classes.navlinksContainer}>
            <Link className={classes.navlink} to="/">Home</Link>
            <Link className={classes.navlink} to="/resources-filter">Resources</Link>
            <Link className={classes.navlink} to="/moderation">Moderation</Link>
            <Link className={classes.navlink} to="/contact">Contact</Link>
          </div>
        </Hidden>

        <ThemeSwitch />

        <Hidden smDown>
          <Button className={classes.loginButton} variant="contained" color="secondary" size="large">Login</Button>
        </Hidden>

        <Hidden mdUp>
          <IconButton className={classes.menuIcon} edge="start" size="medium" aria-label="icon" onClick={handleMenuClick}>
            <MoreVertIcon fontSize="large"/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className={classes.menu}
          >
            <MenuItem onClick={() => handleMenuClose()}>Home</MenuItem>
            <MenuItem onClick={() => handleMenuClose()}>Resources</MenuItem>
            <MenuItem onClick={() => handleMenuClose()}>Moderation</MenuItem>
            <MenuItem onClick={() => handleMenuClose()}>Contact</MenuItem>
            <MenuItem onClick={() => handleMenuClose()}>Login</MenuItem>
          </Menu>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const NavBar = connect(state => ({

}))(RawNavBar);

const Footer = () => {
  const useStyles = makeStyles(theme => ({
    footer: {
      backgroundColor: theme.palette.primary.dark,
      padding: '10%',
      paddingTop: '2rem',
      paddingBottom: '1rem',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },

    logo: {
      borderRadius: '50%',
    },

    copyright: {
      fontFamily: "'PT Sans', sans-serif !important",
      [theme.breakpoints.down('sm')]: {
        fontSize: '.85rem',
    },
    },

    linksContainer: {
      [theme.breakpoints.down('md')]: {
        marginTop: '2rem',
        marginBottom: '2rem',
      },
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '.5rem',
      borderRadius: '.4rem',
      marginRight: '1rem',
      transition: '.3s ease',
      [theme.breakpoints.down('xs')]: {
        fontSize: '.7rem',
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '.9rem',
      },
      [theme.breakpoints.only('md')]: {
        fontSize: '.9rem',
      },
      
      '&:hover': {
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.primary.main,
        transition: '.3s ease',
      },
    },

    socialLink: {
      color: 'white',
      textDecoration: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '.5rem',
      fontSize: '4rem',
      borderRadius: '.5rem',
      marginRight: '1rem',
      transition: '.3s ease',
      [theme.breakpoints.down('lg')]: {
        fontSize: '3rem',
      },
      
      '&:hover': {
        color: theme.palette.secondary.light,
        backgroundColor: theme.palette.primary.main,
        transition: '.3s ease',
      },

      '& .icon': {
        fontSize: '4rem',
        [theme.breakpoints.down('lg')]: {
          fontSize: '3rem',
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container alignItems="center">
        <Grid item xs={12} lg={4}>
          <img className={classes.logo} src={stemLogo} alt="STEM Coders Logo"/>
          <Typography variant="subtitle1" className={classes.copyright}>&copy; {new Date().getFullYear()} STEM Coders Club. All Rights Reserved</Typography>
        </Grid>
        <Grid item xs={12} lg={6} className={classes.linksContainer}>
          <Link className={classes.link} to="/terms">Terms of Use</Link>
          <a target="_blank" rel="noreferrer" className={classes.link} href="https://stemcoders.com.ng">STEM Coders</a>
          <a target="_blank" rel="noreferrer" className={classes.link} href="https://abu.edu.ng">ABU Zaria</a>
        </Grid>
        <Grid item xs={12} lg={2}>
          <a target="_blank" rel="noreferrer" className={classes.socialLink} href="https://facebook.com/campusspaceabu"><FacebookIcon className="icon"/></a>
          <a target="_blank" rel="noreferrer" className={classes.socialLink} href="https://twitter.com/SpaceAbu"><TwitterIcon className="icon"/></a>
        </Grid>
      </Grid>
    </footer>
  );
};

const App = (props) => {
  const [theme, setTheme] = useState(window.localStorage.getItem('app-theme') || 'light');
  const [showFooter, setShowFooter] = useState(true);

  const changeTheme = () => {
    if (theme === 'dark')
      setTheme('light');
    else
      setTheme('dark');
  };

  useEffect(() => {
    window.localStorage.setItem('app-theme', theme);
  }, [theme]);

  const ElevationScroll = (props) => {
    const { children, window } = props;
    
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return cloneElement(children, {
      elevation: trigger ? 4 : 1,
    });
  }

  const useStyles = makeStyles(theme => ({
    contentAreaOffset: theme.mixins.toolbar,
    contentArea: {
      position: 'relative',
      minHeight: '100vh',

      '& .inner': {
        paddingBottom: '10rem',
        [theme.breakpoints.down('md')]: {
          paddingBottom: '20rem',
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />

      <ElevationScroll {...props}>
        <NavBar themeName={theme} changeTheme={changeTheme} />
      </ElevationScroll>
      
      <div className={classes.contentAreaOffset}/>
  
      <main className={classes.contentArea}>
        <div className="inner">
          <Router>
            <Route path="/resource/:id"><Resource showFooter={setShowFooter}/></Route>
            <Route path="/resources"><Resources showFooter={setShowFooter}/></Route>
            <Route path="/resources-filter"><ResourcesFilter showFooter={setShowFooter}/></Route>
            <Route path="/moderation"><Moderation showFooter={setShowFooter}/></Route>
            <Route path="/admin"><Admin showFooter={setShowFooter}/></Route>
            <Route path="/contact"><Contact showFooter={setShowFooter}/></Route>
            <Route path="/"><Home showFooter={setShowFooter}/></Route>
          </Router>
        </div>

        {showFooter && <Footer/>}
      </main>
    </ThemeProvider>
  );
};

export default App;
