import gtag from "ga-gtag";
// button clicked
export const GViewNFT = (id, nftName, total, unsold, image, isFeatured = false) => {
    gtag('event', 'click_on_view_NFT', {
        id,
        nftName,
        total,
        unsold,
        image,
        isFeatured
    });
};
export const GBuyNFT = (id, nftName, total, unsold, image, isFeatured = false) => {
    gtag('event', 'click_on_buy_NFT', {
        id,
        nftName,
        total,
        unsold,
        image,
        isFeatured
    });
};
// failed transactions
export const GNFTFailedTransaction = (page, activityBeenPerformed, error, purchaseToken = "null", nftName, image) => {
    console.log({ error });
    gtag('event', 'failed_NFT_transaction', {
        page,
        error,
        activityBeenPerformed,
        purchaseToken,
        message: `${activityBeenPerformed} ${nftName} with ${image}`
    });
};
// failed transactions
export const GNFTFailedApprovalTransaction = (page, activityBeenPerformed, error, purchaseToken = "null") => {
    console.log({ error });
    gtag('event', 'failed_NFT_approval', {
        page,
        error,
        activityBeenPerformed,
        purchaseToken,
        message: `${activityBeenPerformed} ${purchaseToken}`
    });
};
// failed transactions
export const GNFTSuccessfullyApprovalTransaction = (page, activityBeenPerformed, purchaseToken = "null") => {
    gtag('event', 'successfully_NFT_approval', {
        page,
        activityBeenPerformed,
        purchaseToken,
        message: `${activityBeenPerformed} ${purchaseToken}`
    });
};
export const GNFTSuccessfullyTransaction = (page, activityBeenPerformed, purchaseToken = "null", nftName, image) => {
    gtag('event', 'successfully_NFT_transaction', {
        page,
        activityBeenPerformed,
        purchaseToken,
        message: `${activityBeenPerformed} ${nftName} with ${image}`
    });
};
