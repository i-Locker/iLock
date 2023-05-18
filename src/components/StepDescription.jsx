import { makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    description: {
        marginBottom: theme.spacing(4),
    },
}));
export default function StepDescription({ children, }) {
    const classes = useStyles();
    return (<Typography component="div" variant="body2" className={classes.description}>
      {children}
    </Typography>);
}
