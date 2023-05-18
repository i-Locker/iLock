import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useStyles from "../assets/styles";
import ControlledCheckbox from '../components/Checkbox.js';
import { getChecked } from '../components/Checkbox.js';
import { TextField } from "@mui/material";
import { getLockId, linkWeb3, getNetwork, getAccount, _transfer } from "../pages/LockUp";
import { network_to_chain, network_symbols } from '../constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export let _toggleWithdrawalModal; // replicated internal function
export default function WithdrawModal({ _account }) {
    const [open, setOpen] = useState(false);
    const [headerText, setHeaderText] = useState("Loading...");
    const [toggleText, setToggleText] = useState("Loading...");
    const [lockId, setLockId] = useState("");
    const [receiver, setReceiver] = useState("");
    const [account, setAccount] = useState("");
    const [network, setNetwork] = useState("");
    const [ether_tx, setEther_tx] = useState(false);
    const [symbol, setSymbol] = useState("");
    const [networkName, setNetworkName] = useState("");
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const changeHeaderText = (header_Text) => setHeaderText(header_Text);
    const changeToggleText = (toggle_Text) => setToggleText(toggle_Text);
    const changeNetwork = (get_network) => setNetwork(get_network);
    const changeAccount = (get_account) => setAccount(get_account);
    const changeReceiver = (get_receiver) => setReceiver(get_receiver);
    const changeLockId = (get_lock_id) => setLockId(get_lock_id);
    const dashboardClasses = useStyles.dashboard();
    _toggleWithdrawalModal = async (toggle_Text, header_Text, l_lockId, l_network) => {
        if (header_Text !== undefined) {
            console.log("iCheck: ", l_lockId, l_network)
            changeToggleText(toggle_Text);
            changeHeaderText(header_Text);
            if (l_lockId !== undefined || l_lockId !== "") {
                changeLockId(l_lockId);
                console.log("lockId: ", lockId, l_lockId);
            };
            if (l_network !== undefined || l_network !== "") {
                await changeNetwork(l_network);
                setNetwork(l_network);
                await setSymbol(network_symbols[network_to_chain[l_network]]);
                console.log("networkToChain=>Symbol: ", symbol);
                console.log("network: ", network, l_network);
            };
        };
        if (!open) openModal()
        else closeModal()
    };
    const handleReceiver = async (e) => {
        changeReceiver(e.target.value);
        console.log("receiver: ", receiver);
    };
    const iLock_transfer_helper = async (e) => {
        console.log("_account: ", _account);
        let ___delegate;
        if (!receiver || receiver == undefined) {
            ___delegate = account;
        } else {
            ___delegate = receiver;
        };
        console.log("isEth: ", await getChecked(), ___delegate);
        _transfer(lockId, ___delegate, await getChecked()).then(async (transferred) => {
            console.log("transferred: ", transferred);
        });
    };
    return (
        <Typography component="span">
      <Modal
        onOpen={()=>setOpen(true)}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
      >
        <Box sx={style}>

                                             <Grid 
                                                container
                                                direction="row"
                                                alignItems="center"
                                                className={dashboardClasses.balanceContainer}
                                            >
                                                <Grid item className={dashboardClasses.textLeft} xs={12} sm={12} md={12}>
                                                  <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    <Typography component={'span'} dangerouslySetInnerHTML={{__html: [headerText]}}>
                                                    </Typography>
                                                  </Typography>
                                                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    <Typography component={'span'} dangerouslySetInnerHTML={{__html: [toggleText]}}>
                                                    </Typography>
                                                  </Typography>
                                                </Grid>
                                            </Grid>
                                             <Grid 
                                                container
                                                direction="row"
                                                alignItems="center"
                                                className={dashboardClasses.balanceContainer}
                                            >
                                                <Grid item className={dashboardClasses.balanceContainer} xs={12} sm={12} md={12}>
                                                    <Grid item
                                                    alignItems="center"
                                                    className={dashboardClasses.textLeft}
                                                >
                                                  <ControlledCheckbox /> Withdraw {symbol} ?
                                                  <br />
                                                </Grid>
                                                </Grid>
                                                <Grid item className={dashboardClasses.balanceContainer} xs={12} sm={12} md={12}>
                                                    <Grid item
                                                    alignItems="center"
                                                    className={dashboardClasses.textLeft}
                                                >
                                                  <TextField
                                                        id="standard-head-holder"
                                                        label="Receiver"
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            inputprops: { min: 1 }
                                                        }}
                                                        InputProps={{ inputprops: { min: 1 } }}
                                                        variant="standard"
                                                        onChange={handleReceiver}
                                                        onKeyUp={handleReceiver}
                                                        value={receiver}
                                                    />
                                                  <br />
                                                </Grid>
                                            </Grid>
                                                <br />
                                                 <Grid item
                                                    alignItems="center"
                                                    className={dashboardClasses.textLeft}
                                                    style={{margin: 'auto',alignItems:'center'}}
                                                >
                                                <br />
                                                  <Button onClick={iLock_transfer_helper}>
                                                    TRANSFER
                                                  </Button>
                                                </Grid>
                                            </Grid>
        </Box>
      </Modal>
      </Typography>
    );
}