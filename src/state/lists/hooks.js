import { useMemo } from "react";
import DEFAULT_TOKEN_LIST from "../../utils/constants/tokenList/rigelprotocol-default.tokenList.json";
import { WrappedTokenInfo } from "./WrappedTokenInfo";
import { DEFAULT_LIST_OF_LISTS } from "../../utils/constants/lists";
import { UNSUPPORTED_LIST_URLS } from "../../utils/constants/lists";
import { useSelector } from 'react-redux';
const listCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
export function useAllLists() {
    return useSelector((state) => state.lists.byUrl);
}
// use ordering of default list of lists to assign priority
function sortByListPriority(urlA, urlB) {
    const first = DEFAULT_LIST_OF_LISTS.includes(urlA) ? DEFAULT_LIST_OF_LISTS.indexOf(urlA) : Number.MAX_SAFE_INTEGER;
    const second = DEFAULT_LIST_OF_LISTS.includes(urlB) ? DEFAULT_LIST_OF_LISTS.indexOf(urlB) : Number.MAX_SAFE_INTEGER;
    // need reverse order to make sure mapping includes top priority last
    if (first < second)
        return 1;
    if (first > second)
        return -1;
    return 0;
}
export function listToTokenMap(list) {
    const result = listCache?.get(list);
    if (result)
        return result;
    const map = list.tokens.reduce((tokenMap, tokenInfo) => {
        const tags = tokenInfo.tags
            ?.map((tagId) => {
            if (!list.tags?.[tagId])
                return undefined;
            return { ...list.tags[tagId], id: tagId };
        })
            ?.filter((x) => Boolean(x)) ?? [];
        const token = new WrappedTokenInfo(tokenInfo, tags);
        if (tokenMap[token.chainId]?.[token.address] !== undefined) {
            console.error(new Error(`Duplicate token! ${token.address}`));
            return tokenMap;
        }
        return {
            ...tokenMap,
            [token.chainId]: {
                ...tokenMap[token.chainId],
                [token.address]: {
                    token,
                    list,
                },
            },
        };
    }, {});
    listCache?.set(list, map);
    return map;
}
// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls) {
    const lists = useAllLists();
    return useMemo(() => {
        if (!urls)
            return {};
        return (urls
            .slice()
            // sort by priority so top priority goes last
            .sort(sortByListPriority)
            .reduce((allTokens, currentUrl) => {
            const current = lists[currentUrl]?.current;
            if (!current)
                return allTokens;
            try {
                return combineMaps(allTokens, listToTokenMap(current));
            }
            catch (error) {
                console.error('Could not show token list due to error', error);
                return allTokens;
            }
        }, {}));
    }, [lists, urls]);
}
// filter out unsupported lists
export function useActiveListUrls() {
    let data = useSelector((state) => state.lists.activeListUrls);
    return data?.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url));
}
export function useInactiveListUrls() {
    const lists = useAllLists();
    const allActiveListUrls = useActiveListUrls();
    return Object.keys(lists).filter((url) => !allActiveListUrls?.includes(url) && !UNSUPPORTED_LIST_URLS.includes(url));
}
// all tokens from inactive lists
export function useCombinedInactiveList() {
    const allInactiveListUrls = useInactiveListUrls();
    return useCombinedTokenMapFromUrls(allInactiveListUrls);
}
function combineMaps(map1, map2) {
    return {
        1: { ...map1[1], ...map2[1] },
        3: { ...map1[3], ...map2[3] },
        4: { ...map1[4], ...map2[4] },
        56: { ...map1[56], ...map2[56] },
        97: { ...map1[97], ...map2[97] },
        137: { ...map1[137], ...map2[137] },
        80001: { ...map1[80001], ...map2[80001] },
        42261: { ...map1[42261], ...map2[42261] },
        42262: { ...map1[42262], ...map2[42262] },
        43114: { ...map1[43114], ...map2[43114] },
        43113: { ...map1[43113], ...map2[43113] },
    };
}
export const useCombinedActiveList = () => {
    const activeListUrls = useActiveListUrls();
    const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
    const defaultTokenMap = listToTokenMap(DEFAULT_TOKEN_LIST);
    return combineMaps(activeTokens, defaultTokenMap);
};
export function useIsListActive(url) {
    const activeListUrls = useActiveListUrls();
    return Boolean(activeListUrls?.includes(url));
}
