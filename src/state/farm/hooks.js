import { useSelector } from 'react-redux';
export const useFarms = () => {
    const farms = useSelector((state) => state.farms);
    return farms;
};
