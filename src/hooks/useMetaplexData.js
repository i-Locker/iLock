import { Connection } from "@solana/web3.js";
import { useLayoutEffect, useMemo, useState } from "react";
import { SOLANA_HOST } from "../utils/consts";
import { decodeMetadata, getMetadataAddress, } from "../utils/metaplex";
import { getMultipleAccountsRPC } from "../utils/solana";
export const getMetaplexData = async (mintAddresses) => {
    const promises = [];
    for (const address of mintAddresses) {
        promises.push(getMetadataAddress(address));
    }
    const metaAddresses = await Promise.all(promises);
    const connection = new Connection(SOLANA_HOST, "confirmed");
    const results = await getMultipleAccountsRPC(connection, metaAddresses.map((pair) => pair && pair[0]));
    const output = results.map((account) => {
        if (account === null) {
            return undefined;
        }
        else {
            if (account.data) {
                try {
                    const MetadataParsed = decodeMetadata(account.data);
                    return MetadataParsed;
                }
                catch (e) {
                    console.error(e);
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        }
    });
    return output;
};
const createResultMap = (addresses, metadatas) => {
    const output = new Map();
    addresses.forEach((address) => {
        const metadata = metadatas.find((x) => x?.mint === address);
        if (metadata) {
            output.set(address, metadata);
        }
        else {
            output.set(address, undefined);
        }
    });
    return output;
};
const useMetaplexData = (addresses) => {
    const [results, setResults] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [receivedAt, setReceivedAt] = useState(null);
    useLayoutEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        getMetaplexData(addresses).then((results) => {
            if (!cancelled) {
                setResults(createResultMap(addresses, results));
                setIsLoading(false);
                setError("");
                setReceivedAt(new Date().toISOString());
            }
        }, (error) => {
            if (!cancelled) {
                setResults(undefined);
                setIsLoading(false);
                setError("Failed to fetch Metaplex data.");
                setReceivedAt(new Date().toISOString());
            }
        });
        return () => {
            cancelled = true;
        };
    }, [addresses, setResults, setIsLoading, setError]);
    const output = useMemo(() => ({
        data: results,
        isFetching: isLoading,
        error,
        receivedAt,
    }), [results, isLoading, error, receivedAt]);
    return output;
};
export default useMetaplexData;
