import { MenuItem } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import * as constants from '../redux/actions/constants';
import * as creators from '../redux/actions/creators';
import FormikSelect from "./formik-select";

const CombinationSelection = ({ faculties, departments, levels, dataChanged }) => {
    const [data] = useState({
        faculty_id: 0,
        department_id: 0,
        level_id: 0,
    });

    const dispatch = useDispatch();

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

    useEffect(() => {
        if (faculties !== constants.flags.INITIAL_VALUE) {
            data.faculty_id = faculties[0].id;
            dataChanged(data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faculties]);

    useEffect(() => {
        if (departments !== constants.flags.INITIAL_VALUE) {
            data.department_id = departments[0].id;
            dataChanged(data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [departments]);

    useEffect(() => {
        if (levels !== constants.flags.INITIAL_VALUE) {
            data.level_id = levels[0].id;
            dataChanged(data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [levels]);

    const facultyChanged = evt => {
        data.faculty_id = evt.target.value;
        dispatch(creators.app.getDepartments(data.faculty_id));
        dataChanged(data);
    };

    const departmentChanged = evt => {
        data.department_id = evt.target.value;
        dataChanged(data);
    };

    const levelChanged = evt => {
        data.department_id = evt.target.value;
        dataChanged(data);
    };

    return (
        <>
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
        </>
    );
};

export default connect(state => ({
    faculties: state.appReducer.faculties,
    departments: state.appReducer.departments,
    levels: state.appReducer.levels,
}))(CombinationSelection);