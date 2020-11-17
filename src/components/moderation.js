import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, MenuItem, Paper, Slide, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import FormikField from "./formik-field";
import { scrollToTop } from "./utils";
import addResourceImage from '../images/add.svg';
import manageResourceImage from '../images/settings.svg';
import editProfileImage from '../images/edit.svg';
import { CloudUploadRounded, EditRounded } from "@material-ui/icons";
import FormikSelect from "./formik-select";

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
            marginTop: '4rem',
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.paperContainer}>
                <Paper elevation={5} className={classes.paper}>
                    <Typography variant="h4" className="header">Sign In</Typography>

                    <Formik
                        initialValues={{
                            
                        }}
                        
                        
                        onSubmit={(values) => {}}
                    >
                        <Form>
                            <FormikField  
                                color="secondary"
                                margin="dense"
                                name="username"
                                label="Username"
                                variant="outlined"
                                fullWidth
                            />
                            <FormikField  
                                color="secondary"
                                margin="dense"
                                name="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.btn}>Submit</Button>
                        </Form>
                    </Formik>
                </Paper>
            </div>
        </div>
    );
};

const Home = () => {
    const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
    const [showAddResourceDialog, setShowAddResourceDialog] = useState(false);

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
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.coursePaperContainer}>
                <Paper className={classes.coursePaper} elevation={4}>
                    <Typography variant="h4" className="header">Add a Course</Typography>

                    <Formik
                        initialValues={{
                            
                        }}
                        
                        
                        onSubmit={(values) => {}}
                    >
                        <Form>
                            <FormikField  
                                color="secondary"
                                margin="dense"
                                name="course_title"
                                label="Course Title"
                                variant="outlined"
                                fullWidth
                            />
                            <FormikField  
                                color="secondary"
                                margin="dense"
                                name="course_code"
                                label="Course Code"
                                variant="outlined"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.addCourseBtn}>Add Course</Button>
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
                        <Paper className={classes.manageResourcesPaper}>
                            <Typography variant="h4" className="header">Manage Resources</Typography>
                            <img src={manageResourceImage} alt="Upload Resources"/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>

            <Dialog
                open={showEditProfileDialog} 
                onClose={handleCloseEditProfileDialog}
                aria-labelledby="editprofile-dialog-title" 
                TransitionComponent={Transition}
            >
                <DialogTitle id="editprofile-dialog-title">Edit Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new values for fields that you want to update. Fields marked with asteriks are required.
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => {}}
                        >
                            <Form>
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="full_name"
                                    label="Full Name"
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikSelect 
                                    name="gender" 
                                    defaultValue="male" 
                                    label="Gender"
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </FormikSelect>
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="phone"
                                    label="Phone"
                                    type="tel"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Form>
                        </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditProfileDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" startIcon={<EditRounded/>}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showAddResourceDialog} 
                onClose={handleCloseAddResourceDialog}
                aria-labelledby="addresource-dialog-title" 
                TransitionComponent={Transition}
            >
                <DialogTitle id="addresource-dialog-title">Upload Resource</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new values for fields that you want to update. Fields marked with asteriks are required.
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => {}}
                        >
                            <Form>
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="full_name"
                                    label="Full Name"
                                    type="text"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikSelect 
                                    name="gender" 
                                    defaultValue="male" 
                                    label="Gender"
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </FormikSelect>
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="phone"
                                    label="Phone"
                                    type="tel"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    margin="dense"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Form>
                        </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddResourceDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" startIcon={<CloudUploadRounded/>}>
                        Upload
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

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => showFooter(false), [showFooter]);

    return (
        <div className={classes.root}>
            <Switch>
                <Route path="/moderation/login"><Login/></Route>
                <Route path="/moderation/home"><Home/></Route>
                <Route path="/"><Redirect to="/moderation/home"/></Route>
            </Switch>
        </div>
    );
};

export default Moderation;