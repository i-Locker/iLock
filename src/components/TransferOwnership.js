import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useStyles from "../assets/styles";
import { TextField } from "@mui/material";
import { getLockId, linkWeb3, getNetwork, getAccount, _wrap } from "../pages/LockUp";

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
export let _toggleOwnershipModal;
const TransferOwnershipModal = ({ isOpen, setIsOpen }) => {
    const [open, setOpen] = useState(false);
    const [headerText, setHeaderText] = useState("Loading...");
    const [toggleText, setToggleText] = useState("Loading...");
    const [lockId, setLockId] = useState("");
    const [headHolder, setHeadHolder] = useState("");
    const [account, setAccount] = useState("");
    const [network, setNetwork] = useState("");
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const changeHeaderText = (header_Text) => setHeaderText(header_Text);
    const changeToggleText = (toggle_Text) => setToggleText(toggle_Text);
    const changeNetwork = (get_network) => setNetwork(get_network);
    const changeAccount = (get_account) => setAccount(get_account);
    const changeHeadHolder = (get_holder) => setHeadHolder(get_holder);
    const changeLockId = (get_lock_id) => setLockId(get_lock_id);
    const dashboardClasses = useStyles.dashboard();
    _toggleOwnershipModal = async (toggle_Text, header_Text, l_lockId, l_network) => {
      if (header_Text !== undefined) {
          console.log("iCheck: ",l_lockId, l_network)
          changeToggleText(toggle_Text);
          changeHeaderText(header_Text);
          if(l_lockId !== undefined || l_lockId !== "") {
            changeLockId(l_lockId);
            console.log("lockId: ",lockId,l_lockId);
          };
          if(l_network !== undefined || l_network !== "") {
            changeNetwork(l_network);
            console.log("network: ",network);
          };
      };
      if (!open) {
        openModal();
      } else {
        closeModal();
      };
    };
    const handleHeadHolder = async(e) => {
      changeHeadHolder(e.target.value);
      console.log("holder: ",headHolder);
    };
    const iLock_transferOwnership_helper = async(e) => {
      console.log("isOpen: ",isOpen);
      _wrap(headHolder).then(async(wrapped)=>{
        console.log("wrapped: ",wrapped);
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
                                                <Grid item className={dashboardClasses.textLeft} xs={12} sm={12} md={12}>
                                                    <TextField
                                                        id="standard-head-holder"
                                                        label="New Owner"
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                            inputprops: { min: 1 }
                                                        }}
                                                        InputProps={{ inputprops: { min: 1 } }}
                                                        variant="standard"
                                                        onChange={handleHeadHolder}
                                                        onKeyUp={handleHeadHolder}
                                                        value={headHolder}
                                                    />
                                                </Grid>
                                                <Grid item className={dashboardClasses.textLeft} xs={12} sm={12} md={12}>
                                                  <Button onClick={() => iLock_transferOwnership_helper()}>
                                                    TRANSFER OWNERSHIP
                                                  </Button>
                                                </Grid>
                                            </Grid>
        </Box>
      </Modal>
      </Typography>
    );
}
export default TransferOwnershipModal;