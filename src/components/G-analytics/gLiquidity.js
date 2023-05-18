import gtag from "ga-gtag";
// add liquidity tokens
// remove liquidty tokens
// find pool tokens
// failed transaction
// successfully transaction
export const GAddLiquidity = (fromToken = "null", toToken = "null") => {
    gtag('event', 'add_liquidity', {
        page: "liquidity page",
        fromToken,
        toToken
    });
};
export const GClickedAddLiquidity = () => {
    gtag('event', 'clicked_add_liquidity_button', {
        page: "liquidity page",
        event: "add liquidiy button on the index page"
    });
};
export const GClickedAddNewLiquidity = () => {
    gtag('event', 'clicked_add_new_liquidity_button', {
        page: "liquidity page",
        event: "create a pair on index page"
    });
};
export const GRemoveLiquidity = (fromToken = "null", toToken = "null") => {
    gtag('event', 'remove_liquidity', {
        page: "liquidity page",
        fromToken,
        toToken
    });
};
export const GFindLiquidity = (fromToken = "null", toToken = "null") => {
    gtag('event', 'find_liquidity', {
        page: "liquidity page",
        poll_title: 'find liquidity',
        fromToken,
        toToken
    });
};
