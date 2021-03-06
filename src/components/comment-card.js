import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import ManImage from '../images/man.svg';

const CommentCard = ({ comment }) => {
    
    const useStyles = makeStyles(theme => ({
        root: {
            marginBottom: '2rem',
            borderRadius: '1rem',
        },

        imgContainer: {
            padding: '.5rem',
            background: theme.resourceCard.background,
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
        },

        avatar: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',

            [theme.breakpoints.down('xs')]: {
                width: '60px',
                height: '60px',
            },
        },
        
        commentContainer: {
            paddingLeft: '2rem',
        },
        comment: {
            marginTop: '1.5rem',
            //marginLeft: '1rem',
        },
    }));

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={3} md={2} lg={1}>
                    <div className={classes.imgContainer}>
                        <CardMedia
                            component="img"
                            image={ManImage}
                            className={classes.avatar}
                        />
                    </div>
                </Grid>
                <Grid item xs={9} md={10} lg={11}>
                    <CardContent className={classes.commentContainer}>
                        <Typography variant="h6">{comment.author}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">on {comment.date_added}</Typography>
                        <Typography className={classes.comment} variant="body1">{comment.comment}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export const CommentCardLoading = () => {
    
    const useStyles = makeStyles(theme => ({
        root: {
            marginBottom: '2rem',
            borderRadius: '1rem',
        },

        imgContainer: {
            padding: '.5rem',
            background: theme.resourceCard.background,
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
        },

        avatar: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',

            [theme.breakpoints.down('xs')]: {
                width: '60px',
                height: '60px',
            },
        },
        
        commentContainer: {
            paddingLeft: '2rem',
        },
        comment: {
            marginTop: '1.5rem',
            //marginLeft: '1rem',
        },
    }));

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Grid container>
                <Grid item xs={3} md={2} lg={1}>
                    <Skeleton variant="rect" height={150} animation="wave"/>
                </Grid>
                <Grid item xs={9} md={10} lg={11}>
                    <CardContent className={classes.commentContainer}>
                        <Typography variant="h6" component="div"><Skeleton/></Typography>
                        <Typography variant="subtitle1" component="div"><Skeleton/></Typography>
                        <Skeleton variant="rect" height={100} animation="wave"/>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

export default CommentCard;