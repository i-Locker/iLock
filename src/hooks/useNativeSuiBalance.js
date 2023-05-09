import { useEffect, useMemo, useState } from "react";
import { getSuiProvider } from "../utils/sui";
export default function useSuiNativeBalance(address, refreshRef) {
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState(undefined);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        if (refreshRef) {
            refreshRef.current = () => {
                setRefresh(true);
            };
        }
    }, [refreshRef]);
    useEffect(() => {
        setRefresh(false);
        if (address) {
            setIsLoading(true);
            setBalance(undefined);
            const provider = getSuiProvider();
            provider
                .getBalance({
                owner: address,
            })
                .then((coinBalance) => {
                setIsLoading(false);
                setBalance(BigInt(coinBalance.totalBalance));
            })
                .catch((e) => {
                console.error(e);
                setIsLoading(false);
                setBalance(undefined);
            });
        }
        else {
            setIsLoading(false);
            setBalance(undefined);
        }
    }, [address, refresh]);
    const value = useMemo(() => ({ isLoading, balance }), [isLoading, balance]);
    return value;
}
