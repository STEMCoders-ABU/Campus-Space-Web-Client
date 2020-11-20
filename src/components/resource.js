import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { Form, Formik } from "formik";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import testVideo from '../test_assets/video.mp4';
import testPdf from '../test_assets/test.pdf';
import CommentCard from './comment-card';
import FormikField from "./formik-field";
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import documentImage from '../images/folder.svg';
import * as constants from '../redux/actions/constants';
import { Skeleton } from '@material-ui/lab';

const { makeStyles, Paper, Card, CardContent, Typography, CardActions, Button, CardMedia, useTheme } = require("@material-ui/core");
const { useEffect, useState } = require("react");
const { scrollToTop } = require("./utils");

const VideoViewer = () => {
    return (
        <div style={{
            position: 'relative',
            paddingTop: '56.25%',
        }}>
            <ReactPlayer
                url={testVideo}
                playing={false}
                
                width='100%'
                height='100%'
                controls
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
        </div>
    );
};

const PDFViewer = () => {
    const theme = useTheme();

    return (
        <DocViewer
            key={theme.palette.primary.main}
            documents={[{ uri: testPdf }]}
            pluginRenderers={DocViewerRenderers}
        />
    );
};

const DocumentViewer = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            padding: '10rem',
            background: theme.resourceCard.background,
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CardMedia
                component="img"
                image={documentImage}
            />
        </div>
    );
};

const Resource = ({ showFooter }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        viewerContainer: {
            padding: '0 10rem 0 10rem',
            [theme.breakpoints.down('xs')]: {
                padding: '0 .6rem 0 .6rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '0 2rem 0 2rem',
            },
            
            '& .info': {
                padding: '.5rem 0 0 2rem',
                fontFamily: theme.fontFamily,
            }
        },

        contentContainer: {
            padding: '0 5rem 0 5rem',
            marginTop: '4rem',
            [theme.breakpoints.down('xs')]: {
                padding: '0 .6rem 0 .6rem',
            },
            [theme.breakpoints.only('sm')]: {
                padding: '0 2rem 0 2rem',
            },
        },
        content: {
            
            '& .header': {
                textAlign: 'center',
                backgroundColor: theme.palette.primary.dark,
                padding: '1rem',
                marginBottom: '1.2rem',
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
            },
            '& .content': {
                padding: '1rem',
            },
            '& .description': {
                paddingLeft: '1rem',
                marginTop: '1rem',
            }
        },

        addCommentContainer: {
            padding: '1rem',
            marginBottom: '4rem',
        },
    }));

    const [resource, setResource] = useState(constants.flags.INITIAL_VALUE);
    const [viewer, setViewier] = useState(null);

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => showFooter(false), [showFooter]);

    const { id } = useParams();

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.viewerContainer}>
                <Card>
                    {viewer ? viewer : <Skeleton animation="wave" variant="rect" height={400} />}
                    <CardContent>
                        <Typography variant="h6">{resource !== constants.flags.INITIAL_VALUE ? resource.title : <Skeleton animation="wave"/>}</Typography>
                        <div className="info">
                            <Typography variant="body1" color="textSecondary">{resource !== constants.flags.INITIAL_VALUE ? resource.department : <Skeleton animation="wave"/>}</Typography>
                            <Typography variant="body1" color="textSecondary">{resource !== constants.flags.INITIAL_VALUE ? resource.course_code + ', ' + resource.level + 'Level' : <Skeleton animation="wave"/>}</Typography>
                            <Typography variant="body1" color="textSecondary">{resource !== constants.flags.INITIAL_VALUE ? resource.downloads + ' Downloads' : <Skeleton animation="wave"/>}</Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        {resource !== constants.flags.INITIAL_VALUE ? 
                        <Button variant="contained" color="secondary" endIcon={<GetAppRoundedIcon/>}>Download Now</Button> : 
                        <Skeleton animation="wave" variant="rect" width={150} height={40}/>}
                    </CardActions>
                </Card>
            </div>

            <div className={classes.contentContainer}>
                <Paper className={classes.content}>
                    <Typography variant="h5" className="header">About this Resource</Typography>
                    <div className="content">
                        <Typography variant="body1" color="textSecondary">{resource !== constants.flags.INITIAL_VALUE ? 'Added on ' + resource.date_added : <Skeleton animation="wave"/>}</Typography>
                        <Typography variant="body1" className="description">{resource !== constants.flags.INITIAL_VALUE ? resource.description : <Skeleton animation="wave" height={200}/>}</Typography>
                    </div>
                </Paper>
            </div>

            <div className={classes.contentContainer}>
                <Paper className={classes.content} elevation={0}>
                    <Typography variant="h5" className="header">Comments</Typography>
                    <div className="content">
                        <Paper className={classes.addCommentContainer} elevation={3}>
                            <Formik
                                    initialValues={{
                                        
                                    }}
                                    
                                    
                                    onSubmit={(values) => {}}
                                >
                                    <Form>
                                        <FormikField name="display_name" label="Display Name" variant="standard" color="secondary"/>
                                        <FormikField multiline rows={5} name="comment" label="Your comment" variant="outlined" color="secondary"/>
                                        <Button startIcon={<CommentRoundedIcon/>} type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>Comment</Button>
                                    </Form>
                                </Formik>
                        </Paper>

                        {/*<CommentCard/> <CommentCard/>*/}
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default Resource;