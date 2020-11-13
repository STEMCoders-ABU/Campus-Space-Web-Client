import { Box, Button, Container, Grid, Hidden, makeStyles, MenuItem, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { ReactComponent as Storage } from '../images/cloud_storage.svg';
import { ReactComponent as Discussion } from '../images/discussion.svg';
import largeLogo from '../images/large-logo.jpg';
import { ReactComponent as MobileApp } from '../images/mobile_app.svg';
import { ReactComponent as Questions } from '../images/questions.svg';
import { ReactComponent as Reading } from '../images/reading.svg';
import { ReactComponent as TimeManagement } from '../images/time_management.svg';
import FormikSelect from './formik-select';

const RawHome = () => {
    const useStyles = makeStyles(theme => ({
      contentAreaOffset: theme.mixins.toolbar,
      root: {
        marginTop: theme.spacing(1),
      },
      heroPaper: {
        backgroundColor: '#006253',
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
  
        '& svg': {
          width: '100%',
          height: 'auto'
        },
      },
      heroTitle: {
        marginTop: theme.spacing(5),
        fontWeight: 'bold',
        color: '#fafafa',
      },
      heroSubtitle: {
        backgroundColor: theme.palette.background.default,
        opacity: 0.8,
        padding: theme.spacing(2),
        borderRadius: '.8rem',
      },
      heroBtn: {
        marginTop: theme.spacing(20),
        textTransform: 'capitalize',
        padding: theme.spacing(3),
        borderRadius: '.5rem',
        fontSize: '1.5rem',
        width: '100%',
      },
      featuresPaper: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(1),
        
        '& svg': {
          width: '100%',
          height: '50%',
          flexGrow: 1,
        },
  
        '& h4': {
          textAlign: 'center',
          marginBottom: theme.spacing(3),
          padding: '.9rem',
          //borderRadius: '.2rem',
          //borderLeft: `.4rem solid ${theme.palette.secondary.main}`,
          //borderRight: `.4rem solid ${theme.palette.secondary.main}`,
        },
      },
    
      ideaPaper: {
        textAlign: 'center',
        backgroundImage: `url(${largeLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        //padding: '20% 20%',
  
        '& .inner': {
          padding: '10% 10% 10% 10%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
  
          '& .title': {
            fontSize: '3rem',
            fontWeight: 'bold',
          },
  
          '& hr': {
            marginBottom: '4rem',
            width: '30%',
          },
  
          '& .text': {
            fontSize: '1.6rem',
            textAlign: 'left',
            color: '#fafafa',
            opacity: 0.8,
            fontFamily: "'PT Sans', sans-serif",
          }
        }
      },
  
      statPaperContainer: {
        padding: '2rem',
        paddingTop: '4rem',
        paddingBottom: '5rem',
        textAlign: 'center',
      },
      statPaper: {
        backgroundColor: '#212121',
        padding: '3rem',
        borderRadius: '1rem',
  
        '& .header': {
          color: '#fafafa',
          padding: '1rem',
          backgroundColor: theme.palette.secondary.dark,
          borderRadius: '.5rem',
        },
        '& .label': {
          color: 'white',
          opacity: 0.6,
          marginTop: '1rem',
          fontSize: '2rem',
        },
      },
  
      questionsPaper: {
        paddingTop: theme.spacing(12),
        backgroundColor: theme.palette.primary.main,
  
        '& svg': {
          width: '100%',
          height: 'auto'
        },
        '& .content-container': {
          padding: '2rem',
          paddingTop: 0,
        },
        '& .content': {
          textAlign: 'left',
          fontSize: '1.4rem',
          opacity: 0.8,
          fontFamily: "'PT Sans', sans-serif",
        },
      },
  
      appPaper: {
        padding: '1rem',
        paddingTop: theme.spacing(12),
        backgroundColor: theme.palette.primary.main,
  
        '& svg': {
          width: '100%',
          height: 'auto'
        },
        '& .content-container': {
          padding: '2rem',
          paddingTop: 0,
        },
        '& .content': {
          textAlign: 'left',
          fontSize: '1.4rem',
          opacity: 0.8,
          fontFamily: "'PT Sans', sans-serif",
          paddingTop: '2rem',
        },
      },
      appBtn: {
        marginTop: theme.spacing(20),
        textTransform: 'capitalize',
        padding: theme.spacing(3),
        borderRadius: '3rem',
        fontSize: '1.5rem',
        width: '100%',
      },

      subPaperContainer: {
        padding: '2rem',
        paddingTop: '6rem',
        paddingBottom: '5rem',
        textAlign: 'center',
      },
      subPaperInner: {
        backgroundColor: '#212121',
        padding: '3rem',
        borderRadius: '1rem',
        
        '& .header': {
            marginBottom: '5rem',
            color: 'white',
        },
        '& .selector': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.text.primary,
            textAlign: 'left',
            borderRadius: '.5rem',
            opacity: 0.9,
            fontFamily: "'PT Sans', sans-serif",
        },
      },
      subBtn: {
        marginTop: theme.spacing(10),
        padding: theme.spacing(1),
        borderRadius: '.5rem',
        fontSize: '1.5rem',
        width: '75%',
      },
    }));
  
    const classes = useStyles();
  
    return (
      <>
        <div className={classes.contentAreaOffset}/>
  
        <div className={classes.root}>
          <Paper elevation={0} square className={classes.heroPaper}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Reading/>
              </Grid>
  
              <Grid item xs={12} md={6}>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Typography variant="h1" className={classes.heroTitle}>CAMPUS SPACE</Typography>
                    <Typography variant="h5" className={classes.heroSubtitle}>More Space, More Info...</Typography>
                    
                    <Grid container justify="center" alignItems="center" spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Button variant="contained" color="secondary" size="large" className={classes.heroBtn}>Explore Resources</Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button variant="contained" color="primary" size="large" className={classes.heroBtn}>Download App</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
  
          <Paper elevation={0}  className={classes.featuresPaper}>
            <Grid container justify="space-around">
              <Grid item xs={12} md={4}>
                <Typography variant="h4">Save Space</Typography>
                <Storage/>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <Typography variant="h4">Share Thoughts</Typography>
                <Discussion/>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Typography variant="h4">Save Time</Typography>
                <TimeManagement/>
              </Grid>
            </Grid>
          </Paper>
  
          <Paper elevation={0} square className={classes.ideaPaper}>
            <div className="inner">
              <Typography variant="h1" className="title">HOW IT WORKS</Typography>
              <hr/>
  
              <Typography variant="span" component="p" className="text">
                We give class representatives the opportunity to keep class members up to date with resources and useful information in an organised and student friendly manner. At Campus Space, we let you focus on what you're actually interested in. You no longer have to scroll through hundreds of not so useful messages to get updated.
                <br/><br/>
                You're not limited to just your departmental resources, you have access to every other faculty, department and level! Basically, you can access resources for higher levels even before you get there!
              </Typography>
            </div>
          </Paper>
  
          <Paper elevation={0} square className={classes.statPaperContainer}>
            <Paper elevation={20} className={classes.statPaper}>
              <Grid container justify="space-between" spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h2" className="header">24</Typography>
                  <Typography variant="span" component="p" className="label">Departments</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h2" className="header">23</Typography>
                  <Typography variant="span" component="p" className="label">Resources</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h2" className="header">175</Typography>
                  <Typography variant="span" component="p" className="label">Downloads</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Paper>
  
          <Paper elevation={0} square className={classes.questionsPaper}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Questions/>
              </Grid>
              <Grid item xs={12} md={6} alignContent="center" className="content-container">
                <Typography variant="span" component="p" className="content">
                  Campus Space is a cloud-based socio-academic web application built to provide students and other key players in the learning environment easy access to study materials.
                  <br/><br/>
                  This platform aims to improve communication as well as dissemination (sharing) of study materials effectively for the best learning experience!
                  <br/><br/>
                  Campus space caters for all academic institutions encompassing trainings, professional and traditional methods of learning. It seeks to bring all study materials in one place for easy access and more sustainable use.
                  <br/><br/>
                  The pilot phase for this project is targeted at Ahmadu Bello University, Zaria - Nigeria. It is managed by the STEM Coders Club as part of the plans in place for solving contemproray problems in the society.
                  <br/><br/>
                  With many other cloud-based services available, Campus Space is 100% open source; providing access to study files for students globally with no hidden charges to better enhance access and promote effective study habits.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
  
          <Hidden smDown>
            <Paper elevation={0} square className={classes.appPaper}>
              <Grid container>
                <Grid item xs={12} md={6} alignContent="center" className="content-container">
                  <Typography variant="span" component="p" className="content">
                    Our mobile application allows you to access and manage campus space resources without the need for a browser! 
                  </Typography>
                  <Button variant="contained" color="secondary" size="large" className={classes.appBtn}>Download Mobile App</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MobileApp/>
                </Grid>
              </Grid>
            </Paper>
          </Hidden>
  
          <Hidden mdUp>
            <Paper elevation={0} square className={classes.appPaper}>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <MobileApp/>
                </Grid>
                <Grid item xs={12} md={6} alignContent="center" className="content-container">
                  <Typography variant="span" component="p" className="content">
                    Our mobile application allows you to access and manage campus space resources without the need for a browser! 
                  </Typography>
                  <Button variant="contained" color="secondary" size="large" className={classes.appBtn}>Download Mobile App</Button>
                </Grid>
              </Grid>
            </Paper>
          </Hidden>

          <Paper elevation={0} square className={classes.subPaperContainer}>
            <Container>
                <Box boxShadow={3} className={classes.subPaperInner}>
                    <Typography variant="h4" className="header">SUBSCRIBE FOR EMAIL NOTIFICATIONS</Typography>

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

                            <Button type="submit" variant="contained" color="secondary" size="large" className={classes.subBtn}>Subscribe</Button>
                        </Form>
                    </Formik>
                </Box>
            </Container>
          </Paper>
        </div>
      </>
    );
};

export default RawHome;