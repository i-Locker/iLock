import { Link, makeStyles, Typography } from "@material-ui/core";
import Alert from '@mui/material/Alert';
import { useMemo } from "react";
const useStyles = makeStyles((theme) => ({
    alert: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));
export default function ChainWarningMessage({ chainId }) {
    const classes = useStyles();
    return (<Alert variant="outlined" severity="warning" className={classes.alert}>
      {warningMessage.text}
      {warningMessage.link ? (<Typography component="div">
          <Link href={warningMessage.link.url} target="_blank" rel="noreferrer">
            {warningMessage.link.text}
          </Link>
        </Typography>) : null}
    </Alert>);
}
