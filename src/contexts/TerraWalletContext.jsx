import { WalletProvider } from "@terra-money/wallet-provider";
const testnet = {
    name: "testnet",
    chainID: "pisco-1",
    lcd: "https://pisco-lcd.terra.dev",
    walletconnectID: 0,
};
const walletConnectChainIds = {
    0: testnet,
};
export const TerraWalletProvider = ({ children, }) => {
    return (<WalletProvider defaultNetwork={testnet} walletConnectChainIds={walletConnectChainIds}>
      {children}
    </WalletProvider>);
};
