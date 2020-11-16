import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import videoImage from '../images/youtube.svg';
import testVideo from '../test_assets/video.mp4';

const { makeStyles, Paper, Card, CardContent, Typography, CardActions, Button } = require("@material-ui/core");
const { useEffect } = require("react");
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
                light={videoImage}
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

const Resource = ({ showFooter }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: '3rem',
        },

        viewerContainer: {
            padding: '0 10rem 0 10rem',
            
            '& .info': {
                padding: '.5rem 0 0 2rem',
                fontFamily: theme.fontFamily,
            }
        },

        aboutResourceContainer: {
            padding: '0 5rem 0 5rem',
            marginTop: '4rem',
        },
        aboutResource: {
            
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
    }));

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
                    <VideoViewer />
                    <CardContent>
                        <Typography variant="h6">The Excellent Resource Title</Typography>
                        <div className="info">
                            <Typography variant="body1" color="textSecondary">Department of Computer Science, 100 Level</Typography>
                            <Typography variant="body1" color="textSecondary">For COSC101</Typography>
                            <Typography variant="body1" color="textSecondary">Downloaded 50 times</Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button fullWidth variant="contained" color="secondary" endIcon={<GetAppRoundedIcon/>}>Download Now</Button>
                    </CardActions>
                </Card>
            </div>

            <div className={classes.aboutResourceContainer}>
                <Paper className={classes.aboutResource}>
                    <Typography variant="h5" className="header">About this Resource</Typography>
                    <div className="content">
                        <Typography variant="body1" color="textSecondary">Added on 2020-10-01</Typography>
                        <Typography variant="body1" className="description">This is where the somewhat long descriptions shows up!</Typography>
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default Resource;