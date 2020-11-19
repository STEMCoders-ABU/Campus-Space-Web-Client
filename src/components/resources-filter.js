import { Button, makeStyles, MenuItem, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormikSelect from "./formik-select";
import { scrollToTop } from "./utils";
import * as creators from '../redux/actions/creators';
import * as constants from '../redux/actions/constants';
import { Skeleton } from "@material-ui/lab";

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

    const [data] = useState({
        faculty_id: -1,
        department_id: -1,
        level_id: -1,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        if (faculties === constants.flags.INITIAL_VALUE)
            dispatch(creators.app.getFaculties());
        else {
            dispatch(creators.app.getDepartments(faculties[0].id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, faculties]);

    useEffect(() => {
        if (levels === constants.flags.INITIAL_VALUE)
            dispatch(creators.app.getLevels());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, levels]);

    useEffect(() => showFooter(true), [showFooter]);

    const facultyChanged = evt => {
        data.faculty_id = evt.target.value;
        dispatch(creators.app.getDepartments(data.faculty_id));
    };

    const departmentChanged = evt => {
        data.department_id = evt.target.value;
    };

    const levelChanged = evt => {
        data.department_id = evt.target.value;
    };

    const onSubmit = (values) => {
        const faculty_id = data.faculty_id;
        const department_id = data.department_id;
        const level_id = data.level_id;

        history.push(`/resources?faculty=${faculty_id}&department=${department_id}&level=${level_id}`);
    };

    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.filterPaperContainer}>
                <Paper elevation={5} className={classes.filterPaper}>
                    <Typography variant="h4" className="header">Filter Resources</Typography>

                    <Formik
                        initialValues={{}}
                        isInitialValid={false}
                        onSubmit={(values) => onSubmit(values)}
                    >
                        <Form>
                            {faculties !== constants.flags.INITIAL_VALUE ? 
                            <FormikSelect 
                                name="faculty_id" 
                                label="Choose a Faculty" 
                                className="selector" 
                                onChange={facultyChanged}
                                defaultValue={faculties[0].id}>
                                {faculties.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.faculty}</MenuItem>
                                ))}
                            </FormikSelect> : <Skeleton variant="rect" height={40} style={{marginBottom: '1.5rem'}} />}

                            {departments !== constants.flags.INITIAL_VALUE ? 
                            <FormikSelect 
                                name="department_id" 
                                label="Choose a Department" 
                                className="selector" 
                                onChange={departmentChanged}
                                defaultValue={departments[0].id}>
                                {departments.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.department}</MenuItem>
                                ))}
                            </FormikSelect> : <Skeleton variant="rect" height={40} style={{marginBottom: '1.5rem'}} />}

                            {levels !== constants.flags.INITIAL_VALUE ? 
                            <FormikSelect 
                                name="level_id" 
                                label="Choose a Level" 
                                className="selector" 
                                onChange={levelChanged}
                                defaultValue={levels[0].id}>
                                {levels.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.level}</MenuItem>
                                ))}
                            </FormikSelect> : <Skeleton variant="rect" height={40} style={{marginBottom: '1.5rem'}} />}

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