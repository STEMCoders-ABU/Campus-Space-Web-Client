import { Button, Card, CardActions, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, MenuItem, Paper, Slide, Typography } from "@material-ui/core";
import { AccountCircleRounded, AddRounded, DeleteRounded, EditRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { axios } from "../init";
import * as creators from '../redux/actions/creators';
import CombinationSelection from "./combination-selection";
import FormikField from "./formik-field";
import FormikSelect from "./formik-select";
import { getErrorsMarkup, ReactSwalFire, scrollToTop, showError, showLoading, showNetworkError, showSuccess } from "./utils";
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

        axios.post('admin/session', {}, {
            auth: {
                username: values.username,
                password: values.password,
            }
        })
        .then(res => {
            setProcessing(false);

            if (res.status === 204) {
                dispatch(creators.app.authenticate(true, '/admin/logout'));
                history.push('/admin');
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
                    <Typography variant="h4" className="header">Admin Sign In</Typography>

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
        axios.delete('admin/session');
        dispatch(creators.app.authenticate(false, ''));
        history.push('/');
    }, [dispatch, history]);

    return  null;
};

const Home = connect(state => ({
    auth: {...state.appReducer.auth},
  }))(({ auth}) => {
    const [showEditFacultyDialog, setShowEditFacultyDialog] = useState(false);
    const [showEditDepartmentDialog, setShowEditDepartmentDialog] = useState(false);
    const [showDeleteFacultyDialog, setShowDeleteFacultyDialog] = useState(false);
    const [showDeleteDepartmentDialog, setShowDeleteDepartmentDialog] = useState(false);
    const [showAddFacultyDialog, setShowAddFacultyDialog] = useState(false);
    const [showAddDepartmentDialog, setShowAddDepartmentDialog] = useState(false);

    const [combinationData, setCombinationData] = useState({
        faculty_id: 0,
        level_id: 0,
        department_id: 0,
    });
    const [defaultRepData, setDefaultRepData] = useState({
        username: '',
        email: '',
        full_name: '',
        gender: 'Male',
        phone: '',
        password: '',
        confirm_password: '',
    });

    const [manageDeptData, setManageDeptData] = useState({
        faculty_id: 0,
        level_id: 0,
        department_id: 0,
    });
    const [manageFactData, setManageFactData] = useState({
        faculty_id: 0,
        level_id: 0,
        department_id: 0,
    });

    const [faculties, setFaculties] = useState(constants.flags.INITIAL_VALUE);
    const [departments, setDepartments] = useState(constants.flags.INITIAL_VALUE);
    const [targetFaculty, setTargetFaculty] = useState(null);
    const [targetDept, setTargetDept] = useState(null);

    const handleCloseEditFacultyDialog = () => {
        setShowEditFacultyDialog(false);
    };

    const handleShowEditFacultyDialog = () => {
        if (faculties === constants.flags.INITIAL_VALUE) {
            showError('Oops!', 'A network error occured! Please reload the page.');
            return;
        }

        setTargetFaculty(null);

        const target = faculties.filter((item, index) => {
            return (item.id === manageFactData.faculty_id);
        })[0];

        setTargetFaculty(target);
        setShowEditFacultyDialog(true);
    };

    const handleCloseEditDepartmentDialog = () => {
        setShowEditDepartmentDialog(false);
    };

    const handleShowEditDepartmentDialog = () => {
        if (departments === constants.flags.INITIAL_VALUE) {
            showError('Oops!', 'A network error occured! Please reload the page.');
            return;
        }

        setTargetDept(null);

        const target = departments.filter((item, index) => {
            return (item.id === manageDeptData.department_id);
        })[0];

        setTargetDept(target);
        setShowEditDepartmentDialog(true);
    };

    const handleCloseDeleteFacultyDialog = () => {
        setShowDeleteFacultyDialog(false);
    };

    const handleShowDeleteFacultyDialog = () => {
        if (faculties === constants.flags.INITIAL_VALUE) {
            showError('Oops!', 'A network error occured! Please reload the page.');
            return;
        }

        setTargetFaculty(null);

        const target = faculties.filter((item, index) => {
            return (item.id === manageFactData.faculty_id);
        })[0];

        setTargetFaculty(target);
        
        setShowDeleteFacultyDialog(true);
    };

    const handleCloseDeleteDepartmentDialog = () => {
        setShowDeleteDepartmentDialog(false);
    };

    const handleShowDeleteDepartmentDialog = () => {
        if (departments === constants.flags.INITIAL_VALUE) {
            showError('Oops!', 'A network error occured! Please reload the page.');
            return;
        }

        setTargetDept(null);

        const target = departments.filter((item, index) => {
            return (item.id === manageDeptData.department_id);
        })[0];

        setTargetDept(target);
        setShowDeleteDepartmentDialog(true);
    };

    const handleCloseAddFacultyDialog = () => {
        setShowAddFacultyDialog(false);
    };

    const handleShowAddFacultyDialog = () => {
        setShowAddFacultyDialog(true);
    };

    const handleCloseAddDepartmentDialog = () => {
        setShowAddDepartmentDialog(false);
    };

    const handleShowAddDepartmentDialog = () => {
        setShowAddDepartmentDialog(true);
    };

    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        heroCardContainer: {
            padding: '0 20rem 0 20rem',
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
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        if (!auth.authenticated)
            history.push('/admin/login');
    }, [auth, history]);

    const updateFaculty = (values) => {
        showLoading();

        axios.put('admin/faculty/' + manageFactData.faculty_id, values)
        .then(res => {
            if (res.status === 204) {
                ReactSwalFire({
                    title: 'Success',
                    html: 'Faculty updated',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => dispatch(creators.app.getFaculties()),
                });
                handleCloseEditFacultyDialog();
            }
            else if (res.status === 400) {
               showError('Oops!', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('admin/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/admin/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError())
    };

    const removeFaculty = () => {
        showLoading();

        axios.delete('admin/faculty/' + manageFactData.faculty_id)
        .then(res => {
            if (res.status === 204) {
                ReactSwalFire({
                    title: 'Success',
                    html: 'Faculty removed',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => dispatch(creators.app.getFaculties()),
                });

                handleCloseDeleteFacultyDialog();
            }
            else if (res.status === 400) {
               showError('Oops!', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('admin/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/admin/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError())
    };

    const addFaculty = (values) => {
        showLoading();

        axios.post('admin/faculty', values)
        .then(res => {
            if (res.status === 204) {
                ReactSwalFire({
                    title: 'Success',
                    html: 'Faculty added',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => dispatch(creators.app.getFaculties()),
                });

                handleCloseAddFacultyDialog();
            }
            else if (res.status === 400) {
               showError('Oops!', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('admin/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/admin/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError())
    };

    const updateDepartment = (values) => {
        showLoading();

        axios.put('admin/department/' + manageDeptData.department_id, values)
        .then(res => {
            if (res.status === 204) {
                ReactSwalFire({
                    title: 'Success',
                    html: 'Department updated',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => dispatch(creators.app.signalFetchDepartments()),
                });
                handleCloseEditDepartmentDialog();
            }
            else if (res.status === 400) {
               showError('Oops!', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('admin/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/admin/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError())
    };

    const removeDepartment = () => {
        showLoading();

        axios.delete('admin/department/' + manageDeptData.department_id)
        .then(res => {
            if (res.status === 204) {
                ReactSwalFire({
                    title: 'Success',
                    html: 'Department removed',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => dispatch(creators.app.signalFetchDepartments()),
                });

                handleCloseDeleteDepartmentDialog();
            }
            else if (res.status === 400) {
               showError('Oops!', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('admin/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/admin/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError())
    };

    const addDepartment = (values) => {
        showLoading();

        axios.post('admin/department', values)
        .then(res => {
            if (res.status === 204) {
                ReactSwalFire({
                    title: 'Success',
                    html: 'Department added',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => dispatch(creators.app.signalFetchDepartments()),
                });

                handleCloseAddDepartmentDialog();
            }
            else if (res.status === 400) {
               showError('Oops!', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('admin/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/admin/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError())
    };

    const addModerator = (values) => {
        showLoading();

        axios.post('admin/moderator', {
            ...values,
            ...combinationData,
        })
        .then(res => {
            if (res.status === 204) {
                showSuccess('Success!', 'Rep added.');
            }
            else if (res.status === 400) {
               showError('Oops!', getErrorsMarkup(res.data.messages.error));
            }
            else if (res.status === 401) {
                // Unauthorized
                axios.delete('admin/session');
                dispatch(creators.app.authenticate(false, ''));
                history.push('/admin/login');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError())
    };

    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="stretch">
                <Grid item xs={12} className={classes.heroCardContainer}>
                    <Card className={classes.heroCard}>
                        <Typography variant="h4" className="header">Manage Faculty</Typography>
                        <CardContent>
                            <Formik
                                initialValues={{}}
                                isInitialValid={false}
                                onSubmit={(values) => {}}
                            >
                                <Form>
                                    <CombinationSelection key="comb1" setFaculties={setFaculties} excludeDepartment={true} excludeLevel={true} dataChanged={setManageFactData} />
                                </Form>
                            </Formik>
                        </CardContent>
                        <CardActions className={classes.heroBtnContainer}>
                            <Button variant="contained" color="secondary" startIcon={<EditRounded/>} onClick={handleShowEditFacultyDialog}>Edit</Button>
                            <Button variant="contained" color="secondary" startIcon={<DeleteRounded/>} onClick={handleShowDeleteFacultyDialog}>Remove</Button>
                            <Button variant="contained" color="secondary" startIcon={<AddRounded/>} onClick={handleShowAddFacultyDialog}>Add</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} className={classes.heroCardContainer}>
                    <Card className={classes.heroCard}>
                        <Typography variant="h4" className="header">Manage Department</Typography>
                        <CardContent>
                            <Formik
                                initialValues={{}}
                                isInitialValid={false}
                                onSubmit={(values) => {}}
                            >
                                <Form>
                                    <CombinationSelection key="comb2" setDepartments={setDepartments} excludeLevel={true} dataChanged={setManageDeptData} />
                                </Form>
                            </Formik>
                        </CardContent>
                        <CardActions className={classes.heroBtnContainer}>
                            <Button variant="contained" color="secondary" startIcon={<EditRounded/>} onClick={handleShowEditDepartmentDialog}>Edit</Button>
                            <Button variant="contained" color="secondary" startIcon={<DeleteRounded/>} onClick={handleShowDeleteDepartmentDialog}>Remove</Button>
                            <Button variant="contained" color="secondary" startIcon={<AddRounded/>} onClick={handleShowAddDepartmentDialog}>Add</Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item xs={12} className={classes.heroCardContainer}>
                    <Card className={classes.heroCard}>
                        <Typography variant="h4" className="header">Add Class Rep</Typography>
                        <CardContent>
                            <Formik
                                initialValues={defaultRepData}

                                validationSchema={Yup.object({
                                    username: Yup.string()
                                        .required('Enter the  username')
                                        .max(12, 'The username must be atmost 12 characters long'),
                                    email: Yup.string()
                                        .required('Enter the email address')
                                        .email('Enter a valid email address')
                                        .max(50, 'The email must be atmost 50 characters long'),
                                    full_name: Yup.string()
                                        .required('Enter the full name')
                                        .max(50, 'The full name must be atmost 50 characters long'),
                                    gender: Yup.string()
                                        .required('Choose a gender')
                                        .oneOf(['Male', 'Female']),
                                    phone: Yup.string()
                                        .required('Enter the phone number')
                                        .max(15, 'The phone number must be atmost 15 characters long'),
                                    password: Yup.string().required('Enter password'),
                                    confirm_password: Yup.string()
                                        .required('Confirm password')
                                        .oneOf([Yup.ref('password'), null], 'Passwords do not match!'),
                                })}

                                onSubmit={addModerator}
                            >
                                <Form>
                                    <CombinationSelection key="comb3" dataChanged={setCombinationData} />

                                    <FormikField  
                                        color="secondary"
                                        name="username"
                                        label="Username"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <FormikField  
                                        color="secondary"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <FormikField  
                                        color="secondary"
                                        name="full_name"
                                        label="Full Name"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <FormikSelect 
                                        name="gender" 
                                        defaultValue="Male" 
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
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                    />
                                    <FormikField  
                                        color="secondary"
                                        name="confirm_password"
                                        label="Confirm Password"
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                    />
                                    <div className={classes.heroBtnContainer}>
                                        <Button type="submit" variant="contained" color="secondary" size="large">Submit</Button>
                                    </div>
                                </Form>
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
            <Dialog
                open={showEditFacultyDialog} 
                onClose={handleCloseEditFacultyDialog}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    Edit Faculty
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            faculty: targetFaculty ? targetFaculty.faculty : '',
                        }}
                        
                        validationSchema={Yup.object({
                            faculty: Yup.string()
                                .required('Enter the faculty name')
                                .max(60, 'Faculty name must be atmost 60 characters long!'),
                        })}

                        onSubmit={updateFaculty}
                    >
                        <Form id="edit-faculty">
                            <FormikField  
                                color="secondary"
                                name="faculty"
                                label="Faculty Name"
                                variant="outlined"
                                fullWidth
                            />
                        </Form>
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditFacultyDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" form="edit-faculty" color="secondary" startIcon={<EditRounded/>}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showAddFacultyDialog} 
                onClose={handleCloseAddFacultyDialog}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    Add Faculty
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                           faculty: '', 
                        }}

                        validationSchema={Yup.object({
                            faculty: Yup.string()
                                .required('Enter the faculty name')
                                .max(60, 'Faculty name must be atmost 60 characters long!'),
                        })}
                        
                        onSubmit={addFaculty}
                    >
                        <Form id="add-faculty">
                            <FormikField  
                                color="secondary"
                                name="faculty"
                                label="Faculty Name"
                                variant="outlined"
                                fullWidth
                            />
                        </Form>
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddFacultyDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" form="add-faculty" color="secondary" startIcon={<AddRounded/>}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showEditDepartmentDialog} 
                onClose={handleCloseEditDepartmentDialog}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    Edit Department
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            department: targetDept ? targetDept.department : '', 
                            faculty_id: manageDeptData ? manageDeptData.faculty_id : 0,
                         }}
 
                         validationSchema={Yup.object({
                            department: Yup.string()
                                 .required('Enter the department name')
                                 .max(60, 'Department name must be atmost 60 characters long!'),
                         })}
                        
                        onSubmit={updateDepartment}
                    >
                        <Form id="edit-dept">
                            <FormikSelect 
                                name="faculty_id" 
                                label="Choose the Faculty" 
                                className="selector" 
                            >
                                {faculties !== constants.flags.INITIAL_VALUE && faculties.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.faculty}</MenuItem>
                                ))}
                            </FormikSelect>
                            <FormikField  
                                color="secondary"
                                name="department"
                                label="Department Name"
                                variant="outlined"
                                fullWidth
                            />
                        </Form>
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDepartmentDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" form="edit-dept" color="secondary" startIcon={<EditRounded/>}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showAddDepartmentDialog} 
                onClose={handleCloseAddDepartmentDialog}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    Add Department
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            department: '', 
                            faculty_id: manageDeptData ? manageDeptData.faculty_id : 0,
                         }}
 
                         validationSchema={Yup.object({
                            department: Yup.string()
                                 .required('Enter the department name')
                                 .max(60, 'Department name must be atmost 60 characters long!'),
                         })}
                        
                        onSubmit={addDepartment}
                    >
                        <Form id="add-department">
                            <FormikSelect 
                                name="faculty_id" 
                                label="Choose the Faculty" 
                                className="selector" 
                            >
                                {faculties !== constants.flags.INITIAL_VALUE && faculties.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.faculty}</MenuItem>
                                ))}
                            </FormikSelect>

                            <FormikField  
                                color="secondary"
                                name="department"
                                label="Department Name"
                                variant="outlined"
                                fullWidth
                            />
                        </Form>
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDepartmentDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" form="add-department" color="secondary" startIcon={<AddRounded/>}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showDeleteFacultyDialog} 
                onClose={handleCloseDeleteFacultyDialog}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        Are you sure you want to permanently remove "<strong>{targetFaculty && targetFaculty.faculty}</strong>"?<br/><br/>
                        <strong>Please note that you cannot reverse this action.</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteFacultyDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" startIcon={<DeleteRounded/>} onClick={removeFaculty}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={showDeleteDepartmentDialog} 
                onClose={handleCloseDeleteDepartmentDialog}
                TransitionComponent={Transition}
                fullWidth
            >
                <DialogTitle>
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.dialogContent}>
                        Are you sure you want to permanently remove "<strong>{targetDept && targetDept.department}</strong>"?<br/><br/>
                        <strong>Please note that you cannot reverse this action.</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDepartmentDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" startIcon={<DeleteRounded/>} onClick={removeDepartment}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

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
                <Route path="/admin/logout"><Logout/></Route>
                <Route path="/admin/home"><Home/></Route>
                <Route path="/"><Redirect to="/admin/home"/></Route>
            </Switch>
        </div>
    );
};

export default Admin;