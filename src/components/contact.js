import { Button, makeStyles, MenuItem, Paper, Typography } from "@material-ui/core";
import { MailRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import FormikSelect from "./formik-select";

const Contact = ({ showFooter }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '1rem',
            padding: '5rem',
        },

        sendMailPaper: {
            padding: '2rem',
            marginBottom: '4rem',

            '& .text': {
                fontFamily: theme.fontFamily,
                marginBottom: '1rem',
            },
            '& .text2': {
                fontFamily: theme.fontFamily,
                marginRight: '1rem',
            },
        },

        getRepPaper: {
            padding: '2rem',
            '& .text': {
                fontFamily: theme.fontFamily,
                marginBottom: '1rem',
            },
            '& .text2': {
                fontFamily: theme.fontFamily,
                marginBottom: '4rem',
            },
        },

        findBtn: {
            marginTop: '2rem',
        },
    }));

    const classes = useStyles();

    useEffect(() => showFooter(true), [showFooter]);

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.sendMailPaper}>
                <Typography variant="h4" className="text">Do you need help or want to get in touch?</Typography>
                <Typography variant="h5" color="textSecondary" component="span" className="text2">We are always ready to assist you.</Typography>
                <Button component="a" href="https://stemcoders.com.ng/index#contact" target="_blank" variant="contained" size="medium" color="secondary" startIcon={<MailRounded/>}>Contact Us!</Button>
            </Paper>

            <Paper elevation={4} className={classes.getRepPaper}>
                <Typography variant="h4" className="text">Contact a Rep</Typography>
                <Typography variant="h5" color="textSecondary" className="text2">Get the ccontact details of a registered departmental rep easily!</Typography>

                <Formik
                        initialValues={{
                            
                        }}
                        
                        
                        onSubmit={(values) => {}}
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

                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>Get Contact</Button>
                        </Form>
                    </Formik>
            </Paper>
        </div>
    );
};

export default Contact;