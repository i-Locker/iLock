import React from "react";
import { Image } from '@chakra-ui/react';
import { injected, walletconnect } from "../../connectors";
import MetamaskLogo from "../../assets/metamaskLogo.png";
import WalletConnectLogo from "../../assets/walletconnect-logo.svg";
const StatusIcon = ({ connector }) => {
    if (connector === injected) {
        return <Image boxSize="20px" objectFit="contain" src={MetamaskLogo}/>;
    }
    else if (connector === walletconnect) {
        return <Image boxSize="20px" objectFit="contain" src={WalletConnectLogo}/>;
    }
    return null;
};
export default StatusIcon;
