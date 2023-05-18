import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRelayerTokenInfo } from "../store/selectors";
import { errorRelayerTokenInfo, fetchRelayerTokenInfo, receiveRelayerTokenInfo, } from "../store/tokenSlice";
import { RELAYER_INFO_URL } from "../utils/consts";
const useRelayersAvailable = (shouldFire) => {
    const relayerTokenInfo = useSelector(selectRelayerTokenInfo);
    // console.log("relayerTokenInfo", relayerTokenInfo);
    const dispatch = useDispatch();
    const internalShouldFire = shouldFire &&
        (relayerTokenInfo.data === undefined ||
            (relayerTokenInfo.data === null && !relayerTokenInfo.isFetching));
    useEffect(() => {
        if (internalShouldFire) {
            getRelayersAvailable(dispatch);
        }
    }, [internalShouldFire, dispatch]);
    return relayerTokenInfo;
};
const getRelayersAvailable = (dispatch) => {
    dispatch(fetchRelayerTokenInfo());
    axios.get(RELAYER_INFO_URL).then((response) => {
        dispatch(receiveRelayerTokenInfo(response.data));
    }, (error) => {
        dispatch(errorRelayerTokenInfo("Failed to retrieve the relayer token info."));
    });
};
export default useRelayersAvailable;
