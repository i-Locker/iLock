import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch' } };

export default function BasicSwitch({onOff}) {
  return (<>
    <div>
	    {
	    	!onOff ? <Switch {...label} defaultChecked /> : <Switch {...label} />
	    }
    </div>
  </>);
}