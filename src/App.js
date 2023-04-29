import React, { useEffect } from "react";
import {useDispatch} from 'react-redux';
import Router from "./Router";
import './index.css';
import './app.css';
import { STATISTICS } from "./redux/constants";
import { Buffer } from 'buffer';
const App = () => {
	
	window.Buffer = Buffer;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type:STATISTICS,
            payload: {}
        })
    })

    return <Router />;
};
export default App;