import Web3 from 'web3';
import { ethers } from 'ethers';
import { getAddress } from '@ethersproject/address';
// returns the checksummed address if the address for valid address or returns false
export function isAddress(value) {
    try {
        return getAddress(value);
    }
    catch (e) {
        return false;
    }
};
// shortens the address to the format: 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
};
export function shortenCode(code, chars = 4) {
    return `${code.substring(0, chars + 2)}...${code.substring(56 - chars)}`;
};
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
export function isTokenOnList(tokenAddressMap, token) {
    return Boolean(token?.isToken && tokenAddressMap[token.chainId]?.[token.address]);
};
export function convertToNumber(hex, decimals) {
    const balance = Web3.utils.toBN(hex);
    let balanceDecimal = balance;
    if (decimals && (balance.toLocaleString() === '0' && decimals < 20)) {
        balanceDecimal = balance.div(Web3.utils.toBN(10 ** decimals));
    }
    return balanceDecimal.toLocaleString();
};
export function convertFromWei(balance, decimals) {
    const decimalValue = decimals || 18;
    const { unitMap } = Web3.utils;
    const unit = Object.keys(unitMap).find(unit => unitMap[unit] === Math.pow(10, decimalValue).toString());
    return Web3.utils.fromWei(balance.toString(), unit);
};
export const clearInputInfo = (setInput, setButton = false, value) => {
    setInput('');
    if (setButton) {
        setButton(value);
    }
};
export const formatBigNumber = (bigNumber) => {
    const amount = ethers.formatEther(bigNumber);
    if (Number(amount) === 0 || !amount?.includes('.')) {
        return amount;
    }
    const splitAmount = amount.toString().split('.');
    const [whole, decimal] = splitAmount;
    const deci = decimal
        .split('')
        .slice(0, 18)
        .join('');
    const output = [whole, deci];
    return output.join('.');
};
export function ParseFloat(str, val) {
    const value = str.toString();
    if (!value.includes('.'))
        return value;
    return value.slice(0, (value.indexOf(".")) + val + 1);
};