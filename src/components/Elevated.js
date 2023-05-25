import React from 'react';
import cx from 'clsx';
import { createStyles, DialogContent, IconButton, makeStyles, Tooltip } from '@mui/material';
import { CardHeader, CardContent, TableBody, Button, TableCell, TableRow, TableHead, Card, Table, Chip, Avatar } from '@mui/material';
import useStyles from '../assets/styles';
import { styled, createTheme } from '@mui/material/styles';
import SpinnerLogoWhite from "../assets/img/spinner-logo-white.png";
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox' } };

let id = 0;
function createData(name, fat, price) {
  id += 1;
  return { id, name, fat, price };
}

const rows = [
  createData('Frozen yoghurt', 159, 4.0),
  createData('Ice cream sandwich', 237, 4.3),
  createData('Eclair', 16.0, 6.0),
  createData('Cupcake', 3.7, 4.3),
  createData('Gingerbread', 16.0, 3.9),
]

export let coreAdjust = async function() {
  //
}
export default function Elevate({ token1, token2, chainA, chainB, bridgeAmount }) {
  console.log("Elevate: ",token1, token2, chainA, chainB, bridgeAmount);
  const classes = useStyles.bridge();
  const [processingHandling,setProcessingHandling] = React.useState(0);
  const [checkboxState,setCheckboxState] = React.useState("success");
  coreAdjust = async function(rate) {
    console.log("rate: ",rate);
    await setProcessingHandling(rate);
    return processingHandling;
  };
  return (
    <Card>
      <CardHeader
        classes={classes}
        title={'Transaction'}
        subheader={'Details'}
      />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token Fees</TableCell>
              <TableCell>
                <Checkbox {...label} defaultChecked color={checkboxState} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell component="th">
                  Digital Asset: 
                </TableCell>
                <TableCell align="left"> {token1.name} ({token1.symbol})</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">
                  Network Path: 
                </TableCell>
                <TableCell align="left">{chainA} => {chainB}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">
                  Processing & Handling
                </TableCell>
                <TableCell align="left">{processingHandling!==0?processingHandling:<Avatar src={SpinnerLogoWhite} sx={{ width: "30px", height: "30px" }} />}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};