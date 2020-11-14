import { BottomNavigation, BottomNavigationAction, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { scrollToTop } from "./utils";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';

const Resources = ({ showFooter }) => {
    const [navigationIndex, setNavigationIndex] = useState(0);

    const onNavigate = (event, newValue) => {
        setNavigationIndex(newValue);
    };

    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: theme.spacing(1),
        },

        navigation: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
            backgroundColor: '#212121',
        },
        navigationAction: {
            '& .MuiBottomNavigationAction-label': {
                color: 'white',
            },
            '& .MuiBottomNavigationAction-wrapper': {
                color: 'white',
            },
            '& .MuiBottomNavigationAction-label.Mui-selected': {
                color: theme.palette.secondary.light,
                fontWeight: 'bold',
            },
            '& .Mui-selected': {
                backgroundColor: '#2d2d2d',
                padding: '.1rem .5rem .1rem .5rem',
                borderRadius: '.2rem',
            },
        },
    }));

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => showFooter(false), [showFooter]);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BottomNavigation
                value={navigationIndex}
                onChange={onNavigate}
                //showLabels
                className={classes.navigation}
                >
                <BottomNavigationAction className={classes.navigationAction} label="Home" icon={<HomeRoundedIcon className="icon"/>} />
                <BottomNavigationAction className={classes.navigationAction} label="Favorites" icon={<FavoriteRoundedIcon />} />
                <BottomNavigationAction className={classes.navigationAction} label="Comments" icon={<CommentRoundedIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default Resources;