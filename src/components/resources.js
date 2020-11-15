import { BottomNavigation, BottomNavigationAction, Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Slider, Typography, withStyles } from "@material-ui/core";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { scrollToTop } from "./utils";
import ReactPlayer from 'react-player';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Test from '../test_assets/test.pdf';
import PDFImage from '../images/pdf.png';

const useResourceCardStyles = makeStyles(theme => ({
    root: {
        padding: '1rem 1rem 0 1rem',
        [theme.breakpoints.down('xs')]: {
            padding: '1rem .2rem 0 .2rem',
        },
    },

    title: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem',
        },
    },

    imgContainer: {
        padding: '3rem',
        background: theme.resourceCard.background,

    },
}));

const useDocumentCardStyles = makeStyles(theme => ({
    root: {
        padding: '1rem 1rem 0 1rem',
        [theme.breakpoints.down('xs')]: {
            padding: '1rem .2rem 0 .2rem',
        },
    },

    title: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem',
        },
    },

    controlsContainer: {
        marginTop: '3rem',
    },
}));

const VideoCard = () => {
    
    const classes = useResourceCardStyles();

    return (
        <Grid item xs={12} md={4} className={classes.root}>
            <Card>
                <div className={classes.imgContainer}>
                    <CardMedia
                        component="img"
                        image={PDFImage}
                    />
                </div>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>Excellent Video Resource</Typography>
                    <Typography variant="subtitle1" color="textSecondary">2020-01-12</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary.dark">Open</Button>
                    <Button variant="contained" color="secondary" endIcon={<GetAppRoundedIcon/>}>Download</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const DocumentCard = () => {
    
    const classes = useDocumentCardStyles();

    return (
        <Grid item xs={12} md={6} className={classes.root}>
            <Card>
                <Grid container>
                    <Grid item xs={12}>
                    <DocViewer 
                        documents={[{uri: Test}]}
                        pluginRenderers={DocViewerRenderers}
                        config={{
                            header: {
                                disableFileName: true,
                            }
                        }}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <CardContent>
                            <Typography variant="h6" className={classes.title}>Excellent Document Resource</Typography>
                            <Typography variant="subtitle1" color="textSecondary">2020-01-12</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" endIcon={<GetAppRoundedIcon/>}>Download</Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

const Home = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        optionsPaperContainer: {
            padding: '0 10rem 0 10rem',
            [theme.breakpoints.down('sm')]: {
                padding: '0 .5rem 0 .5rem',
            },
        },
        optionsPaper: {
            padding: '3rem',
            [theme.breakpoints.down('sm')]: {
                padding: '2rem',
            },

            '& .header': {
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '.6rem',
                marginBottom: '3rem',
                backgroundColor: theme.palette.primary.dark,
                opacity: 0.7,

                [theme.breakpoints.down('xs')]: {
                    fontSize: '1.2rem',
                    padding: '.5rem',
                },
            },
        },

        resourcesContainer: {
            marginTop: '4rem',
            padding: '0 3rem 0 3rem',
            [theme.breakpoints.down('xs')]: {
                padding: '0 .1rem 0 .1rem',
            },
        },
    }));

    useEffect(() => {
        scrollToTop();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.optionsPaperContainer}>
                <Paper variant="outlined" square elevation={10} className={classes.optionsPaper}>
                    <Typography variant="h5" className="header">COSC201 Materials</Typography>

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

            <Grid container justify="start" alignI="stretch" className={classes.resourcesContainer}>
                <VideoCard/> <VideoCard/>
            </Grid>
        </div>
    );
};

const Popular = () => {
    const useStyles = makeStyles(theme => ({
        root: {

        },
    }));

    useEffect(() => {
        scrollToTop();
    }, []);

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

    useEffect(() => {
        scrollToTop();
    }, []);

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