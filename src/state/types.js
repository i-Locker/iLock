import { Token } from "@uniswap/sdk";
export class WrappedTokenInfo extends Token {
    constructor(tokenInfo, tags) {
        super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name);
        this.tokenInfo = tokenInfo;
        this.tags = tags;
    }
    get logoURI() {
        return this.tokenInfo.logoURI;
    }
}
