export const sortParsedTokenAccounts = (a, b) => a.isNativeAsset && !b.isNativeAsset
    ? -1
    : !a.isNativeAsset && b.isNativeAsset
        ? 1
        : a.symbol && b.symbol
            ? a.symbol.localeCompare(b.symbol)
            : a.symbol
                ? -1
                : b.symbol
                    ? 1
                    : 0;
