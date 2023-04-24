import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; {
    /*
     * import Modal from '@mui/material/Modal';
     */
}
import useStyles from "../assets/styles";
import { TextField } from "@mui/material";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';

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
export let _toggleModal;

export default function BasicModal({ headersText, togglesText }) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState < DialogProps['maxWidth'] > ('sm');
    const [headerText, setHeaderText] = useState("Loading...");
    const [toggleText, setToggleText] = useState("Loading...");
    const [holder, setHolder] = useState("");
    const changeHeaderText = (header_Text) => setHeaderText(header_Text);
    const changeToggleText = (toggle_Text) => setToggleText(toggle_Text);
    const dashboardClasses = useStyles.dashboard();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    _toggleModal = (toggle_Text, header_Text) => {
        console.log("modal: (text) ", headersText, togglesText);
        if (header_Text !== undefined) {
            changeToggleText(toggle_Text);
            changeHeaderText(header_Text);
        };
        if (!open) {
            handleOpen();
        } else {
            handleClose();
        };
    };
    const handleHolder = async (e) => {
        await setHolder(e.target.value);
        console.log("holder: ", holder);
    };

    return ( 
      <>
        <Dialog open = { open } onClose = { handleClose } onOpen = { handleOpen } >
          <DialogTitle>Optional sizes</DialogTitle> 
          <DialogContent>
          <DialogContentText>
              You can set my maximum width and whether to adapt or not.
            </DialogContentText> 
              <Box noValidate component = "form" sx = {
                {
                      display: 'flex',
                      flexDirection: 'column',
                      m: 'auto',
                      width: 'fit-content',
                  }
              } >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <span dangerouslySetInnerHTML={{__html: [headerText]}} />
                </Typography> 
                <Typography id = "modal-modal-description" sx = { { mt: 2 } } >
                <span dangerouslySetInnerHTML={{__html: [toggleText]}} /> 
                <Grid container direction = "row"
                  alignItems = "center"
                  className = { dashboardClasses.balanceContainer } >
                  <Grid item className={dashboardClasses.textLeft} xs={12} sm={12} md={12}>
                    <TextField
                      id="standard-holder"
                      label="Holder"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                        inputprops: { min: 1 }
                      }}
                      InputProps={{ inputprops: { min: 1 } }}
                      value={holder}
                      onChange={handleHolder}
                      variant="standard"
                    />
                  </Grid> 
                </Grid> 
                  <Button style = { { padding: 5, margin: 5 } } onClick = { _toggleModal } > TRANSFER OWNERSHIP < /Button> 
                </Typography> 
              </Box> 
          </DialogContent> 
          <DialogActions >
          <Button onClick={handleClose}>Close</Button> 
          </DialogActions> 
          </Dialog> 
        <Button variant="outlined" onClick={handleOpen}>
          Open max-width dialog
        </Button> 
      </>
    );
};