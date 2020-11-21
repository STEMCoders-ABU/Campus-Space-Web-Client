import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { MailRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { axios } from "../init";
import CombinationSelection from "./combination-selection";
import { ReactSwalFire, showInfo, showLoading, showNetworkError } from "./utils";

const Contact = ({ showFooter }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '1rem',
            padding: '5rem',
            [theme.breakpoints.down('sm')]: {
                padding: '4rem 1rem 4rem 1rem',
            }
        },

        sendMailPaper: {
            padding: '2rem',
            marginBottom: '4rem',

            '& .text': {
                fontFamily: theme.fontFamily,
                marginBottom: '1rem',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '1.2rem',
                },
                [theme.breakpoints.only('sm')]: {
                    fontSize: '1.5rem',
                }
            },
            '& .text2': {
                fontFamily: theme.fontFamily,
                marginRight: '1rem',
                [theme.breakpoints.down('sm')]: {
                    fontSize: '1rem',
                },
                [theme.breakpoints.only('sm')]: {
                    fontSize: '1.4rem',
                }
            },
            '& .contactBtn': {
                [theme.breakpoints.down('xs')]: {
                    marginTop: '1rem',
                }
            },
        },

        getRepPaper: {
            padding: '2rem',
            '& .text': {
                fontFamily: theme.fontFamily,
                marginBottom: '1rem',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '1.7rem',
                },
            },
            '& .text2': {
                fontFamily: theme.fontFamily,
                marginBottom: '4rem',
                [theme.breakpoints.down('xs')]: {
                    fontSize: '1.2rem',
                },
            },
        },

        findBtn: {
            marginTop: '2rem',
        },
    }));

    const [combinationData, setCombinationData] = useState({
        faculty_id: 0,
        level_id: 0,
        department_id: 0,
    });

    const classes = useStyles();

    useEffect(() => showFooter(true), [showFooter]);

    const onShowContact = () => {
        showLoading();

        const faculty_id = combinationData.faculty_id;
        const department_id = combinationData.department_id;
        const level_id = combinationData.level_id;

        axios.get(`moderator/public?faculty_id=${faculty_id}&department_id=${department_id}&level_id=${level_id}`)
        .then(res => {
            const data = res.data;

            if (res.status === 200) {
                ReactSwalFire({
                    html: (
                        <div>
                            <ul style={{textAlign: 'left'}}>
                                <li><strong>Name:</strong> {data.full_name}</li>
                                <li><strong>Faculty:</strong> {data.faculty}</li>
                                <li><strong>Department:</strong> {data.department}</li>
                                <li><strong>Level:</strong> {data.level}</li>
                                <li><strong>Phone:</strong> {data.phone}</li>
                                <li><strong>Email:</strong> {data.email}</li> 
                            </ul>
                        </div>
                    ),
                    title: 'Rep Contact',
                });
            }
            else if (res.status === 404) {
                showInfo('Ouch!', 'Sorry, the class rep for this combination is not registered yet!');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError());
    };

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.sendMailPaper}>
                <Typography variant="h4" className="text">Do you need help or want to get in touch?</Typography>
                <Typography variant="h5" color="textSecondary" component="span" className="text2">We are always ready to assist you.</Typography>
                <Button className="contactBtn" component="a" href="https://stemcoders.com.ng/index#contact" target="_blank" variant="contained" size="medium" color="secondary" startIcon={<MailRounded/>}>Contact Us!</Button>
            </Paper>

            <Paper elevation={6} className={classes.getRepPaper}>
                <Typography variant="h4" className="text">Contact a Rep</Typography>
                <Typography variant="h5" color="textSecondary" className="text2">Get the contact details of a registered departmental rep easily!</Typography>

                <Formik
                    initialValues={{}}
                    isInitialValid={false}
                    onSubmit={(values) => onShowContact(values)}
                >
                    <Form>
                        <CombinationSelection dataChanged={setCombinationData} />

                        <Button type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>Show Contact</Button>
                    </Form>
                </Formik>
            </Paper>
        </div>
    );
};

export default Contact;