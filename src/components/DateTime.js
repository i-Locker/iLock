import React, { useState } from "react";
import { TextField, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Box, IconButton } from "@mui/material";
import useStyles from "../assets/styles";
import { format, addDays, parseISO } from "date-fns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { handle_Date } from "../pages/Dashboard";

export default function DateTime({ ...props }) {
    const classes = useStyles.base();
    const [dateUseful, setDateUseful] = useState(false);
    const [withdrawDate, setWithdrawDate] = React.useState("");
    const handleDate = async(value) => {
        try {
            await handle_Date(value);
        } catch (e) {
            console.log("date-err: ",e);
        };
        const currentDate = new Date();
        console.log("DATETIME: (component) ", value, value > currentDate)
        if (value > currentDate) {
            setDateUseful(true);
            setWithdrawDate(value);
        } else {
            setDateUseful(false);
        };
    };
    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
                id="standard-number-date"
                label="Unlock Date"
                textField={(props) => <TextField {...props} className={mobileClasses.datetimepicker} />}
                value={withdrawDate}
                onChange={(value) => handleDate(value)} />
            </LocalizationProvider>
      </React.Fragment>
    );
};