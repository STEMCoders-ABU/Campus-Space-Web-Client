import { makeStyles } from "@material-ui/core";

const ResourcesFilter = () => {
    const useStyles = makeStyles(theme => ({
        root: {
            marginTop: theme.spacing(10),
            textAlign: 'center',
        },
    }));

    const classes = useStyles();

    return (
        <div className={classes.root}>
            Hello
        </div>
    );
};

export default ResourcesFilter;