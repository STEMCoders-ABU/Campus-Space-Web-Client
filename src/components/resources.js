import { BottomNavigation, BottomNavigationAction, Fab, makeStyles } from "@material-ui/core";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { scrollToTop } from "./utils";

const Home = () => {
    const useStyles = makeStyles(theme => ({
        root: {

        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            Home baby!
        </div>
    );
};

const Popular = () => {
    const useStyles = makeStyles(theme => ({
        root: {

        },
    }));

    const classes = useStyles();

    return (
        <div>
            Popular baby!
        </div>
    );
};

const Comments = () => {
    const useStyles = makeStyles(theme => ({
        root: {

        },
    }));

    const classes = useStyles();

    return (
        <div>
            Comments baby!
        </div>
    );
};

const Resources = ({ showFooter }) => {
    const [navigationIndex, setNavigationIndex] = useState(0);

    const links = ['/resources/home', '/resources/popular', '/resources/comments'];
    const history = useHistory();

    const onNavigate = (event, newValue) => {
        setNavigationIndex(newValue);
        history.push(links[newValue]);
    };

    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: theme.spacing(1),
        },

        navigation: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
            backgroundColor: '#212121',
        },
        navigationAction: {
            '& .MuiBottomNavigationAction-label': {
                color: 'white',
            },
            '& .MuiBottomNavigationAction-wrapper': {
                color: 'white',
            },
            '& .MuiBottomNavigationAction-label.Mui-selected': {
                color: theme.palette.secondary.light,
                fontWeight: 'bold',
            },
            '& .Mui-selected': {
                backgroundColor: '#2d2d2d',
                padding: '.1rem .5rem .1rem .5rem',
                borderRadius: '.2rem',
            },
        },

        optionsFab: {
            position: 'fixed',
            bottom: 80,
            right: 20,
        },
    }));

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => showFooter(false), [showFooter]);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BrowserRouter key={navigationIndex}>
                <Switch>
                    <Route path="/resources/comments"><Comments/></Route>
                    <Route path="/resources/popular"><Popular/></Route>
                    <Route path="/resources/home"><Home/></Route>
                    <Route path="/"><Redirect to="/resources/home"></Redirect></Route>
                </Switch>
            </BrowserRouter>

            <Fab color="secondary" aria-label="options" size="large" className={classes.optionsFab}><AddRoundedIcon/></Fab>

            <BottomNavigation
                value={navigationIndex}
                onChange={onNavigate}
                className={classes.navigation}
                >
                <BottomNavigationAction className={classes.navigationAction} label="Home" icon={<HomeRoundedIcon className="icon"/>} />
                <BottomNavigationAction className={classes.navigationAction} label="Favorites" icon={<FavoriteRoundedIcon />}>
                    
                </BottomNavigationAction>
                <BottomNavigationAction className={classes.navigationAction} label="Comments" icon={<CommentRoundedIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default Resources;