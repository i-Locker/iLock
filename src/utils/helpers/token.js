import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import { getAddress } from '@ethersproject/address';
function validateAndParseAddress(address) {
    try {
        let checksummedAddress = getAddress(address);
        process.env.NODE_ENV !== 'production'
            ? warning(address === checksummedAddress, address + ' is not checksummed.')
            : void 0;
        return checksummedAddress;
    }
    catch (error) {
        process.env.NODE_ENV !== 'production'
            ? invariant(false, address + ' is not a valid address.')
            : invariant(false);
    }
    return '';
}
export class Token {
    constructor(chainId, address, decimals, symbol, name, projectLink) {
        this.decimals = decimals;
        this.symbol = symbol;
        this.name = name;
        this.chainId = chainId;
        this.address = validateAndParseAddress(address);
        this.projectLink = projectLink;
    }
}
export function serializeToken(token) {
    return {
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name,
        projectLink: token.projectLink,
    };
}
export function deserializeToken(serializedToken) {
    return new Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken?.symbol, serializedToken.name, serializedToken.projectLink);
}
