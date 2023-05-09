import { WalletProvider } from "@xpla/wallet-provider";
const testnet = {
    name: "testnet",
    chainID: "cube_47-5",
    lcd: "https://cube-lcd.xpla.dev",
    walletconnectID: 0,
};
const walletConnectChainIds = {
    0: testnet,
};
export const XplaWalletProvider = ({ children, }) => {
    return (<WalletProvider defaultNetwork={testnet} walletConnectChainIds={walletConnectChainIds}>
      {children}
    </WalletProvider>);
};
export default XplaWalletProvider;
