import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { Skeleton } from '@material-ui/lab';
import { Form, Formik } from "formik";
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import documentImage from '../images/folder.svg';
import { axios } from '../init';
import * as constants from '../redux/actions/constants';
import CommentCard, { CommentCardLoading } from './comment-card';
import FormikField from "./formik-field";

const { makeStyles, Paper, Card, CardContent, Typography, CardActions, Button, useTheme, CircularProgress } = require("@material-ui/core");
const { useEffect, useState } = require("react");
const { scrollToTop, showNetworkError, showError, ReactSwal, getErrorsMarkup, downloadResource } = require("./utils");

const VideoViewer = ({ resource }) => {
    return (
        <div style={{
            position: 'relative',
            paddingTop: '56.25%',
        }}>
            <ReactPlayer
                url={resource.file_url}
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

const PDFViewer = ({ resource }) => {
    const theme = useTheme();

    return (
        <DocViewer
            key={theme.palette.primary.main}
            documents={[{ uri: resource.file_url }]}
            pluginRenderers={DocViewerRenderers}
        />
    );
};

const DocumentViewer = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            padding: '20rem',
            background: theme.resourceCard.background,

            '& img': {
                width: '100%',
                height: 'auto',
            }
        }
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
           <img src={documentImage} alt="Document"/>
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

        notFoundTxt: {
            textAlign: 'center',
            marginTop: '4rem',
            fontFamily: theme.fontFamily,
        },
    }));

    const [resource, setResource] = useState(constants.flags.INITIAL_VALUE);
    const [comments, setComments] = useState(constants.flags.INITIAL_VALUE);
    const [viewer, setViewier] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => showFooter(false), [showFooter]);

    const { id } = useParams();

    useEffect(() => {
        axios.get('resources/resource?join=true&resource_id=' + id)
        .then(response => {
            if (response.status === 200) {
                const targetResource = response.data;

                setResource(targetResource);
                const category = targetResource.category;

                if (category === 'Material' || category === 'Textbook')
                    setViewier(<PDFViewer resource={targetResource}/>);
                else if (category === 'Video')
                    setViewier(<VideoViewer resource={targetResource}/>);
                else if (category === 'Document')
                    setViewier(<DocumentViewer/>);
            }
            else if (response.status === 404) {
                showError('Oops!', 'The requested resource does not exist!');
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => showNetworkError());

        const fetchComments = () => {
            axios.get('comments?join=true&resource_id=' + id)
            .then(response => {
                if (response.status === 200) {
                    setComments(response.data);
                }
                else if (response.status === 404) {
                    setComments(constants.flags.NOT_FOUND);
                }
            })
            .catch(() => {});
        };

        fetchComments();
    }, [id]);

    const fetchComments = () => {
        setComments(constants.flags.INITIAL_VALUE);
        
        axios.get('comments?join=true&resource_id=' + id)
        .then(response => {
            if (response.status === 200) {
                setComments(response.data);
            }
            else if (response.status === 404) {
                setComments(constants.flags.NOT_FOUND);
            }
        })
        .catch(() => {});
    };

    const addComment = (values) => {
        setProcessing(true);

        const data = {
            author: values.author,
            comment: values.comment,
            resource_id: id,
        };

        axios.post('comments', data)
        .then(response => {
            setProcessing(false);

            if (response.status === 200) {
                ReactSwal.fire({
                    title: 'Success',
                    html: 'Comment added successfully!',
                    icon: 'success',
                    timer: 3000,
                    didClose: () => fetchComments(),
                });
            }
            else if (response.status === 400) {
                // Validation error
                showError('Validation Error!', getErrorsMarkup(response.data.messages.error));
            }
            else {
                showNetworkError();
            }
        })
        .catch(() => {
            showNetworkError();
            setProcessing(false);
        })
    };
    
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
                            <Typography variant="body1" color="textSecondary">{resource !== constants.flags.INITIAL_VALUE ? 'For ' + resource.course_code + ', ' + resource.level + ' Level' : <Skeleton animation="wave"/>}</Typography>
                            <Typography variant="body1" color="textSecondary">{resource !== constants.flags.INITIAL_VALUE ? resource.downloads + ' Downloads' : <Skeleton animation="wave"/>}</Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        {resource !== constants.flags.INITIAL_VALUE ? 
                        <Button variant="contained" color="secondary" endIcon={<GetAppRoundedIcon/>} onClick={() => downloadResource(resource)}>Download Now</Button> : 
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
                                    author: '',
                                    comment: '',
                                }}
                                
                                validationSchema={Yup.object({
                                    author: Yup.string()
                                        .required('Enter a display name')
                                        .max(20, 'Display name must be atmost 20 characters'),
                                    comment: Yup.string()
                                        .required('Enter comment')
                                        .max(500, 'Comment must be atmost 500 characters'),
                                })}
                                onSubmit={addComment}
                            >
                                    <Form>
                                        <FormikField name="author" label="Display Name" variant="standard" color="secondary"/>
                                        <FormikField multiline rows={5} name="comment" label="Your comment" variant="outlined" color="secondary"/>
                                        {processing ? 
                                        <Button startIcon={<CommentRoundedIcon/>} disabled type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>
                                            Please wait... <CircularProgress color="secondary" style={{marginLeft: '2rem'}}/>
                                        </Button> : 
                                        <Button startIcon={<CommentRoundedIcon/>} type="submit" variant="contained" color="secondary" size="large" className={classes.findBtn}>
                                            Comment
                                        </Button>}
                                    </Form>
                                </Formik>
                        </Paper>

                        {comments !== constants.flags.INITIAL_VALUE && comments !== constants.flags.NOT_FOUND &&
                        comments.map((item, index) => (
                            <CommentCard comment={item}/>
                        ))}

                        {comments === constants.flags.INITIAL_VALUE && <><CommentCardLoading/><CommentCardLoading/><CommentCardLoading/></>}

                        {comments === constants.flags.NOT_FOUND && <Typography variant="h6" className={classes.notFoundTxt}>No comments for this resource yet. Be the first to comment!</Typography>}
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default Resource;