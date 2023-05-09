import { Button, InputAdornment, TextField, } from "@material-ui/core";
export default function NumberTextField({ onMaxClick, ...props }) {
    return (<TextField type="number" {...props} InputProps={{
            endAdornment: onMaxClick ? (<InputAdornment position="end">
            <Button onClick={onMaxClick} disabled={props.disabled} variant="outlined">
              Max
            </Button>
          </InputAdornment>) : undefined,
            ...(props?.InputProps || {}),
        }}></TextField>);
}
