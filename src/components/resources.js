import { BottomNavigation, BottomNavigationAction, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Slide, Typography } from "@material-ui/core";
import { KeyboardArrowRightRounded } from "@material-ui/icons";
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { Skeleton, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import documentImage from '../images/folder.svg';
import pdfImage from '../images/pdf.svg';
import videoImage from '../images/youtube.svg';
import { axios } from "../init";
import * as constants from '../redux/actions/constants';
import * as creators from '../redux/actions/creators';
import CombinationSelection from "./combination-selection";
import CommentCard, { CommentCardLoading } from "./comment-card";
import FormikField from "./formik-field";
import { downloadResource, getErrorsMarkup, ReactSwal, scrollToTop, showError, showInfo, showLoading, showNetworkError } from "./utils";

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

            '& img': {
                width: '100%',
                height: 'auto',
            }
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
                    <Typography variant="h6" className={classes.title}>{resource.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{resource.date_added}</Typography>
                    {showDownloads && <Typography variant="subtitle1" color="textSecondary">{resource.downloads} Download{resource.downloads > 1 ? 's' : ''}</Typography>}
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary.dark" component={Link} to={`../resource/${resource.id}`}>View</Button>
                    <Button variant="contained" color="secondary" startIcon={<GetAppRoundedIcon/>} onClick={() => downloadResource(resource)}>Download</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

const ResourceCardLoading = () => {
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
    
    return (
        <Grid item xs={12} md={4} className={classes.root}>
            <Card>
                <Skeleton variant="rect" height={150} animation="wave"/>
                <CardContent>
                    <Typography variant="h6" component="div"><Skeleton/></Typography>
                    <Typography variant="subtitle1" component="div"><Skeleton/></Typography>
                </CardContent>
                <CardActions>
                    <Skeleton variant="rect" width={100} height={40} animation="wave"/>
                    <Skeleton variant="rect" width={100} height={40} animation="wave"/>
                </CardActions>
            </Card>
        </Grid>
    );
};

const Home = ({ course, courses, setCourse, category, categories, setCategory, combination, search, setSearch }) => {
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

        notFoundTxt: {
            textAlign: 'center',
            marginTop: '4rem',
            fontFamily: theme.fontFamily,
        }
    }));

    const [currentCourse, setCurrentCourse] = useState(course || courses[0]);
    const [currentcategory, setCurrentcategory] = useState(category || categories[0]);
    const [resources, setResources] = useState(constants.flags.INITIAL_VALUE);

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

    useEffect(() => {
        const fetchResources = () => {
            setResources(constants.flags.INITIAL_VALUE);

            const faculty_id = combination.faculty_id;
            const department_id = combination.department_id;
            const level_id = combination.level_id;
            const course_id = currentCourse.id;
            const category_id = currentcategory.id;
    
            axios.get(`resources?faculty_id=${faculty_id}&department_id=${department_id}&level_id=${level_id}&course_id=${course_id}&category_id=${category_id}&join=true`)
            .then(response => {
                if (response.status === 200)
                    setResources(response.data);
                else if (response.status === 404) {
                    setResources(constants.flags.NOT_FOUND);
                    showInfo('Not Found', 'No resources found for the selected combination!')
                }
                else
                    showNetworkError();
            })
            .catch(() => {
                showNetworkError();
            });
        };

        fetchResources();
    }, [combination.department_id, combination.faculty_id, combination.level_id, currentCourse.id, currentcategory.id]);

    useEffect(() => {
        if (search === constants.flags.INITIAL_VALUE)
            return;

        const fetchResources = () => {
            setResources(constants.flags.INITIAL_VALUE);

            const faculty_id = combination.faculty_id;
            const department_id = combination.department_id;
            const level_id = combination.level_id;
            const course_id = currentCourse.id;
            const category_id = currentcategory.id;
    
            axios.post(`resources/search?faculty_id=${faculty_id}&department_id=${department_id}&level_id=${level_id}&course_id=${course_id}&category_id=${category_id}&join=true`,
                { search: search })
            .then(response => {
                setSearch(constants.flags.INITIAL_VALUE);

                if (response.status === 200)
                    setResources(response.data);
                else if (response.status === 404) {
                    setResources(constants.flags.NOT_FOUND);
                    showInfo('Not Found', 'No resources found for the selected combination!')
                }
                else
                    showNetworkError();
            })
            .catch(() => {
                showNetworkError();
                setSearch(constants.flags.INITIAL_VALUE);
            });
        };

        fetchResources();
    }, [combination.department_id, combination.faculty_id, combination.level_id, currentCourse.id, currentcategory.id, search, setSearch]);

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
            
            {resources === constants.flags.NOT_FOUND && <Typography variant="h6" className={classes.notFoundTxt}>No resource matched your queries. Please try other combinations.</Typography>}
                
            <Grid container justify="start" alignItems="stretch" className={classes.resourcesContainer}>
                {resources && resources !== constants.flags.NOT_FOUND && resources !== constants.flags.INITIAL_VALUE ? 
                resources.map((item, index) => (
                    <ResourceCard key={index} resource={item} />
                )) : ''}

                {resources === constants.flags.INITIAL_VALUE && <><ResourceCardLoading/><ResourceCardLoading/><ResourceCardLoading/></>}
            </Grid>
        </div>
    );
};

const Popular = ({ course, category, combination, search, setSearch }) => {
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

        notFoundTxt: {
            textAlign: 'center',
            marginTop: '4rem',
            fontFamily: theme.fontFamily,
        }
    }));

    const [resources, setResources] = useState(constants.flags.INITIAL_VALUE);

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        const fetchResources = () => {
            setResources(constants.flags.INITIAL_VALUE);

            const faculty_id = combination.faculty_id;
            const department_id = combination.department_id;
            const level_id = combination.level_id;
            const course_id = course.id;
            const category_id = category.id;
    
            axios.get(`resources?faculty_id=${faculty_id}&department_id=${department_id}&level_id=${level_id}&course_id=${course_id}&category_id=${category_id}&join=true&order_by_downloads=true`)
            .then(response => {
                if (response.status === 200)
                    setResources(response.data);
                else if (response.status === 404) {
                    setResources(constants.flags.NOT_FOUND);
                    showInfo('Not Found', 'No resources found for the selected combination!')
                }
                else
                    showNetworkError();
            })
            .catch(() => {
                showNetworkError();
            });
        };

        fetchResources();
    }, [category.id, combination.department_id, combination.faculty_id, combination.level_id, course.id]);

    useEffect(() => {
        if (search === constants.flags.INITIAL_VALUE)
            return;

        const fetchResources = () => {
            setResources(constants.flags.INITIAL_VALUE);

            const faculty_id = combination.faculty_id;
            const department_id = combination.department_id;
            const level_id = combination.level_id;
            const course_id = course.id;
            const category_id = category.id;
    
            axios.post(`resources/search?faculty_id=${faculty_id}&department_id=${department_id}&level_id=${level_id}&course_id=${course_id}&category_id=${category_id}&join=true&order_by_downloads=true`,
                { search: search })
            .then(response => {
                setSearch(constants.flags.INITIAL_VALUE);

                if (response.status === 200)
                    setResources(response.data);
                else if (response.status === 404) {
                    setResources(constants.flags.NOT_FOUND);
                    showInfo('Not Found', 'No resources found for the selected combination!')
                }
                else
                    showNetworkError();
            })
            .catch(() => {
                showNetworkError();
                setSearch(constants.flags.INITIAL_VALUE);
            });
        };

        fetchResources();
    }, [category.id, combination.department_id, combination.faculty_id, combination.level_id, course.id, search, setSearch]);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5" className={classes.header}>Popular in  <span>{course.course_code}  {category.category}s</span></Typography>
            
            {resources === constants.flags.NOT_FOUND && <Typography variant="h6" className={classes.notFoundTxt}>No resource matched your queries. Please try other combinations.</Typography>}
                
            <Grid container justify="start" alignItems="stretch" className={classes.resourcesContainer}>
                {resources && resources !== constants.flags.NOT_FOUND && resources !== constants.flags.INITIAL_VALUE ? 
                resources.map((item, index) => (
                    <ResourceCard key={index} resource={item} showDownloads={true} />
                )) : ''}

                {resources === constants.flags.INITIAL_VALUE && <><ResourceCardLoading/><ResourceCardLoading/><ResourceCardLoading/></>}
            </Grid>
        </div>
    );
};

const Comments = ({ course, category, combination }) => {
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

        notFoundTxt: {
            textAlign: 'center',
            marginTop: '4rem',
            fontFamily: theme.fontFamily,
        }
    }));

    const [comments, setComments] = useState(constants.flags.INITIAL_VALUE);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        const fetchComments = () => {
            setComments(constants.flags.INITIAL_VALUE);

            const faculty_id = combination.faculty_id;
            const department_id = combination.department_id;
            const level_id = combination.level_id;
            const course_id = course.id;
            const category_id = category.id;
    
            axios.get(`comments/category?faculty_id=${faculty_id}&department_id=${department_id}&level_id=${level_id}&course_id=${course_id}&category_id=${category_id}&join=true&order_by_downloads=true`)
            .then(response => {
                if (response.status === 200)
                    setComments(response.data);
                else if (response.status === 404) {
                    setComments(constants.flags.NOT_FOUND);
                }
                else
                    showNetworkError();
            })
            .catch(() => {
                showNetworkError();
            });
        };

        fetchComments();
    }, [category.id, combination.department_id, combination.faculty_id, combination.level_id, course.id]);

    const fetchComments = () => {
        setComments(constants.flags.INITIAL_VALUE);

        const faculty_id = combination.faculty_id;
        const department_id = combination.department_id;
        const level_id = combination.level_id;
        const course_id = course.id;
        const category_id = category.id;

        axios.get(`comments/category?faculty_id=${faculty_id}&department_id=${department_id}&level_id=${level_id}&course_id=${course_id}&category_id=${category_id}&join=true&order_by_downloads=true`)
        .then(response => {
            if (response.status === 200)
                setComments(response.data);
            else if (response.status === 404) {
                setComments(constants.flags.NOT_FOUND);
            }
            else
                showNetworkError();
        })
        .catch(() => {
            showNetworkError();
        });
    };

    const addComment = (values) => {
        setProcessing(true);

        const faculty_id = combination.faculty_id;
        const department_id = combination.department_id;
        const level_id = combination.level_id;
        const course_id = course.id;
        const category_id = category.id;
        const data = {
            course_id: course_id, 
            category_id: category_id,
            faculty_id: faculty_id,
            department_id: department_id,
            level_id: level_id,
            author: values.author,
            comment: values.comment,
        };

        axios.post('comments/category', data)
        .then(response => {
            setProcessing(false);

            if (response.status === 200) {
                ReactSwal.fire({
                    title: 'Success',
                    html: 'Comment added successfully!',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => fetchComments(),
                });
            }
            else if (response.status === 400) {
                // Validation error
                showError('Validation Error!', getErrorsMarkup(response.data.messages.error));
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => {
            showNetworkError();
            setProcessing(false);
        })
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5" className={classes.header}>Comments for  <span>{course.course_code}  {category.category}s</span></Typography>
            
            <div className={classes.commentsContainer}>
                <Paper className={classes.addCommentContainer}>
                    <Formik
                            initialValues={{
                                author: '',
                                comment: '',
                            }}
                            
                            validationSchema={Yup.object({
                                author: Yup.string()
                                    .required('Enter a display name')
                                    .max(20, 'Display name must be atmost 20 characters'),
                                comment: Yup.string()
                                    .required('Enter comment')
                                    .max(500, 'Comment must be atmost 500 characters'),
                            })}
                            onSubmit={addComment}
                        >
                            <Form>
                                <FormikField name="author" label="Display Name" variant="standard" color="secondary"/>
                                <FormikField multiline rows={5} name="comment" label="Your comment" variant="outlined" color="secondary"/>
                                {processing ? 
                                <Button startIcon={<CommentRoundedIcon/>} disabled type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>
                                    Please wait... <CircularProgress color="secondary" style={{marginLeft: '2rem'}}/>
                                </Button> : 
                                <Button startIcon={<CommentRoundedIcon/>} type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>
                                    Comment
                                </Button>}
                            </Form>
                        </Formik>
                </Paper>

                {comments === constants.flags.NOT_FOUND && <Typography variant="h6" className={classes.notFoundTxt}>No category comments for this combination yet. Be the first to comment!</Typography>}
                
                {comments && comments !== constants.flags.NOT_FOUND && comments !== constants.flags.INITIAL_VALUE ? 
                comments.map((item, index) => (
                    <CommentCard key={index} comment={item}/>
                )) : ''}

                {comments === constants.flags.INITIAL_VALUE && <><CommentCardLoading/><CommentCardLoading/><CommentCardLoading/></>}
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
    
    const history = useHistory();
    const location = useLocation();

    const [combination, setCombination] = useState({
        faculty_id: faculty,
        department_id: department,
        level_id: level,
    });
    const [tempCombination, setTempCombination] = useState(combination);
    const [linkSuffix, setLinksSuffix] = useState(`?faculty=${combination.faculty_id}&department=${combination.department_id}&level=${combination.level_id}`);
    const [links, setLinks] = useState(['/resources' + linkSuffix, '/resources/popular' + linkSuffix, '/resources/comments' + linkSuffix]);
    
    const currentNavigationIndex = links.indexOf(location.pathname + linkSuffix);
    
    const [navigationIndex, setNavigationIndex] = useState(currentNavigationIndex === -1 ? 0 : currentNavigationIndex);
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const [showSearchDialog, setShowSearchDialog] = useState(false);
    const [showFiltersDialog, setShowFiltersDialog] = useState(false);
    const [courses, setCourses] = useState(constants.flags.INITIAL_VALUE);
    const [course, setCourse] = useState(constants.flags.INITIAL_VALUE);
    const [category, setCategory] = useState(constants.flags.INITIAL_VALUE);
    const [search, setSearch] = useState(constants.flags.INITIAL_VALUE);

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

    useEffect(() => {
        const suffix = `?faculty=${combination.faculty_id}&department=${combination.department_id}&level=${combination.level_id}`;
        setLinksSuffix(suffix);
    }, [combination]);

    useEffect(() => {
        setLinks(['/resources' + linkSuffix, '/resources/popular' + linkSuffix, '/resources/comments' + linkSuffix]);
    }, [linkSuffix]);

    useEffect(() => {
        setNavigationIndex(links.indexOf(location.pathname + linkSuffix));
    }, [linkSuffix, links, location.pathname]);

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

    const searchResources = (values) => {
        setSearch(values.search);
        handleCloseSearchDialog();
    };

    const classes = useStyles();

    if (category === constants.flags.INITIAL_VALUE || course === constants.flags.INITIAL_VALUE) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Switch>
                <Route path="/resources/comments">
                    {course && category ? 
                    <Comments
                        category={category}
                        course={course}
                        combination={combination}
                    /> : ''}
                </Route>
                <Route path="/resources/popular">
                    {course && category ? 
                    <Popular
                        category={category}
                        course={course}
                        combination={combination}
                        search={search}
                        setSearch={setSearch}
                    /> : ''}
                </Route>
                <Route path="/">
                    <Home 
                        category={category}
                        categories={categories} 
                        setCategory={setCategory} 
                        courses={courses} 
                        setCourse={setCourse}
                        course={course}
                        combination={combination}
                        search={search}
                        setSearch={setSearch}
                    />
                </Route>
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
                <DialogTitle id="search-dialog-title">Search {course.course_code}  {category.category}s</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter keywords to search. Resources having the provided keywords in their title or description will be displayed.
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                search: ''
                            }}
                            
                            validationSchema={Yup.object({
                                search: Yup.string()
                                    .required('Enter the search keywords!'),
                            })}
                            onSubmit={searchResources}
                        >
                            <Form id="search-form">
                                <FormikField  
                                    color="secondary"
                                    autoFocus
                                    margin="dense"
                                    name="search"
                                    label="Search Keywords"
                                    fullWidth
                                />
                            </Form>
                        </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSearchDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button form="search-form" type="submit" variant="contained" color="secondary" endIcon={<SearchRoundedIcon/>}>
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
                            initialValues={{}}
                            
                            onSubmit={() => { handleCloseFiltersDialog(); setCombination(tempCombination); }}
                        >
                            <Form id="filters-form">
                                <CombinationSelection dataChanged={setTempCombination} />
                            </Form>
                        </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFiltersDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button form="filters-form" type="submit" variant="contained" color="secondary" endIcon={<KeyboardArrowRightRounded/>}>
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