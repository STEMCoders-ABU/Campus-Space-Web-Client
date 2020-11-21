import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, makeStyles, MenuItem, Paper, Slide, Toolbar, Typography } from "@material-ui/core";
import { AccountCircleRounded, CloudUploadRounded, DeleteRounded, EditRounded, KeyboardArrowLeftRounded, SearchRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import addResourceImage from '../images/add.svg';
import editProfileImage from '../images/edit.svg';
import manageResourceImage from '../images/settings.svg';
import FormikField from "./formik-field";
import FormikSelect from "./formik-select";
import { getErrorsMarkup, ReactSwal, scrollToTop, showError, showLoading, showNetworkError, showSuccess } from "./utils";
import documentImage from '../images/folder.svg';
import pdfImage from '../images/pdf.svg';
import videoImage from '../images/youtube.svg';
import { connect, useDispatch } from "react-redux";
import * as creators from '../redux/actions/creators';
import * as Yup from 'yup';
import { axios } from "../init";
import * as constants from '../redux/actions/constants';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Login = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: theme.spacing(15),
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                marginTop: theme.spacing(8),
                marginBottom: theme.spacing(6),
            },
            [theme.breakpoints.only('md')]: {
                marginBottom: theme.spacing(6),
            },
        },

        paperContainer: {
            padding: '0 20rem 0 20rem',
            [theme.breakpoints.down('xs')]: {
                padding: '0 1rem 0 1rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '0 5rem 0 5rem',
            },
            [theme.breakpoints.only('md')]: {
                padding: '0 10rem 0 10rem',
            },
        },
        paper: {
            padding: '1rem',

            '& .header': {
                marginBottom: '5rem',
            },
            '& .selector': {
                textAlign: 'left',
            },
        },
        btn: {
            marginTop: '3rem',
            textAlign: 'left',
        },
    }));

    const [processing, setProcessing] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        scrollToTop();
    }, []);

    const login = (values) => {
        setProcessing(true);

        axios.post('moderator/session', {}, {
            auth: {
                username: values.username,
                password: values.password,
            }
        })
        .then(res => {
            setProcessing(false);

            if (res.status === 204) {
                dispatch(creators.app.authenticate(true, '/moderation/logout'));
                history.push('/moderation/home');
            }
            else if (res.status === 401) {
                showError('Oops!', 'Invalid username or password');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => { setProcessing(false); showNetworkError(); });
    };

    return (
        <div className={classes.root}>
            <div className={classes.paperContainer}>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h4" className="header">Moderator Sign In</Typography>

                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        
                        validationSchema={Yup.object({
                            username: Yup.string()
                                .required('Enter your username')
                                .max(12, 'Username must be atmost 12 characters'),
                            password: Yup.string().required('Enter your password'),
                        })}
                        onSubmit={login}
                    >
                        <Form>
                            <FormikField  
                                color="secondary"
                                name="username"
                                label="Username"
                                variant="outlined"
                                fullWidth
                            />
                            <FormikField  
                                color="secondary"
                                name="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.btn}>
                                {processing ? 
                                <Button type="submit" variant="contained" disabled color="secondary" size="large" startIcon={<AccountCircleRounded/>}>
                                    Please wait... <CircularProgress color="secondary" style={{marginLeft: '2rem'}}/>
                                </Button>
                                 : 
                                 <Button type="submit" variant="contained" color="secondary" size="large" startIcon={<AccountCircleRounded/>}>Submit</Button>}
                            </div>
                        </Form>
                    </Formik>
                </Paper>
            </div>
        </div>
    );
};

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        axios.delete('moderator/session');
        dispatch(creators.app.authenticate(false, ''));
        history.push('/');
    }, [dispatch, history]);

    return  null;
};

const Home = connect(state => ({
    auth: {...state.appReducer.auth}
  }))(({ auth }) => {

    const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
    const [showAddResourceDialog, setShowAddResourceDialog] = useState(false);
    const [moderatorData, setModeratorData] = useState(null);
    const [processingAddCourse, setProcessingAddCourse] = useState(false);
    const [processingEditProfile, setProcessingEditProfile] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleCloseEditProfileDialog = () => {
        setShowEditProfileDialog(false);
    };

    const handleShowEditProfileDialog = () => {
        setShowEditProfileDialog(true);
    };

    const handleCloseAddResourceDialog = () => {
        setShowAddResourceDialog(false);
    };

    const handleShowAddResourceDialog = () => {
        setShowAddResourceDialog(true);
    };

    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        coursePaperContainer: {
            padding: '0 20rem 0 20rem',
            [theme.breakpoints.down('xs')]: {
                padding: '0 1rem 0 1rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '0 5rem 0 5rem',
            },
            [theme.breakpoints.only('md')]: {
                padding: '0 10rem 0 10rem',
            },
        },
        coursePaper: {
            padding: '2rem',

            '& .header': {
                marginBottom: '5rem',
                textAlign: 'center',
            },
            '& .selector': {
                textAlign: 'left',
            },
        },
        addCourseBtn: {
            marginTop: '1rem',
        },

        optionsContainer: {
            marginTop: '4rem',
        },

        optionContainer: {
            padding: '2rem 3rem 0 3rem',
            [theme.breakpoints.down('xs')]: {
                padding: '2rem 1.3rem 0 1.3rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '2rem 2rem 0 2rem',
            },

            '& .header': {
                marginBottom: '2rem',
                fontFamily: theme.fontFamily,
                textAlign: 'center',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '1.5rem',
                },
            },

            '& img': {
                width: '100%',
                height: 'auto',
            }
        },

        editProfilePaper: {
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: '#ff7d6c',
            cursor: 'pointer',
            transition: '.3s ease',
            height: '100%',
            borderRadius: '2rem',

            '&:hover': {
                boxShadow: theme.shadows[24],
                backgroundColor: theme.resourceCard.background,
                transition: '.3s ease',
            },
        },

        addResourcePaper: {
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: '#1ceb9f',
            cursor: 'pointer',
            transition: '.3s ease',
            height: '100%',
            borderRadius: '2rem',

            '&:hover': {
                boxShadow: theme.shadows[24],
                backgroundColor: theme.resourceCard.background,
                transition: '.3s ease',
            },
        },

        manageResourcesPaper: {
            textAlign: 'center',
            padding: '3rem',
            backgroundColor: '#47daea',
            cursor: 'pointer',
            transition: '.3s ease',
            height: '100%',
            borderRadius: '2rem',

            '&:hover': {
                boxShadow: theme.shadows[24],
                backgroundColor: theme.resourceCard.background,
                transition: '.3s ease',
            },
        },

        dialogContent: {
            fontFamily: theme.fontFamily,
            marginBottom: '2rem',
        },

        dialogAppBar: {
            position: 'relative',
        },
        dialogTitle: {
            marginLeft: theme.spacing(2),
            flex: 1,
            [theme.breakpoints.down('xs')]: {
                fontSize: '1rem',
            }
        },
    }));

    const classes = useStyles();
    
    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        if (!auth.authenticated)
            history.push('/moderation/login');
    }, [auth, history]);

    useEffect(() => {
        if (auth.authenticated) {
            showLoading();

            axios.get('moderator')
            .then(res => {
                ReactSwal.close();

                if (res.status === 200) {
                    setModeratorData(res.data);
                }
                else if (res.status === 401) {
                    // Unauthorized
                    axios.delete('moderator/session');
                    dispatch(creators.app.authenticate(false, ''));
                    history.push('/moderation/login');
                }
                else {
                    showNetworkError();
                }
            })
            .catch(() => showNetworkError());
        }
    }, [auth.authenticated, dispatch, history]);

    const addCourse = (values) => {
        setProcessingAddCourse(true);

        axios.post('moderator/courses', values)
        .then(res => {
            setProcessingAddCourse(false);

            if (res.status === 200) {
                showSuccess('Success!', `${values.course_code} added successfully!`);
            }
            else if (res.status === 400) {
                showError('Oops', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('moderator/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/moderation/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => { setProcessingAddCourse(false); showNetworkError(); })
    };

    const updateProfile = (values) => {
        const data = {
            email: values.email,
            full_name: values.full_name,
            gender: values.gender,
            phone: values.phone,
        }

        if (values.password !== '') {
            if (values.password === values.confirm_password) 
                data.password = values.password;
            else {
                showError('Oops!', 'Passwords do not match!');
                return;
            }
        }

        setProcessingEditProfile(true);

        axios.put('moderator', data)
        .then(res => {
            setProcessingEditProfile(false);

            if (res.status === 200) {
                showSuccess('Success!', 'Profile updated successfully!');
                setModeratorData(res.data);
                handleCloseEditProfileDialog();
            }
            else if (res.status === 400) {
                showError('Oops', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('moderator/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/moderation/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => { setProcessingEditProfile(false); showNetworkError(); })
    };

    if (!auth.authenticated || !moderatorData)
        return null;

    return (
        <div className={classes.root}>
            <div className={classes.coursePaperContainer}>
                <Paper className={classes.coursePaper} elevation={4}>
                    <Typography variant="h4" className="header">Add a Course</Typography>

                    <Formik
                        initialValues={{
                            course_title: '',
                            course_code: '',
                        }}
                        
                        validationSchema={Yup.object({
                            course_title: Yup.string()
                                .required('Enter the course title')
                                .max(60, 'Course title must be atmost 60 characters long!'),
                            course_code: Yup.string()
                                .required('Enter the course code')
                                .max(12, 'Course code must be atmost 12 characters long')
                        })}
                        
                        onSubmit={addCourse}
                    >
                        <Form>
                            <FormikField  
                                color="secondary"
                                name="course_title"
                                label="Course Title"
                                variant="outlined"
                                fullWidth
                            />
                            <FormikField  
                                color="secondary"
                                name="course_code"
                                label="Course Code"
                                variant="outlined"
                                fullWidth
                            />
                            {processingAddCourse ? 
                            <Button type="submit" disabled variant="contained" color="secondary" size="large" className={classes.addCourseBtn}>
                                Please wait... <CircularProgress color="secondary" style={{marginLeft: '2rem'}}/>
                            </Button> :
                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.addCourseBtn}>Add Course</Button>}
                        </Form>
                    </Formik>
                </Paper>
            </div>

            <div className={classes.optionsContainer}>
                <Grid container justify="center" spacing={0} alignItems="stretch">
                    <Grid item lg={4} xs={12} sm={6} className={classes.optionContainer}>
                        <Paper className={classes.editProfilePaper} onClick={handleShowEditProfileDialog}>
                            <Typography variant="h4" className="header">Edit Profile</Typography>
                            <img src={editProfileImage} alt="Edit Profile"/>
                        </Paper>
                    </Grid>

                    <Grid item lg={4} xs={12} sm={6} className={classes.optionContainer}>
                        <Paper className={classes.addResourcePaper} onClick={handleShowAddResourceDialog}>
                            <Typography variant="h4" className="header">Upload Resources</Typography>
                            <img src={addResourceImage} alt="Upload Resources"/>
                        </Paper>
                    </Grid>

                    <Grid item lg={4} xs={12} sm={6} className={classes.optionContainer}>
                        <Paper className={classes.manageResourcesPaper} onClick={() => history.push('/moderation/manage')}>
                            <Typography variant="h4" className="header">Manage Resources</Typography>
                            <img src={manageResourceImage} alt="Upload Resources"/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

            <Dialog
                open={showEditProfileDialog} 
                onClose={handleCloseEditProfileDialog}
                TransitionComponent={Transition}
                fullScreen
            >
                <AppBar className={classes.dialogAppBar} color="primary">
                    <Toolbar>
                        {processingEditProfile ? 
                        <IconButton disabled edge="start" color="inherit" aria-label="close">
                            <KeyboardArrowLeftRounded/>
                        </IconButton> : 
                        <IconButton edge="start" color="inherit" onClick={handleCloseEditProfileDialog} aria-label="close">
                            <KeyboardArrowLeftRounded/>
                        </IconButton>}
                        <Typography variant="h6" className={classes.dialogTitle}>
                            Edit Profile
                        </Typography>
                        {processingEditProfile ? 
                        <Button disabled color="inherit" variant="outlined" form="edit-profile-form">
                            Updating... <CircularProgress color="secondary" style={{marginLeft: '2rem'}}/>
                        </Button> :
                        <Button color="inherit" variant="outlined" type="submit" form="edit-profile-form" startIcon={<EditRounded/>}>
                            Update
                        </Button>}
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        Enter new values for fields that you want to update.<br/>
                        <strong>Leave the password fields empty if you do not want to change it!</strong>
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                email: moderatorData.email,
                                full_name: moderatorData.full_name,
                                gender: moderatorData.gender,
                                phone: moderatorData.phone,
                                password: '',
                                confirm_password: '',
                            }}
                            
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .required('Enter your email address')
                                    .email('Enter a valid email address')
                                    .max(50, 'The email must be atmost 50 characters long'),
                                full_name: Yup.string()
                                    .required('Enter your full name')
                                    .max(50, 'Your full name must be atmost 50 characters long'),
                                gender: Yup.string()
                                    .required('Choose a gender')
                                    .oneOf(['Male', 'Female']),
                                phone: Yup.string()
                                    .required('Enter your phone number')
                                    .max(15, 'Your phone number must be atmost 15 characters long'),
                            })}
                            
                            onSubmit={updateProfile}
                        >
                            <Form id="edit-profile-form">
                                <FormikField
                                    color="secondary"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    name="full_name"
                                    label="Full Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                                <FormikSelect 
                                    name="gender" 
                                    defaultValue="male" 
                                    label="Gender"
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </FormikSelect>
                                <FormikField
                                    color="secondary"
                                    name="phone"
                                    label="Phone"
                                    type="tel"
                                    variant="outlined"
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    name="password"
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Form>
                        </Formik>
                </DialogContent>
            </Dialog>

            <Dialog
                open={showAddResourceDialog} 
                onClose={handleCloseAddResourceDialog}
                TransitionComponent={Transition}
                fullScreen
            >
                <AppBar className={classes.dialogAppBar} color="primary">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseAddResourceDialog} aria-label="close">
                            <KeyboardArrowLeftRounded/>
                        </IconButton>
                        <Typography variant="h6" className={classes.dialogTitle}>
                            Upload Resources
                        </Typography>
                        <Button color="inherit" variant="outlined" type="submit" form="add-resource-form" startIcon={<CloudUploadRounded/>}>
                            Upload
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        A resource category determines the type of resource that can be uploaded. The list below explains the type of resources allowed for each category:
                        <ul>
                            <li>
                                <strong>Document</strong>: For Microsoft documents like Word (doc, docx), Excel (xls, xlsx) or Power Point (ppt, pptx).
                            </li>
                            <li>
                                <strong>Material</strong>: For lecture materials released by lecturers. This must be in PDF format.
                            </li>
                            <li>
                                <strong>Textbook</strong>: For other useful textual resources like e-books. This must also be in PDF format.
                            </li>
                            <li>
                                <strong>Video</strong>: For visual resources like tutorial vidoes. This must be in MP4 format.
                            </li>
                        </ul>
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => {}}
                        >
                            <Form id="add-resource-form">
                                <FormikSelect 
                                    name="course_code" 
                                    label="Course Code"
                                    variant="outlined"
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="test1">COSC101</MenuItem>
                                    <MenuItem value="test2">COSC102</MenuItem>
                                </FormikSelect>
                                <FormikField
                                    color="secondary"
                                    name="resource_name"
                                    label="Resource Title"
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikSelect 
                                    name="resource_category" 
                                    label="Resource Category"
                                    variant="outlined"
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="test1">Material</MenuItem>
                                    <MenuItem value="test2">Document</MenuItem>
                                </FormikSelect>
                                <FormikField
                                    color="secondary"
                                    name="resource_description"
                                    label="Resource Description"
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows={6}
                                />
                                <FormikField
                                    color="secondary"
                                    name="resource_file"
                                    label=""
                                    type="file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            </Form>
                        </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
});

const ResourceCard = ({ resource = {category: 'Video'}, editResource, removeResource }) => {
    const useStyles = makeStyles(theme => ({
        imgContainer: {
            padding: '3rem',
            background: theme.resourceCard.background,
        },

        root: {
            padding: '2rem 3rem 0 3rem',
            [theme.breakpoints.down('xs')]: {
                padding: '2rem 1.3rem 0 1.3rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '2rem 2rem 0 2rem',
            },

            '& img': {
                width: '100%',
                height: 'auto',
            }
        },
    }));

    const classes = useStyles();
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
        <Grid item lg={4} xs={12} sm={6} className={classes.root}>
            <Card>
                <div className={classes.imgContainer}>
                    <CardMedia
                        component="img"
                        image={image}
                    />
                </div>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>Excellent Resource</Typography>
                    <Typography variant="subtitle1" color="textSecondary">2020-01-12</Typography>
                    <Typography variant="subtitle1" color="textSecondary">COSC101</Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" color="primary.dark" component={Link} to={`../resource/${resource.id}`}>View</Button>
                    <Button variant="contained" color="secondary" startIcon={<EditRounded/>} onClick={() => editResource(resource)}>Edit</Button>
                    <Button variant="contained" color="secondary" startIcon={<DeleteRounded/>} onClick={() => removeResource(resource)}>Remove</Button>
                </CardActions>
            </Card>         
        </Grid>
    );
};

const Manage = () => {
    const [showEditResourceDialog, setShowEditResourceDialog] = useState(false);
    const [showDeleteResourceDialog, setShowDeleteResourceDialog] = useState(false);

    const handleCloseEditResourceDialog = () => {
        setShowEditResourceDialog(false);
    };

    const handleShowEditResourceDialog = (resource) => {
        setShowEditResourceDialog(true);
    };

    const handleCloseDeleteResourceDialog = () => {
        setShowDeleteResourceDialog(false);
    };

    const handleShowDeleteResourceDialog = (resource) => {
        setShowDeleteResourceDialog(true);
    };

    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        filterPaperContainer: {
            padding: '0 20rem 0 20rem',
            [theme.breakpoints.down('xs')]: {
                padding: '0 1rem 0 1rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '0 5rem 0 5rem',
            },
            [theme.breakpoints.only('md')]: {
                padding: '0 10rem 0 10rem',
            },
        },
        filterPaper: {
            padding: '2rem',

            '& .header': {
                marginBottom: '5rem',
                textAlign: 'center',
            },
            '& .selector': {
                textAlign: 'left',
            },
        },
        filterBtn: {
            marginTop: '1rem',
        },

        resourcesContainer: {
            marginTop: '4rem',
        },

        dialogContent: {
            fontFamily: theme.fontFamily,
            marginBottom: '2rem',
        },

        dialogAppBar: {
            position: 'relative',
        },
        dialogTitle: {
            marginLeft: theme.spacing(2),
            flex: 1,
            [theme.breakpoints.down('xs')]: {
                fontSize: '1rem',
            }
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        scrollToTop();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.filterPaperContainer}>
                <Paper className={classes.filterPaper} elevation={4}>
                    <Typography variant="h4" className="header">Filter Resources</Typography>

                    <Formik
                        initialValues={{
                            
                        }}
                        
                        onSubmit={(values) => {}}
                    >
                        <Form>
                            <FormikSelect 
                                name="resource_category" 
                                defaultValue="0" 
                                label="Category"
                                variant="outlined"
                                required
                                fullWidth
                            >
                                <MenuItem value="0">All</MenuItem>
                            </FormikSelect>
                            <FormikSelect 
                                name="course" 
                                defaultValue="0" 
                                label="Course"
                                variant="outlined"
                                required
                                fullWidth
                            >
                                <MenuItem value="0">COSC101</MenuItem>
                            </FormikSelect>
                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.filterBtn} startIcon={<SearchRounded/>}>Filter</Button>
                        </Form>
                    </Formik>
                </Paper>
            </div>

            <div className={classes.resourcesContainer}>
                <Grid container justify="start" spacing={0} alignItems="stretch">
                    <ResourceCard editResource={handleShowEditResourceDialog} removeResource={handleShowDeleteResourceDialog} resource={{ category: 'Document' }}/> <ResourceCard resource={{ category: 'Textbook' }}/> <ResourceCard/>
                    <ResourceCard resource={{ category: 'Material' }}/>
                </Grid>
            </div>

            <Dialog
                open={showEditResourceDialog} 
                onClose={handleCloseEditResourceDialog}
                TransitionComponent={Transition}
                fullScreen
            >
                <AppBar className={classes.dialogAppBar} color="primary">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseEditResourceDialog} aria-label="close">
                            <KeyboardArrowLeftRounded/>
                        </IconButton>
                        <Typography variant="h6" className={classes.dialogTitle}>
                            Edit Resource
                        </Typography>
                        <Button color="inherit" variant="outlined" type="submit" form="edit-resource-form" startIcon={<EditRounded/>}>
                            Update
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        Enter new values for fields that you want to update. Fields marked with asteriks are required.<br/>
                        <strong>Please note that you are not allowed to change the category or file of an uploaded resource. If that's your requirement, you'll have
                        to delete the resource and add it again with the desired configurations.</strong>
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => { alert('hello'); }}
                        >
                            <Form id="edit-resource-form">
                            <FormikSelect 
                                    name="course_code" 
                                    label="Course Code"
                                    variant="outlined"
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="test1">COSC101</MenuItem>
                                    <MenuItem value="test2">COSC102</MenuItem>
                                </FormikSelect>
                                <FormikField
                                    color="secondary"
                                    name="resource_name"
                                    label="Resource Title"
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    name="resource_description"
                                    label="Resource Description"
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows={6}
                                />
                            </Form>
                        </Formik>
                </DialogContent>
            </Dialog>

            <Dialog
                open={showDeleteResourceDialog} 
                onClose={handleCloseDeleteResourceDialog}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        Are you sure you want to permanently remove this resource?<br/>
                        <strong>Please note that you cannot reverse this process.</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteResourceDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" startIcon={<DeleteRounded/>}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const Moderation = ({ showFooter }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '1rem',
        },
    }));

    const classes = useStyles();

    useEffect(() => showFooter(false), [showFooter]);

    return (
        <div className={classes.root}>
            <Switch>
                <Route path="/moderation/manage"><Manage/></Route>
                <Route path="/moderation/login"><Login/></Route>
                <Route path="/moderation/logout"><Logout/></Route>
                <Route path="/moderation/home"><Home/></Route>
                <Route path="/"><Redirect to="/moderation/home"/></Route>
            </Switch>
        </div>
    );
};

export default Moderation;