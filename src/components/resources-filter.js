import { Button, makeStyles, MenuItem, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormikSelect from "./formik-select";
import { scrollToTop } from "./utils";
import * as creators from '../redux/actions/creators';
import * as constants from '../redux/actions/constants';

const ResourcesFilter = ({ showFooter, faculties, departments, levels }) => {
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
            padding: '1rem',

            '& .header': {
                marginBottom: '5rem',
            },
            '& .selector': {
                textAlign: 'left',
            },
        },
        findBtn: {
            marginTop: '4rem',
            width: '75%',
        },
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        if (faculties === constants.flags.INITIAL_VALUE)
            dispatch(creators.app.getFaculties());
    }, [dispatch, faculties]);

    useEffect(() => {
        if (departments === constants.flags.INITIAL_VALUE)
            dispatch(creators.app.getDepartments());
    }, [dispatch, departments]);

    useEffect(() => {
        if (levels === constants.flags.INITIAL_VALUE)
            dispatch(creators.app.getLevels());
    }, [dispatch, levels]);

    useEffect(() => showFooter(true), [showFooter]);

    const onSubmit = () => {
        history.push('/resources');
    };

    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.filterPaperContainer}>
                <Paper elevation={5} className={classes.filterPaper}>
                    <Typography variant="h4" className="header">Filter Resources</Typography>

                    <Formik
                        initialValues={{
                            
                        }}
                        
                        
                        onSubmit={(values) => onSubmit()}
                    >
                        <Form>
                            <FormikSelect name="faculty" defaultValue="test" label="Choose a Faculty" className="selector">
                                <MenuItem value="test">Test Faculty</MenuItem>
                            </FormikSelect>
                            <FormikSelect name="department" defaultValue="test" label="Choose a Department" className="selector">
                                <MenuItem value="test">Test Department</MenuItem>
                            </FormikSelect>
                            <FormikSelect name="department" defaultValue="test" label="Choose a Level" className="selector">
                                <MenuItem value="test">100</MenuItem>
                            </FormikSelect>

                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>Find Resources</Button>
                        </Form>
                    </Formik>
                </Paper>
            </div>
        </div>
    );
};

export default connect(state => ({
    faculties: state.appReducer.faculties,
    departments: state.appReducer.departments,
    levels: state.appReducer.levels,
}))(ResourcesFilter);