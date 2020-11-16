import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
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
        </div>
    );
};

export default Resource;