import React from 'react';
import cx from 'clsx';
import { createStyles, DialogContent, IconButton, makeStyles, Tooltip } from '@mui/material';
import { CardHeader, CardContent, TableBody, Button, TableCell, TableRow, TableHead, Card, Table, Chip, Avatar } from '@mui/material';
import useStyles from '../assets/styles';
import { styled, createTheme } from '@mui/material/styles';
import SpinnerLogoWhite from "../assets/img/spinner-logo-white.png";
import LoopIcon from '@mui/icons-material/Loop';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { useWeb3React } from "@web3-react/core";
import { ui_friendly_networks, network_, network_dec_to_hex, iBridgeBaseFee } from '../constants';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

let id = 0;
function createData(name, fat, price) {
  id += 1;
  return { id, name, fat, price };
}
const rows = [
  createData('0x', 16.0, 3.9)
]

export let coreAdjuster = function() {
  //
}
export default function Elevate({ token1, token2, chainA, chainB, bridgeAmount }) {
  console.log("Elevate: ",token1, token2, chainA, chainB, bridgeAmount);
    const { active, account, connector, chainId } = useWeb3React();
  const classes = useStyles.bridge();
  const [processing,setProcessing] = React.useState(false);
  const [processingHandling,setProcessingHandling] = React.useState("0");
  const [checkboxState,setCheckboxState] = React.useState("success");
   let coreAdjust = function(rate) {
    console.log("rate: ",rate);
    setProcessingHandling(rate);
    return processingHandling;
  }; coreAdjuster=coreAdjust;
    if(iBridgeBaseFee[network_[network_dec_to_hex[chainId.toString()]]]>0) {
      console.log("iBridgeBaseFee: ",iBridgeBaseFee[network_[network_dec_to_hex[chainId.toString()]]]);
      setProcessingHandling(iBridgeBaseFee[network_[network_dec_to_hex[chainId.toString()]]]);
      console.log("iBridgeBaseFee: ",iBridgeBaseFee[network_[network_dec_to_hex[chainId.toString()]]]);
    }
  return (<React.Fragment>
    <Card sx={{width: '88.8%', minWidth: '300px'}}>
      <CardHeader
        classes={classes}
        title={'Transaction Details'}
        subheader={'Cross-Chain Transport'}
      />
      <CardContent className={classes.content}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component="th">
                Cryptocurrency: 
              </TableCell>
              <TableCell align="left">
                  { token1 !=="" ? token1.symbol : <LoopIcon sx={{ animation: "spin 2s linear infinite", "@keyframes spin": { "0%": { transform: "rotate(360deg)", },"100%": { transform: "rotate(0deg)", }, }, }} />}
                  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th">
                Network Path: 
              </TableCell>
              <TableCell align="left">
                {chainA !==0 && chainB !==0 ? 
                  chainA+"   "+ui_friendly_networks[network_[network_dec_to_hex[chainA.toString()]]]+" to "+chainB+"   "+ui_friendly_networks[network_[network_dec_to_hex[chainB.toString()]]] : 
                  <Avatar src={SpinnerLogoWhite} sx={{ width: "30px", height: "30px" }} />
                }
                  <br/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">
                Processing & Handling
              </TableCell>
              <TableCell align="left">
                  {processing && processingHandling !==0 ? processingHandling : <Avatar src={SpinnerLogoWhite} sx={{ width: "30px", height: "30px" }} />}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fungible P&H</TableCell>
              <TableCell>
                <Checkbox defaultChecked color={checkboxState} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </React.Fragment>
  );
};