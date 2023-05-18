import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab'; 
import Tabs from '@mui/material/Tabs';

export default function MenuListSpecial({items,setItems}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleItems = (event, newValue) => {
    setItems(newValue);
  };
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {
      items ? items.map((item)=>
        <Tabs key={item.name} value={value} onChange={handleChange} centered>
          <Tab label="Item">
            {item}
          </Tab>
        </Tabs>
      ) : <></>
    }
    </Box>
  );
};