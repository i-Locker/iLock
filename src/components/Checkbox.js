import React from "react";
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import clsx from "clsx";
import Paper from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import useStyles from "../assets/styles";
import SpinnerLogoWhite from "../assets/img/spinner-logo-white.png";

export let getChecked;
const ControlledCheckbox = () => {
  const [checked, setChecked] = React.useState(true);
  const classes = useStyles.base();
  getChecked = async() => {
    return checked;
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
};
export default ControlledCheckbox;
