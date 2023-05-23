import React from "react";
// ** Import Material UI Components
import {
    Grid,
    Typography,
    Button,
    Paper,
    Container,
    InputLabel,
    CardHeader,
    Input,
    IconButton,
    SvgIcon,
    Avatar,
    Toolbar,
    Collapse,
    AppBar,
    Card,
    RadioGroup,
    Divider,
    CardContent,
    CardOverflow,
    Link
} from '@mui/material';
import useStyles from "../assets/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as MediumIcon } from "../assets/img/medium.svg";
import {explorerUrl, devUrl, githubUrl, mediumUrl, twitterUrl, telegramUrl} from '../constants'

const Footer = () => {
    const classes = useStyles.footer();
    return (<>
        <AppBar
            position="static"
            component="footer"
            className={classes.footer}
            style={{fontFamily: 'Tangerine', fontSize: 26}}
        >
                <Grid container spacing={6} sx={{ paddingTop: 5, marginBottom: '-35%', paddingLeft:1, paddingRight:1, textAlign:'center'}}>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Link href={githubUrl} underline="none">
                            <Button startIcon={<GitHubIcon />}>GITHUB</Button>
                        </Link>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Link href={twitterUrl} underline="none">
                            <Button startIcon={<TwitterIcon />}>TWITTER</Button>
                        </Link>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Link href={telegramUrl} underline="none">
                            <Button startIcon={<TelegramIcon />}>TELEGRAM</Button>
                        </Link>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <Link href={mediumUrl} underline="none">
                            <Button
                                startIcon={
                                    <SvgIcon
                                        component={MediumIcon}
                                        viewBox="0 0 512 512"
                                    />
                                }
                            >
                                MEDIUM
                            </Button>
                        </Link>  
                      </Paper>
                    </Grid> 
                    <Grid item xs={1} />
                    <Grid item xs={10} sx={{wordWrap: 'break-word', alignItems: 'center', margin: 'auto', paddingLeft:1, paddingRight:1, textAlign:'center', minWidth: '100%'}}  >
                        <Link href={devUrl} style={{fontSize: 14}}> M @interchained with inspiration from Snowburn </Link>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
        </AppBar>
    </>);
};
export default Footer;
