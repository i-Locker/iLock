import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { explorer_, network_, network_dec_to_hex, network_hex_to_dec, __NETWORKS, _token_map, tokens_data, token_lists } from "../constants.js";

export default function GroupOrientationB({items, token, setToken}) {
  const handleChange = (symbol,address,name) => {
    const token___ = {
      "name": name,
      "symbol": symbol,
      "address": address
    };
    console.log("handleChange",token___,symbol,address,name);
    setToken(token___);
  };
  console.log("items: ",items);
  return (<>
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}>
      { items ? items.map((item)=>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            key={item.symbol}
            primary={ item.name +`(`+ item.symbol+`)` }
            label={ item.name +`(`+ item.symbol+`)` }
            style={{ alignItems:'center', textAlign:'left' }}>
            <Button value={item.address}  onClick={() => handleChange(item.symbol,item.address,item.name)}>{item.name}</Button>
          </ButtonGroup>) : <></>
      }
    </Box>
  </>);
};