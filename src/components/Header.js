import React, { useState } from "react";

import clsx from "clsx";
import { useWeb3React } from "@web3-react/core";
import HoverableComponent from "./Hoverable.js";

// ** Import Material-Ui Components
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

// ** Import Redux

// ** Import Icons
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LockOutlined from "@mui/icons-material/LockOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LaunchIcon from "@mui/icons-material/Launch";

// ** Import Modules
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks";

// ** Import Assets
import useStyles from "../assets/styles";
import Logo from "../assets/img/logo.png";

// ** Import Components
import ConnectWallet from "./ConnectWallet";
import { ConnectedWallet } from "../assets/constants/wallets";
import { explorer } from "../web3.js";
import { network_, websiteURI, network_dec_to_hex } from "../constants.js";
// exportable async fn()
const toggleDrawer = (callback,option) => {
    // callback(!option);
    _toggleDrawer();
}; 
let _toggleDrawer; // replicated internal function
// ** Import
const Header = () => {
    // ** Declare Maintainers
    const navigate = useNavigate();
    const classes = useStyles.header();
    const isMobile = useMediaQuery("(max-width:1100px)");
    const { chainId, account } = useWeb3React();
    const cWallet = ConnectedWallet();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [_Explorer, set_Explorer] = useState(explorer);
    const [openWalletList, setOpenWalletList] = useState(false);
    console.log("account: ",account);
    function newRoute(chainId) {
        if(!chainId) return false;
        set_Explorer(explorer);
        console.log("_Explorer: ",chainId, network_[network_dec_to_hex[chainId.toString()]], _Explorer, explorer, explorer[network_[network_dec_to_hex[chainId.toString()]]]);
        window.location = explorer[network_[network_dec_to_hex[chainId.toString()]]];
    }; 
    function swapHref(link) {
        console.log("link: ",link);
        if(!link) return false;
        window.location = link;
    }; 
    const handleClick = (l) => {
      // 👇️ navigate programmatically
      navigate(l);
    };
    _toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    }; 
    return (
        <AppBar position="sticky" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Link href="https://interchained.org" underline="none">
                {
                        !isMobile ? <img className={classes.logo} src={Logo} alt="logo" /> :
                        <img className={classes.logo_mobile} src={Logo} alt="logo" />
                }
                </Link>
                <Box className={classes.actionGroup}>
                    {
                        !isMobile && (
                            <>
                                <Link underline="none" href="/dashboard">
                                    <span
                                       className={classes.btnHeader}
                                    >
                                        Lockers
                                    </span>
                                </Link>
                                {/*
                                    <Link underline="none" href="/deployer">
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        Deployer
                                    </span>
                                </Link> 
                                    <Link underline="none" href="/wrap">
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        Wrap
                                    </span>
                                </Link> 
                                <Link underline="none" href="/approver">
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        Approver
                                    </span>
                                </Link>
                                <Link underline="none" href="/vesting">
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        Vesting
                                    </span>
                                </Link>
                                */}
                                <Link underline="none" onClick={() => {
                                            newRoute(chainId);
                                        }}
                                 >
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        Explorer
                                    </span>
                                </Link>
                                {/*
                                <Link underline="none" href="/about">
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        About
                                    </span>
                                </Link> 
                                <Link underline="none" href="/claim">
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        Claim Token
                                    </span>
                                </Link>
                                <Link underline="none" href="/airdrop">
                                    <span
                                        className={classes.btnHeader}
                                    >
                                        Airdrop
                                    </span>
                                </Link>
                                */}
                            </>
                        )
                    }
                    <Box className={classes.connectWallet}>
                        {(() => {
                            if (account) {
                                return (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={
                                            cWallet && <img width={22} src={cWallet.logo} alt={cWallet.name} />
                                        }
                                        onClick={() => {
                                            setOpenWalletList(true);
                                        }}
                                        className={isMobile ? classes.hide : ""}
                                    >
                                        {`${account.substring(0, 8)} ... ${account.substring(account.length - 4)}`}
                                    </Button>
                                )
                            } else {
                                return (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setOpenWalletList(true);
                                        }}
                                        className={isMobile ? classes.hide : ""}
                                    >
                                        Connect Wallet
                                    </Button>
                                )
                            }
                        })()}
                    </Box>
                    <IconButton
                        color="inherit"
                        onClick={() => toggleDrawer(setOpenDrawer,openDrawer)}
                        className={clsx(classes.drawerButton, {
                            [classes.hide]: !isMobile,
                        })}
                    >
                        <MenuOpenIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <Drawer
                open={openDrawer}
                anchor="bottom"
                className={classes.drawer}
                onClose={() => toggleDrawer(setOpenDrawer,openDrawer)}
            >
                <List>
                    <Link underline="none"  href="/dashboard">
                        <ListItem button>
                            <ListItemText>LockUps</ListItemText>
                            <ListItemIcon>
                                <LockOutlined />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link underline="none" onClick={() => {
                                            newRoute(chainId);
                                        }}>
                        <ListItem button>
                            <ListItemText>Explorer</ListItemText>
                            <ListItemIcon>
                                <LockOutlined />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link underline="none" href="${websiteURI}">
                        <ListItem button>
                            <ListItemText>Website</ListItemText>
                            <ListItemIcon>
                                <LockOutlined />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    {/*<Link underline="none"  href="${explorer[]}">
                        <ListItem button >
                            <ListItemText>Claim </ListItemText>
                            <ListItemIcon>
                                <WifiProtectedSetupIcon />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                     <Link underline="none" >
                        <ListItem button >
                            <ListItemText>Explorer</ListItemText>
                            <ListItemIcon>
                                <LaunchIcon />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <ListItem button >
                        <ListItemText>About</ListItemText>
                        <ListItemIcon>
                            <LiveHelpIcon/>
                        </ListItemIcon>
                    </ListItem> 
                    <Link underline="none"  href="/vesting">
                        <ListItem button >
                            <ListItemText>Vesting</ListItemText>
                            <ListItemIcon>
                                <WifiProtectedSetupIcon />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link underline="none"  href="/claim">
                        <ListItem button >
                            <ListItemText>Claim </ListItemText>
                            <ListItemIcon>
                                <WifiProtectedSetupIcon />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link underline="none"   href="/airdrop">
                                           <ListItem button>
                                               <ListItemText>Airdrop</ListItemText>
                                               <ListItemIcon>
                                                   <AttachMoneyIcon />
                                               </ListItemIcon>
                                           </ListItem>
                                       </Link>
                                   */}
                    <ListItem>
                        <Button
                            variant="contained"
                            startIcon={
                                <img width={28} src={cWallet && cWallet.logo ? cWallet.logo : ""} alt={cWallet && cWallet.name ? cWallet.name : ""} />
                            }
                            onClick={() => {
                                setOpenWalletList(true);
                            }}
                            className="connectButton"
                        >
                            {account
                                ? `${account.substring(
                                    0,
                                    8
                                )} ... ${account.substring(
                                    account.length - 4
                                )}`
                                : "Connect Wallet"}
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
            <ConnectWallet
                isOpen={openWalletList}
                setIsOpen={setOpenWalletList}
            />
        </AppBar >
    );
};
export { toggleDrawer };
export default Header;
