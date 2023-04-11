import React from "react";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import clsx from "clsx";
import Paper from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import useStyles from "../assets/styles";
import SpinnerLogoWhite from "../assets/img/spinner-logo-white.png";

export let alterLoaderText;
const Loader = ({ isLoading }) => {
    const classes = useStyles.base();
    const [loaderText,setLoaderText] = React.useState("");
    alterLoaderText = async function(l_t) {
      console.log("l_t: ",l_t);
      await setLoaderText(l_t);
      return l_t;
    };
    return (
        <React.Fragment>
            <br />
            <br />
            <br />
            <br />
          <Stack spacing={1} style={{padding:50,margin:50}}>
          {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Typography component="span" style={{margin:'auto', alignItems:'center', textAlign:'center'}}>
            <>{loaderText ? "" : 'SCANNING BLOCKCHAIN'}</>
          </Typography>
          <Typography component="span" style={{margin:'auto', alignItems:'center', textAlign:'center'}}>
            <Skeleton variant="circular" width={40} height={40} /> 
          </Typography>
          <Skeleton variant="rectangular" width={210} height={60} />
          <Typography component="span" style={{margin:'auto', alignItems:'center', textAlign:'center'}}>
            <>{loaderText ? loaderText : 'Checking ...'}</>
          </Typography>
          <Skeleton variant="rounded" width={210} height={60} />
          </Stack>
      </React.Fragment>
    );
};

export default Loader;
