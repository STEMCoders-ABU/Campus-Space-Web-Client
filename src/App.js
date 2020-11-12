import { AppBar, Button, IconButton, makeStyles, Switch, ThemeProvider, Toolbar, Typography, withStyles } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded';
import { useState } from "react";
import darkTheme from './themes/dark';
import lightTheme from './themes/light';
import Moon from './images/moon.png';
import Sun from './images/sun.png';
import { Link } from "react-router-dom";

const NavBar = ({ themeName, changeTheme }) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.navbar.color,
    },
    appBarIcon: {
      fontSize: '3rem',
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
    <AppBar position="fixed" className={classes.appBar}>
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
    
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.contentAreaOffset}/>

      nskndakjndjandkajnajdandadhbadabhdab



      hhhhhhhhhh


      jjjjjj
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState('dark');

  const changeTheme = () => {
    if (theme === 'dark')
      setTheme('light');
    else
      setTheme('dark');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />

      <NavBar themeName={theme} changeTheme={changeTheme} />

      <Contents/>
       
    </ThemeProvider>
  );
};

export default App;
