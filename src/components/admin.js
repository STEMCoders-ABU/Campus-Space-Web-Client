import { AppBar, Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, makeStyles, MenuItem, Paper, Select, Slide, Toolbar, Typography } from "@material-ui/core";
import { AccountCircleRounded, AddRounded, CloudUploadRounded, DeleteRounded, EditRounded, KeyboardArrowLeftRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
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
    const [showDeleteFacultyDialog, setShowDeleteFacultyDialog] = useState(false);
    const [showDeleteDepartmentDialog, setShowDeleteDepartmentDialog] = useState(false);
    const [showAddFacultyDialog, setShowAddFacultyDialog] = useState(false);
    const [showAddDepartmentDialog, setShowAddDepartmentDialog] = useState(false);

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

    const handleCloseDeleteFacultyDialog = () => {
        setShowDeleteFacultyDialog(false);
    };

    const handleShowDeleteFacultyDialog = () => {
        setShowDeleteFacultyDialog(true);
    };

    const handleCloseDeleteDepartmentDialog = () => {
        setShowDeleteDepartmentDialog(false);
    };

    const handleShowDeleteDepartmentDialog = () => {
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

    useEffect(() => {
        scrollToTop();
    }, []);

    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="stretch">
                <Grid item xs={12} className={classes.heroCardContainer}>
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
                                initialValues={{
                                    
                                }}
                                
                                
                                onSubmit={(values) => {}}
                            >
                                <Form>
                                    <FormikSelect
                                        name="faculty" 
                                        defaultValue="0" 
                                        label="Faculty"
                                        variant="outlined"
                                        required
                                        fullWidth
                                    >
                                        <MenuItem value="0">Test Faculty</MenuItem>
                                    </FormikSelect>
                                    <FormikSelect
                                        name="department" 
                                        defaultValue="0" 
                                        label="Department"
                                        variant="outlined"
                                        required
                                        fullWidth
                                    >
                                        <MenuItem value="0">Test Department</MenuItem>
                                    </FormikSelect>
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
                            
                        }}
                        
                        onSubmit={(values) => {}}
                    >
                        <Form id="edit-faculty">
                            <FormikField  
                                color="secondary"
                                name="faculty_name"
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
                            
                        }}
                        
                        onSubmit={(values) => {}}
                    >
                        <Form id="edit-faculty">
                            <FormikField  
                                color="secondary"
                                name="faculty_name"
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
                    <Button type="submit" variant="contained" form="edit-faculty" color="secondary" startIcon={<AddRounded/>}>
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
                            
                        }}
                        
                        onSubmit={(values) => {}}
                    >
                        <Form id="edit-faculty">
                            <FormikField  
                                color="secondary"
                                name="department_name"
                                label="Department Name"
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
                            
                        }}
                        
                        onSubmit={(values) => {}}
                    >
                        <Form id="edit-faculty">
                            <FormikField  
                                color="secondary"
                                name="department_name"
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
                    <Button type="submit" variant="contained" form="edit-faculty" color="secondary" startIcon={<AddRounded/>}>
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
                        Are you sure you want to permanently remove this faculty?<br/>
                        <strong>Please note that you cannot reverse this process.</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteFacultyDialog} variant="contained" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary" startIcon={<DeleteRounded/>}>
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
                        Are you sure you want to permanently remove this department?<br/>
                        <strong>Please note that you cannot reverse this process.</strong>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDepartmentDialog} variant="contained" color="primary">
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