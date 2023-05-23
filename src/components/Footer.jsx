import React from "react";

// ** Import Material UI Components
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import SvgIcon from "@mui/material/SvgIcon";
import AppBar from "@mui/material/AppBar";

// ** Import Assets
import useStyles from "../assets/styles";

import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from '@mui/icons-material/Telegram';
import { ReactComponent as MediumIcon } from "../assets/img/medium.svg";
import {explorerUrl, devUrl, githubUrl, mediumUrl, twitterUrl, telegramUrl} from '../constants'

const Footer = () => {
    const classes = useStyles.footer();
    return (
        <AppBar
            position="static"
            component="footer"
            className={classes.footer}
        >
            <Toolbar className={classes.toolbar}>
                <Container maxWidth="md">
                <Grid container spacing={24}>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Link href={githubUrl} underline="none">
                            <Button startIcon={<GitHubIcon />}>GITHUB</Button>
                        </Link>
                    </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Link href={twitterUrl} underline="none">
                            <Button startIcon={<TwitterIcon />}>TWITTER</Button>
                        </Link>
                    </Paper>
                    </Grid>
                    <Grid item xs={4} />
                    {/* 12 Columns used, so next grid items will be the next row  */}
                    {/* This works because Material UI uses Flex Box and flex-wrap by default */}
                    <Grid item xs={4}>
                      <Paper className={classes.paper}>
                        <Link href={telegramUrl} underline="none">
                            <Button startIcon={<TelegramIcon />}>TELEGRAM</Button>
                        </Link>
                      </Paper>
                    </Grid>
                    <Grid item xs={8} />
                </Grid>
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
                </Container>
            </Toolbar>
                <Container maxWidth="md">
                    <Link href={devUrl}> M @interchained with inspiration from Snowburn </Link>
                </Container>
        </AppBar>

    );
};
export default Footer;
