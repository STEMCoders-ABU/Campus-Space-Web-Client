import { BottomNavigation, BottomNavigationAction, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select } from "@material-ui/core";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { scrollToTop } from "./utils";

const Home = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        optionsPaperContainer: {
            padding: '0 10rem 0 10rem',
        },
        optionsPaper: {
            padding: '3rem',
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.optionsPaperContainer}>
                <Paper square elevation={4} className={classes.optionsPaper}>
                    <FormControl variant="filled" style={{width: '100%', marginBottom: '1rem' }} className="w-100 my-3">
                        <InputLabel></InputLabel>
                        <Select
                            name="course"
                            defaultValue="test"
                        >
                        <MenuItem value="test">COSC201</MenuItem>
                        <MenuItem value="test2">COSC203</MenuItem>
                        <MenuItem value="test3">COSC211</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="filled" style={{width: '100%'}} className="w-100 my-3">
                        <InputLabel></InputLabel>
                        <Select
                            name="category"
                            defaultValue="test"
                        >
                        <MenuItem value="test">Materials</MenuItem>
                        <MenuItem value="test2">Videos</MenuItem>
                        <MenuItem value="test3">Ebooks</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>
            </div>
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
    const links = ['/resources/home', '/resources/popular', '/resources/comments'];
    const history = useHistory();
    const location = useLocation();

    const currentNavigationIndex = links.indexOf(location.pathname);

    const [navigationIndex, setNavigationIndex] = useState(currentNavigationIndex === -1 ? 0 : currentNavigationIndex);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    
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
            backgroundColor: '#424242',
            boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)',
        },
        navigationAction: {
            '& .MuiBottomNavigationAction-label': {
                color: 'white',
                fontFamily: "'PT Sans', sans-serif",
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
                borderRadius: '.5rem',
            },
        },

        optionsSpeedDial: {
            position: 'fixed',
            bottom: 70,
            right: 10,
        },
    }));

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => showFooter(false), [showFooter]);

    const handleCloseSpeedDial = () => {
        setSpeedDialOpen(false);
    };

    const handleOpenSpeedDial = () => {
        setSpeedDialOpen(true);
    };

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

            <SpeedDial
                ariaLabel="Options"
                className={classes.optionsSpeedDial}
                icon={<SpeedDialIcon />}
                onClose={handleCloseSpeedDial}
                onOpen={handleOpenSpeedDial}
                open={speedDialOpen}
                direction="up"
            >
                <SpeedDialAction
                    key="Search Resources"
                    icon={<SearchRoundedIcon/>}
                    tooltipTitle="Search Resources"
                    onClick={handleCloseSpeedDial}
                />
                <SpeedDialAction
                    key="Change Filters"
                    icon={<SettingsRoundedIcon/>}
                    tooltipTitle="Change Filters"
                    onClick={handleCloseSpeedDial}
                />
            </SpeedDial>

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