import { ethers } from 'ethers';
import MultiCallAbi from '../utils/abis/Multicall.json';
// interface MulticallOptions {
//   requireSuccess?: boolean
// }
const multicall = async (abi, calls) => {
    try {
        const multi = getMulticallContract();
        const itf = new ethers.utils.Interface(abi);
        const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
        const { returnData } = await multi.aggregate(calldata);
        const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call));
        return res;
    }
    catch (error) {
        throw error;
    }
};
/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
// multiCall: {
//   56: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
//   97: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
// },
export const getMulticallContract = (signer) => {
    return getContract(MultiCallAbi, "0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B", signer);
};
const getContract = (abi, address, signer) => {
    return new ethers.Contract(address, abi, signer);
};
export default multicall;
