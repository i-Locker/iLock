import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useStyles from "../assets/styles";
import { TextField } from "@mui/material";

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

function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const [headerText, setHeaderText] = useState("Loading...");
    const [toggleText, setToggleText] = useState("Loading...");
    const [holder, setHolder] = useState("");
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    const changeHeaderText = (header_Text) => setHeaderText(header_Text);
    const changeToggleText = (toggle_Text) => setToggleText(toggle_Text);
    const dashboardClasses = useStyles.dashboard();
    _toggleModal = (toggle_Text, header_Text) => {
        if (header_Text !== undefined) {
            changeToggleText(toggle_Text);
            changeHeaderText(header_Text);
        }
        if (!open) openModal()
        else closeModal()
    };
    const handleHolder = async (e) => {
        await setHolder(e.target.value);
        console.log("holder: ", holder);
    };
    return (
        <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span dangerouslySetInnerHTML={{__html: [headerText]}} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span dangerouslySetInnerHTML={{__html: [toggleText]}} />
                <Grid 
                    container
                    direction="row"
                    alignItems="center"
                    className={dashboardClasses.balanceContainer}
                >
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
                <Button style={{padding:5,margin:5}} onClick={_toggleModal} >TRANSFER OWNERSHIP</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
    );
};
export default BasicModal;