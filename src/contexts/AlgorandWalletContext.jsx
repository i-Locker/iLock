import MyAlgoConnect from "@randlabs/myalgo-connect";
import { createContext, useCallback, useContext, useMemo, useState, } from "react";
const AlgorandContext = createContext({
    connect: () => { },
    disconnect: () => { },
    accounts: [],
});
export const AlgorandContextProvider = ({ children, }) => {
    const myAlgoConnect = useMemo(() => new MyAlgoConnect(), []);
    const [accounts, setAccounts] = useState([]);
    const connect = useCallback(() => {
        let cancelled = false;
        (async () => {
            const accounts = await myAlgoConnect.connect({
                shouldSelectOneAccount: true,
            });
            if (!cancelled) {
                setAccounts(accounts);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [myAlgoConnect]);
    const disconnect = useCallback(() => {
        setAccounts([]);
    }, []);
    const value = useMemo(() => ({
        connect,
        disconnect,
        accounts,
    }), [connect, disconnect, accounts]);
    return (<AlgorandContext.Provider value={value}>
      {children}
    </AlgorandContext.Provider>);
};
export const useAlgorandContext = () => {
    return useContext(AlgorandContext);
};
