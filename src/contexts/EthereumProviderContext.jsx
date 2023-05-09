import detectEthereumProvider from "@metamask/detect-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BigNumber, ethers } from "ethers";
import React, { useCallback, useContext, useEffect, useMemo, useState, } from "react";
import metamaskIcon from "../icons/metamask-fox.svg";
import walletconnectIcon from "../icons/walletconnect.svg";
import { EVM_RPC_MAP } from "../utils/metaMaskChainParameters";
const CacheSubprovider = require("web3-provider-engine/subproviders/cache");
export var ConnectType;
(function (ConnectType) {
    ConnectType[ConnectType["METAMASK"] = 0] = "METAMASK";
    ConnectType[ConnectType["WALLETCONNECT"] = 1] = "WALLETCONNECT";
})(ConnectType || (ConnectType = {}));
const EthereumProviderContext = React.createContext({
    connect: (connectType) => { },
    disconnect: () => { },
    provider: undefined,
    chainId: undefined,
    signer: undefined,
    signerAddress: undefined,
    providerError: null,
    availableConnections: [],
    connectType: undefined,
});
export const EthereumProviderProvider = ({ children, }) => {
    const [providerError, setProviderError] = useState(null);
    const [provider, setProvider] = useState(undefined);
    const [chainId, setChainId] = useState(undefined);
    const [signer, setSigner] = useState(undefined);
    const [signerAddress, setSignerAddress] = useState(undefined);
    const [availableConnections, setAvailableConnections] = useState([]);
    const [connectType, setConnectType] = useState(undefined);
    const [ethereumProvider, setEthereumProvider] = useState(undefined);
    const [walletConnectProvider, setWalletConnectProvider] = useState(undefined);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const connections = [];
            try {
                const detectedProvider = await detectEthereumProvider();
                if (detectedProvider) {
                    connections.push({
                        connectType: ConnectType.METAMASK,
                        name: "MetaMask",
                        icon: metamaskIcon,
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
            connections.push({
                connectType: ConnectType.WALLETCONNECT,
                name: "Wallet Connect",
                icon: walletconnectIcon,
            });
            if (!cancelled) {
                setAvailableConnections(connections);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    const disconnect = useCallback(() => {
        setProviderError(null);
        setProvider(undefined);
        setChainId(undefined);
        setSigner(undefined);
        setSignerAddress(undefined);
        setConnectType(undefined);
        if (ethereumProvider?.removeAllListeners) {
            ethereumProvider.removeAllListeners();
        }
        setEthereumProvider(undefined);
        if (walletConnectProvider) {
            walletConnectProvider
                .disconnect()
                .catch((error) => console.error(error));
            setWalletConnectProvider(undefined);
        }
    }, [ethereumProvider, walletConnectProvider]);
    const connect = useCallback((connectType) => {
        setConnectType(connectType);
        if (connectType === ConnectType.METAMASK) {
            detectEthereumProvider()
                .then((detectedProvider) => {
                if (detectedProvider) {
                    setEthereumProvider(detectedProvider);
                    const provider = new ethers.providers.Web3Provider(
                    // @ts-ignore
                    detectedProvider, "any");
                    provider
                        .send("eth_requestAccounts", [])
                        .then(() => {
                        setProviderError(null);
                        setProvider(provider);
                        provider
                            .getNetwork()
                            .then((network) => {
                            setChainId(network.chainId);
                        })
                            .catch(() => {
                            setProviderError("An error occurred while getting the network");
                        });
                        const signer = provider.getSigner();
                        setSigner(signer);
                        signer
                            .getAddress()
                            .then((address) => {
                            setSignerAddress(address);
                        })
                            .catch(() => {
                            setProviderError("An error occurred while getting the signer address");
                        });
                        // TODO: try using ethers directly
                        // @ts-ignore
                        if (detectedProvider && detectedProvider.on) {
                            // @ts-ignore
                            detectedProvider.on("chainChanged", (chainId) => {
                                try {
                                    setChainId(BigNumber.from(chainId).toNumber());
                                }
                                catch (e) { }
                            });
                            // @ts-ignore
                            detectedProvider.on("accountsChanged", (accounts) => {
                                try {
                                    const signer = provider.getSigner();
                                    setSigner(signer);
                                    signer
                                        .getAddress()
                                        .then((address) => {
                                        setSignerAddress(address);
                                    })
                                        .catch(() => {
                                        setProviderError("An error occurred while getting the signer address");
                                    });
                                }
                                catch (e) { }
                            });
                        }
                    })
                        .catch(() => {
                        setProviderError("An error occurred while requesting eth accounts");
                    });
                }
                else {
                    setProviderError("Please install MetaMask");
                }
            })
                .catch(() => {
                setProviderError("Please install MetaMask");
            });
        }
        else if (connectType === ConnectType.WALLETCONNECT) {
            const walletConnectProvider = new WalletConnectProvider({
                rpc: EVM_RPC_MAP,
                storageId: "walletconnect-evm",
            });
            setWalletConnectProvider(walletConnectProvider);
            walletConnectProvider
                .enable()
                .then(() => {
                setProviderError(null);
                const provider = new ethers.providers.Web3Provider(walletConnectProvider, "any");
                provider
                    .getNetwork()
                    .then((network) => {
                    setChainId(network.chainId);
                })
                    .catch(() => {
                    setProviderError("An error occurred while getting the network");
                });
                walletConnectProvider.on("chainChanged", (chainId) => {
                    setChainId(chainId);
                    // HACK: clear the block-cache when switching chains by creating a new CacheSubprovider
                    // Otherwise ethers may not resolve transaction receipts/waits
                    const index = walletConnectProvider._providers.findIndex((subprovider) => subprovider instanceof CacheSubprovider);
                    if (index >= 0) {
                        const subprovider = walletConnectProvider._providers[index];
                        walletConnectProvider.removeProvider(subprovider);
                        walletConnectProvider.addProvider(new CacheSubprovider(), index);
                        // also reset the latest block
                        walletConnectProvider._blockTracker._resetCurrentBlock();
                    }
                });
                walletConnectProvider.on("accountsChanged", (accounts) => {
                    try {
                        const signer = provider.getSigner();
                        setSigner(signer);
                        signer
                            .getAddress()
                            .then((address) => {
                            setSignerAddress(address);
                        })
                            .catch(() => {
                            setProviderError("An error occurred while getting the signer address");
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
                walletConnectProvider.on("disconnect", (code, reason) => {
                    disconnect();
                });
                setProvider(provider);
                const signer = provider.getSigner();
                setSigner(signer);
                signer
                    .getAddress()
                    .then((address) => {
                    setSignerAddress(address);
                })
                    .catch((error) => {
                    setProviderError("An error occurred while getting the signer address");
                    console.error(error);
                });
            })
                .catch((error) => {
                if (error.message !== "User closed modal") {
                    setProviderError("Error enabling WalletConnect session");
                    console.error(error);
                }
            });
        }
    }, [disconnect]);
    const contextValue = useMemo(() => ({
        connect,
        disconnect,
        provider,
        chainId,
        signer,
        signerAddress,
        providerError,
        availableConnections,
        connectType,
    }), [
        connect,
        disconnect,
        provider,
        chainId,
        signer,
        signerAddress,
        providerError,
        availableConnections,
        connectType,
    ]);
    return (<EthereumProviderContext.Provider value={contextValue}>
      {children}
    </EthereumProviderContext.Provider>);
};
export const useEthereumProvider = () => {
    return useContext(EthereumProviderContext);
};
