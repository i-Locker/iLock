import React from 'react';
import useHttpLocations from '../../utils/hooks/useHttpLocations';
import Logo from './index';
export default function ListLogo({ logoURI, size = '24px', squared, alt, }) {
    const srcs = useHttpLocations(logoURI);
    return <Logo srcs={srcs} width={size} height={size} alt={alt} squared={squared}/>;
}
