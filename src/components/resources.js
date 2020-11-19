import { BottomNavigation, BottomNavigationAction, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Slide, Typography } from "@material-ui/core";
import { KeyboardArrowRightRounded } from "@material-ui/icons";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import documentImage from '../images/folder.svg';
import pdfImage from '../images/pdf.svg';
import videoImage from '../images/youtube.svg';
import CommentCard from "./comment-card";
import FormikField from "./formik-field";
import FormikSelect from "./formik-select";
import { scrollToTop, showLoading, ReactSwal, showNetworkError } from "./utils";
import * as constants from '../redux/actions/constants';
import * as creators from '../redux/actions/creators';
import { axios } from "../init";
import { connect, useDispatch } from "react-redux";

const ResourceCard = ({ resource, showDownloads = false }) => {
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
    
    const classes = useResourceCardStyles();
    let image = null;
    if (resource.category === 'Video')
        image = videoImage;
    else if (resource.category === 'Material')
        image = pdfImage;
    else if (resource.category === 'Textbook')
        image = pdfImage;
    else if (resource.category === 'Document')
        image = documentImage;

    return (
        <Grid item xs={12} md={4} className={classes.root}>
            <Card>
                <div className={classes.imgContainer}>
                    <CardMedia
                        component="img"
                        image={image}
                    />
                </div>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>Excellent Video Resource</Typography>
                    <Typography variant="subtitle1" color="textSecondary">2020-01-12</Typography>
                    {showDownloads && <Typography variant="subtitle1" color="textSecondary">1 Downloads</Typography>}
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary.dark" component={Link} to={`../resource/${resource.id}`}>View</Button>
                    <Button variant="contained" color="secondary" startIcon={<GetAppRoundedIcon/>}>Download</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const Home = ({ course, courses, setCourse, category, categories, setCategory }) => {
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

    const [currentCourse, setCurrentCourse] = useState(course || courses[0]);
    const [currentcategory, setCurrentcategory] = useState(category || categories[0]);

    useEffect(() => {
        scrollToTop();
    }, []);

    const courseChanged = evt => {
        const id = evt.target.value;
        const target = courses.filter((item, index) => {
            return (item.id === id);
        })[0];

        setCourse(target);
        setCurrentCourse(target);
    };

    const categoryChanged = evt => {
        const id = evt.target.value;
        const target = categories.filter((item, index) => {
            return (item.id === id);
        })[0];

        setCategory(target);
        setCurrentcategory(target);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.optionsPaperContainer}>
                <Paper variant="outlined" square elevation={10} className={classes.optionsPaper}>
                    <Typography variant="h5" className="header">{currentCourse.course_code}  {currentcategory.category}s</Typography>

                    <FormControl color="secondary" variant="outlined" style={{width: '100%', marginBottom: '1rem' }}>
                        <InputLabel>Choose Course</InputLabel>
                        <Select
                            name="course"
                            label="Choose Course"
                            color="secondary"
                            variant="outlined"
                            defaultValue={currentCourse.id}
                            onChange={courseChanged}
                        >
                            {courses.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.course_code}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl color="secondary" variant="outlined" style={{width: '100%', marginBottom: '1rem' }}>
                        <InputLabel>Choose Category</InputLabel>
                        <Select
                            name="category"
                            label="Choose Category"
                            color="secondary"
                            variant="outlined"
                            defaultValue={currentcategory.id}
                            onChange={categoryChanged}
                        >
                            {categories.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>
            </div>

            <Grid container justify="start" alignI="stretch" className={classes.resourcesContainer}>
                <ResourceCard resource={{category: 'Video'}}/>
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
                padding: '.1rem',
                opacity: 0.8,
                borderRadius: '.4rem',
            },

            [theme.breakpoints.down('xs')]: {
                fontSize: '1.3rem',
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
            <Typography variant="h5" className={classes.header}>Popular  <span>COSC201 Materials</span></Typography>
            
            <Grid container justify="start" alignI="stretch" className={classes.resourcesContainer}>
                <ResourceCard resource={{category: 'Material'}}/>
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
                padding: '.1rem',
                opacity: 0.8,
                borderRadius: '.4rem',
            },

            [theme.breakpoints.down('xs')]: {
                fontSize: '1.2rem',
            },
        },

        commentsContainer: {
            marginTop: '4rem',
            padding: '0 6rem 0 6rem',

            [theme.breakpoints.down('xs')]: {
                padding: '0 1rem 0 1rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '0 1rem 0 1rem',
            },
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

const Resources = ({ showFooter, categories }) => {
    const queries = new URLSearchParams(useLocation().search);
    const faculty = queries.get('faculty');
    const department = queries.get('department');
    const level = queries.get('level');

    const linkSuffix = `?faculty=${faculty}&department=${department}&level=${level}`;
    const links = ['/resources' + linkSuffix, '/resources/popular' + linkSuffix, '/resources/comments' + linkSuffix];
    const history = useHistory();
    const location = useLocation();

    const currentNavigationIndex = links.indexOf(location.pathname);

    const [navigationIndex, setNavigationIndex] = useState(currentNavigationIndex === -1 ? 0 : currentNavigationIndex);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [showSearchDialog, setShowSearchDialog] = useState(false);
    const [showFiltersDialog, setShowFiltersDialog] = useState(false);
    const [courses, setCourses] = useState(constants.flags.INITIAL_VALUE);
    const [course, setCourse] = useState(null);
    const [category, setCategory] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        showLoading();
    }, []);

    useEffect(() => {
        if (!faculty || !department || !level) {
            history.push('/resources-filter');
        }
    }, [department, faculty, history, level]);

    useEffect(() => {
        if (categories === constants.flags.INITIAL_VALUE) {
            dispatch(creators.app.getCategories());
        }
        else {
            setCategory(categories[0]);
        }
    }, [categories, dispatch]);

    useEffect(() => {
        if (courses === constants.flags.INITIAL_VALUE) {
            axios.get(`courses?department_id=${department}&level_id=${level}`)
            .then(response => {
                if (response.status === 200) {
                    setCourses(response.data);
                    setCourse(response.data[0]);
                    ReactSwal.close();
                }
                else if (response.status === 404) {
                    ReactSwal.fire({
                        title: 'Oops!',
                        html: 'There are no courses for the selected combination yet. Please choose another combination!',
                        icon: 'error',
                        confirmButtonText: 'Retry',
                        didClose: () => history.push('/resources-filter'),
                    });
                }
                else {
                    showNetworkError();
                }
            })
            .catch(() => {
                showNetworkError();
            });
        }
    }, [courses, department, history, level]);

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

    if (categories === constants.flags.INITIAL_VALUE || courses === constants.flags.INITIAL_VALUE) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Switch>
                <Route path="/resources/comments"><Comments/></Route>
                <Route path="/resources/popular"><Popular/></Route>
                <Route path="/"><Home 
                                    category={category}
                                    categories={categories} 
                                    setCategory={setCategory} 
                                    courses={courses} 
                                    setCourse={setCourse}
                                    course={course}/></Route>
            </Switch>

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

export default connect(state => ({
    categories: state.appReducer.categories,
}))(Resources);