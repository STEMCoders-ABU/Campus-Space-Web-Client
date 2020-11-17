import { AppBar, Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogContentText, Grid, IconButton, makeStyles, MenuItem, Paper, Select, Slide, Toolbar, Typography } from "@material-ui/core";
import { AccountCircleRounded, AddRounded, CloudUploadRounded, DeleteRounded, EditRounded, KeyboardArrowLeftRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import addResourceImage from '../images/add.svg';
import editProfileImage from '../images/edit.svg';
import manageResourceImage from '../images/settings.svg';
import FormikField from "./formik-field";
import FormikSelect from "./formik-select";
import { scrollToTop } from "./utils";

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

    const classes = useStyles();

    useEffect(() => {
        scrollToTop();
    }, []);

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
                                <Button type="submit" variant="contained" color="secondary" size="large" startIcon={<AccountCircleRounded/>}>Submit</Button>
                            </div>
                        </Form>
                    </Formik>
                </Paper>
            </div>
        </div>
    );
};

const Home = () => {
    const [showEditFacultyDialog, setShowEditFacultyDialog] = useState(false);
    const [showEditDepartmentDialog, setShowEditDepartmentDialog] = useState(false);

    const history = useHistory();
    
    const handleCloseEditFacultyDialog = () => {
        setShowEditFacultyDialog(false);
    };

    const handleShowEditFacultyDialog = () => {
        setShowEditFacultyDialog(true);
    };

    const handleCloseEditDepartmentDialog = () => {
        setShowEditDepartmentDialog(false);
    };

    const handleShowEditDepartmentDialog = () => {
        setShowEditDepartmentDialog(true);
    };

    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        heroCardContainer: {
            padding: '0 2rem 0 2rem',
            marginTop: '3rem',
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
        heroCard: {
            padding: '1rem',
            boxShadow: theme.shadows[5],
            [theme.breakpoints.down('xs')]: {
                padding: '1rem 0.3rem 0.3rem 0.3rem',
            },

            '& .header': {
                marginBottom: '3rem',
                textAlign: 'center',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '1.6rem',
                },
            },
            '& .selector': {
                textAlign: 'left',
            },
        },
        heroBtnContainer: {
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

    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="stretch">
                <Grid item xs={12} lg={6} className={classes.heroCardContainer}>
                    <Card className={classes.heroCard}>
                        <Typography variant="h4" className="header">Manage Faculty</Typography>
                        <CardContent>
                            <Select 
                                name="faculty" 
                                defaultValue="0" 
                                label="Faculty"
                                variant="outlined"
                                required
                                fullWidth
                            >
                                <MenuItem value="0">Test Faculty</MenuItem>
                            </Select>
                        </CardContent>
                        <CardActions className={classes.heroBtnContainer}>
                            <Button variant="contained" color="secondary" startIcon={<EditRounded/>}>Edit</Button>
                            <Button variant="contained" color="secondary" startIcon={<DeleteRounded/>}>Remove</Button>
                            <Button variant="contained" color="secondary" startIcon={<AddRounded/>}>Add</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6} className={classes.heroCardContainer}>
                    <Card className={classes.heroCard}>
                        <Typography variant="h4" className="header">Manage Department</Typography>
                        <CardContent>
                            <Select
                                style={{width: '100%', marginBottom: '1rem' }}
                                name="faculty" 
                                defaultValue="0" 
                                label="Faculty"
                                variant="outlined"
                                required
                                fullWidth
                            >
                                <MenuItem value="0">Test Faculty</MenuItem>
                            </Select>
                            <Select
                                name="department" 
                                defaultValue="0" 
                                label="Department"
                                variant="outlined"
                                required
                                fullWidth
                            >
                                <MenuItem value="0">Test Department</MenuItem>
                            </Select>
                        </CardContent>
                        <CardActions className={classes.heroBtnContainer}>
                            <Button variant="contained" color="secondary" startIcon={<EditRounded/>}>Edit</Button>
                            <Button variant="contained" color="secondary" startIcon={<DeleteRounded/>}>Remove</Button>
                            <Button variant="contained" color="secondary" startIcon={<AddRounded/>}>Add</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            
            <div className={classes.optionsContainer}>
                <Grid container justify="center" spacing={0} alignItems="stretch">
                    <Grid item lg={4} xs={12} sm={6} className={classes.optionContainer}>
                        <Paper className={classes.editProfilePaper} onClick={handleShowEditFacultyDialog}>
                            <Typography variant="h4" className="header">Edit Profile</Typography>
                            <img src={editProfileImage} alt="Edit Profile"/>
                        </Paper>
                    </Grid>

                    <Grid item lg={4} xs={12} sm={6} className={classes.optionContainer}>
                        <Paper className={classes.addResourcePaper} onClick={handleShowEditDepartmentDialog}>
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
                open={showEditFacultyDialog} 
                onClose={handleCloseEditFacultyDialog}
                TransitionComponent={Transition}
                fullScreen
            >
                <AppBar className={classes.dialogAppBar} color="primary">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseEditFacultyDialog} aria-label="close">
                            <KeyboardArrowLeftRounded/>
                        </IconButton>
                        <Typography variant="h6" className={classes.dialogTitle}>
                            Edit Profile
                        </Typography>
                        <Button color="inherit" variant="outlined" type="submit" form="edit-profile-form" startIcon={<EditRounded/>}>
                            Update
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        Enter new values for fields that you want to update. Fields marked with asteriks are required.
                    </DialogContentText>
                        <Formik
                            initialValues={{
                                
                            }}
                            
                            
                            onSubmit={(values) => { alert('hello'); }}
                        >
                            <Form id="edit-profile-form">
                                <FormikField
                                    color="secondary"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
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
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </FormikSelect>
                                <FormikField
                                    color="secondary"
                                    name="phone"
                                    label="Phone"
                                    type="tel"
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                                <FormikField
                                    color="secondary"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Form>
                        </Formik>
                </DialogContent>
            </Dialog>

            <Dialog
                open={showEditDepartmentDialog} 
                onClose={handleCloseEditDepartmentDialog}
                TransitionComponent={Transition}
                fullScreen
            >
                <AppBar className={classes.dialogAppBar} color="primary">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseEditDepartmentDialog} aria-label="close">
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
};

const Admin = ({ showFooter }) => {
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
                <Route path="/admin/login"><Login/></Route>
                <Route path="/admin/home"><Home/></Route>
                <Route path="/"><Redirect to="/admin/home"/></Route>
            </Switch>
        </div>
    );
};

export default Admin;