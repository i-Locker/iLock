import { useSelector } from 'react-redux';
export const useBlock = () => {
    return useSelector((state) => state.block);
};
