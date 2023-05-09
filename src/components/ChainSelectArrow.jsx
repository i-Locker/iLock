import { IconButton } from "@material-ui/core";
import { ArrowForward, SwapHoriz } from "@mui/icons-material";
import { useState } from "react";
export default function ChainSelectArrow({ onClick, disabled, }) {
    const [showSwap, setShowSwap] = useState(false);
    return (<IconButton onClick={onClick} onMouseEnter={() => {
            setShowSwap(true);
        }} onMouseLeave={() => {
            setShowSwap(false);
        }} disabled={disabled}>
      {showSwap ? <SwapHoriz /> : <ArrowForward />}
    </IconButton>);
}
