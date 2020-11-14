import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { scrollToTop } from "./utils";

const Resources = ({ showFooter }) => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: theme.spacing(1),
        },
    }));

    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => showFooter(false), [showFooter]);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            Hello
        </div>
    );
};

export default Resources;