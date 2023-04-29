import gtag from "ga-gtag";
export const GButtonClicked = (name, pool = "RGP", version) => {
    gtag('event', 'button_clicked_on_farming_page', {
        name,
        pool,
        version
    });
};
export const GButtonIntialized = (name, pool = "RGP", version) => {
    gtag('event', 'transaction_initiated_on_farming_page', {
        name,
        pool,
        version
    });
};
export const GOpenedSpecialPool = (version) => {
    gtag('event', 'selected_special_pool', {
        name: "special pool",
        version: version === 1 ? "v2" : "v1"
    });
};
export const GFarmingSpecialPoolReferral = (referrer) => {
    gtag('event', 'farming_special_pool_referral', {
        name: "special pool",
        referrer
    });
};
export const GFarmingInputSearchFarm = (search) => {
    gtag('event', 'farming_input_search_farm', {
        search
    });
};
export const GFarmingFilterSearch = (filter) => {
    gtag('event', 'farming_filter_search', {
        filter
    });
};
export const GFarmingClickListYourProject = () => {
    gtag('event', 'farming_click_list_your_project', {
        click: true
    });
};
export const GFarmingFailedTransaction = (page, activityBeenPerformed, error, pool = "null", version) => {
    gtag('event', 'failed_Farming_transaction', {
        page,
        error,
        activityBeenPerformed,
        pool,
        message: `${activityBeenPerformed} ${pool}`,
        version
    });
};
export const GFarmingSuccessTransaction = (page, activityBeenPerformed, pool = "null", version) => {
    gtag('event', 'successfully_Farming_transaction', {
        page,
        activityBeenPerformed,
        pool,
        message: `${activityBeenPerformed} ${pool}`,
        version
    });
};
