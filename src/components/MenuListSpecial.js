import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab'; 
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { network_, network_hex_to_dec } from '../constants';
export default function MenuListSpecial({items,setItems,chainB_Networks,chainB}) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleChange = (newValue, networkName) => {
    setItems(network_hex_to_dec[newValue.toString()]);
    setValue(newValue);
    chainB_Networks(networkName,newValue.toString());
    setOpen(!open);
    console.log("events: ", value, newValue, networkName);
  };
  const handleItems = (event, newValue) => {
    setItems(newValue);
  };
  return (<>
      <ListItemButton value={chainB} onClick={() => setOpen(!open)} >
        <ListItemText primary="Networks" />
          {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    { items ? items.map((item)=>
      <div key={item.name} >
         <Collapse in={open} timeout="auto" unmountOnExit centered>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText onClick={() => handleChange(item.chainData.chainId,item.name)} primary={ network_[item.chainData.chainId] +`           (`+ item.chainData.chainId+`)` } value={item.chainData.chainId} label={ network_[item.chainData.chainId] +`           (`+ item.chainData.chainId+`)` } centered />
            </ListItemButton>
          </List>
        </Collapse>
      </div>) : <></>
    }
    </>
  );
};