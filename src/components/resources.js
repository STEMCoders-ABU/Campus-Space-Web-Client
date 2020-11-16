import { BottomNavigation, BottomNavigationAction, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Slide, Slider, TextField, Typography, withStyles } from "@material-ui/core";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { forwardRef, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { scrollToTop } from "./utils";
import ReactPlayer from 'react-player';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Test from '../test_assets/test.pdf';
import PDFImage from '../images/pdf.png';
import DocumentImage from '../images/documents.png';
import VideoImage from '../images/youtube.png';
import ManImage from '../images/man.png';
import { Form, Formik } from "formik";
import FormikField from "./formik-field";
import FormikSelect from "./formik-select";
import { KeyboardArrowRightRounded } from "@material-ui/icons";

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

const useCommentCardStyles = makeStyles(theme => ({
    root: {
        marginBottom: '2rem',
        borderRadius: '1rem',
    },

    imgContainer: {
        padding: '.5rem',
        background: theme.resourceCard.background,
        borderTopRightRadius: '1rem',
        borderBottomRightRadius: '1rem',
    },

    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
    },
    
    commentContainer: {
        paddingLeft: '2rem',
    },
    comment: {
        marginTop: '2rem',
        marginLeft: '1rem',
    },
}));

const VideoCard = ({ downloads = null }) => {
    
    const classes = useResourceCardStyles();

    return (
        <Grid item xs={12} md={4} className={classes.root}>
            <Card>
                <div className={classes.imgContainer}>
                    <CardMedia
                        component="img"
                        image={VideoImage}
                    />
                </div>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>Excellent Video Resource</Typography>
                    <Typography variant="subtitle1" color="textSecondary">2020-01-12</Typography>
                    {downloads && <Typography variant="subtitle1" color="textSecondary">1 Downloads</Typography>}
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary.dark">View</Button>
                    <Button variant="contained" color="secondary" endIcon={<GetAppRoundedIcon/>}>Download</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const DocumentCard = ({ downloads = null }) => {
    
    const classes = useResourceCardStyles();

    return (
        <Grid item xs={12} md={4} className={classes.root}>
            <Card>
                <div className={classes.imgContainer}>
                    <CardMedia
                        component="img"
                        image={DocumentImage}
                    />
                </div>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>Excellent Video Resource</Typography>
                    <Typography variant="subtitle1" color="textSecondary">2020-01-12</Typography>
                    {downloads && <Typography variant="subtitle1" color="textSecondary">1 Downloads</Typography>}
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary.dark">View</Button>
                    <Button variant="contained" color="secondary" endIcon={<GetAppRoundedIcon/>}>Download</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const PDFCard = ({ downloads = null }) => {
    
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
                    {downloads && <Typography variant="subtitle1" color="textSecondary">1 Downloads</Typography>}
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary.dark">View</Button>
                    <Button variant="contained" color="secondary" endIcon={<GetAppRoundedIcon/>}>Download</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const CommentCard = () => {
    const classes = useCommentCardStyles();

    return (
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={1}>
                    <div className={classes.imgContainer}>
                        <CardMedia
                            component="img"
                            image={ManImage}
                            className={classes.avatar}
                        />
                    </div>
                </Grid>
                <Grid item xs={11}>
                    <CardContent className={classes.commentContainer}>
                        <Typography variant="h6">Commenter</Typography>
                        <Typography variant="subtitle1" color="textSecondary">on 2020-01-12</Typography>
                        <Typography className={classes.comment} variant="body1">This is my comment!</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
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
                <VideoCard/> <VideoCard/> <DocumentCard/> <PDFCard/>
            </Grid>
        </div>
    );
};

const Popular = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        header: {
            textAlign: 'center',

            '& span': {
                backgroundColor: theme.palette.primary.dark,
                padding: '.3rem',
                opacity: 0.8,
                borderRadius: '1rem',
            },
        },

        underline: {
            width: '40%',
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
            <Typography variant="h5" className={classes.header}>Top Downloaded  <span>COSC201 Materials</span></Typography>
            
            <Grid container justify="start" alignI="stretch" className={classes.resourcesContainer}>
                <VideoCard downloads/> <VideoCard/> <DocumentCard downloads/> <PDFCard downloads/>
            </Grid>
        </div>
    );
};

const Comments = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        header: {
            textAlign: 'center',

            '& span': {
                backgroundColor: theme.palette.primary.dark,
                padding: '.3rem',
                opacity: 0.8,
                borderRadius: '1rem',
            },
        },

        commentsContainer: {
            marginTop: '4rem',
            padding: '0 6rem 0 6rem',
        },

        addCommentContainer: {
            padding: '1rem',
            marginBottom: '4rem',
        },
    }));

    useEffect(() => {
        scrollToTop();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5" className={classes.header}>Comments for  <span>COSC201 Materials</span></Typography>
            
            

            <div className={classes.commentsContainer}>
                <Paper className={classes.addCommentContainer}>
                    <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => {}}
                        >
                            <Form>
                                <FormikField name="display_name" label="Display Name" variant="standard" color="secondary"/>
                                <FormikField multiline rows={5} name="comment" label="Your comment" variant="outlined" color="secondary"/>
                                <Button startIcon={<CommentRoundedIcon/>} type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>Comment</Button>
                            </Form>
                        </Formik>
                </Paper>

                <CommentCard/> <CommentCard/>
            </div>
        </div>
    );
};

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Resources = ({ showFooter }) => {
    const links = ['/resources/home', '/resources/popular', '/resources/comments'];
    const history = useHistory();
    const location = useLocation();

    const currentNavigationIndex = links.indexOf(location.pathname);

    const [navigationIndex, setNavigationIndex] = useState(currentNavigationIndex === -1 ? 0 : currentNavigationIndex);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [showSearchDialog, setShowSearchDialog] = useState(false);
    const [showFiltersDialog, setShowFiltersDialog] = useState(false);
    
    const handleCloseSearchDialog = () => {
      setShowSearchDialog(false);
    };

    const handleCloseFiltersDialog = () => {
        setShowFiltersDialog(false);
    };

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

    const handleShowSearchDialog = () => {
        handleCloseSpeedDial();
        setShowSearchDialog(true);
    };

    const handleShowFiltersDialog = () => {
        handleCloseSpeedDial();
        setShowFiltersDialog(true);
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
                    onClick={e => handleShowSearchDialog()}
                />
                <SpeedDialAction
                    key="Change Filters"
                    icon={<SettingsRoundedIcon/>}
                    tooltipTitle="Change Filters"
                    onClick={e => handleShowFiltersDialog()}
                />
            </SpeedDial>

            <Dialog 
                open={showSearchDialog} 
                onClose={handleCloseSearchDialog}
                keepMounted
                aria-labelledby="search-dialog-title" 
                TransitionComponent={Transition}
            >
                <DialogTitle id="search-dialog-title">Search COS201 Materials</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a keyword to search. Resources matching the provided keyword in their title or description will be displayed.
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => {}}
                        >
                            <Form>
                                <FormikField  
                                    color="secondary"
                                    autoFocus
                                    margin="dense"
                                    name="keyword"
                                    label="Search Keyword"
                                    fullWidth
                                />
                            </Form>
                        </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSearchDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" endIcon={<SearchRoundedIcon/>}>
                        Search
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog 
                open={showFiltersDialog} 
                onClose={handleCloseFiltersDialog}
                keepMounted
                aria-labelledby="filters-dialog-title" 
                TransitionComponent={Transition}
            >
                <DialogTitle id="filters-dialog-title">Change Filters</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose a faculty, department and level.
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => {}}
                        >
                            <Form>
                                <FormikSelect 
                                    margin="dense" 
                                    name="faculty" 
                                    defaultValue="test" 
                                    label="Faculty" 
                                    className="selector"
                                    fullWidth
                                >
                                    <MenuItem value="test">Test Faculty</MenuItem>
                                </FormikSelect>
                                <FormikSelect 
                                    margin="dense" 
                                    name="department" 
                                    defaultValue="test" 
                                    label="Department" 
                                    className="selector"
                                    fullWidth
                                >
                                    <MenuItem value="test">Test Department</MenuItem>
                                </FormikSelect>
                                <FormikSelect 
                                    margin="dense" 
                                    name="level" 
                                    defaultValue="test" 
                                    label="Level" 
                                    className="selector"
                                    fullWidth
                                >
                                    <MenuItem value="test">200</MenuItem>
                                </FormikSelect>
                            </Form>
                        </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFiltersDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" endIcon={<KeyboardArrowRightRounded/>}>
                        Find Resources
                    </Button>
                </DialogActions>
            </Dialog>

            <BottomNavigation
                value={navigationIndex}
                onChange={onNavigate}
                className={classes.navigation}
                >
                <BottomNavigationAction className={classes.navigationAction} label="Home" icon={<HomeRoundedIcon className="icon"/>} />
                <BottomNavigationAction className={classes.navigationAction} label="Popular" icon={<FavoriteRoundedIcon />}>
                </BottomNavigationAction>
                <BottomNavigationAction className={classes.navigationAction} label="Comments" icon={<CommentRoundedIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default Resources;