import { ListItemIcon, ListItemText, makeStyles, MenuItem, TextField, } from "@material-ui/core";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
    select: {
        "& .MuiSelect-root": {
            display: "flex",
            alignItems: "center",
        },
    },
    listItemIcon: {
        minWidth: 40,
    },
    icon: {
        height: 24,
        maxWidth: 24,
    },
}));
const createChainMenuItem = ({ id, name, logo }, classes) => (<MenuItem key={id} value={id}>
    <ListItemIcon className={classes.listItemIcon}>
      <img src={logo} alt={name} className={classes.icon}/>
    </ListItemIcon>
    <ListItemText>{name}</ListItemText>
  </MenuItem>);
export default function ChainSelect({ chains, ...rest }) {
    const classes = useStyles();
    return (<TextField {...rest} className={clsx(classes.select, rest.className)}>
      {chains.map((chain) => createChainMenuItem(chain, classes))}
    </TextField>);
}
