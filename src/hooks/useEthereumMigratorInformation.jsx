import { ethers_contracts } from "@certusone/wormhole-sdk";
import { formatUnits } from "@ethersproject/units";
import { useEffect, useMemo, useState } from "react";
const getRequisiteData = async (migrator, signer, signerAddress) => {
    try {
        const poolAddress = migrator.address;
        const fromAddress = await migrator.fromAsset();
        const toAddress = await migrator.toAsset();
        const fromToken = ethers_contracts.TokenImplementation__factory.connect(fromAddress, signer);
        const toToken = ethers_contracts.TokenImplementation__factory.connect(toAddress, signer);
        const fromSymbol = await fromToken.symbol();
        const toSymbol = await toToken.symbol();
        const fromDecimals = await (await migrator.fromDecimals()).toNumber();
        const toDecimals = await (await migrator.toDecimals()).toNumber();
        const sharesDecimals = await migrator.decimals();
        const fromWalletBalance = formatUnits(await fromToken.balanceOf(signerAddress), fromDecimals);
        const toWalletBalance = formatUnits(await toToken.balanceOf(signerAddress), toDecimals);
        const fromPoolBalance = formatUnits(await fromToken.balanceOf(poolAddress), fromDecimals);
        const toPoolBalance = formatUnits(await toToken.balanceOf(poolAddress), toDecimals);
        const walletSharesBalance = formatUnits(await migrator.balanceOf(signerAddress), sharesDecimals);
        return {
            poolAddress,
            fromAddress,
            toAddress,
            fromToken,
            toToken,
            migrator,
            fromSymbol,
            toSymbol,
            fromDecimals,
            toDecimals,
            fromWalletBalance,
            toWalletBalance,
            fromPoolBalance,
            toPoolBalance,
            walletSharesBalance,
            sharesDecimals,
        };
    }
    catch (e) {
        return Promise.reject("Failed to retrieve required data.");
    }
};
function useEthereumMigratorInformation(migratorAddress, signer, signerAddress, toggleRefresh) {
    const migrator = useMemo(() => migratorAddress &&
        signer &&
        ethers_contracts.Migrator__factory.connect(migratorAddress, signer), [migratorAddress, signer]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        if (!signer || !migrator || !signerAddress) {
            return;
        }
        let cancelled = false;
        setIsLoading(true);
        getRequisiteData(migrator, signer, signerAddress).then((result) => {
            if (!cancelled) {
                setData(result);
                setIsLoading(false);
            }
        }, (error) => {
            if (!cancelled) {
                setIsLoading(false);
                setError("Failed to retrieve necessary data.");
            }
        });
        return () => {
            cancelled = true;
            return;
        };
    }, [migrator, signer, signerAddress, toggleRefresh]);
    return useMemo(() => {
        if (!migratorAddress || !signer || !signerAddress) {
            return {
                isLoading: false,
                error: !signer || !signerAddress
                    ? "Wallet not connected"
                    : !migratorAddress
                        ? "No contract address"
                        : "Error",
                data: null,
            };
        }
        else {
            return {
                isLoading,
                error,
                data,
            };
        }
    }, [isLoading, error, data, migratorAddress, signer, signerAddress]);
}
export default useEthereumMigratorInformation;
