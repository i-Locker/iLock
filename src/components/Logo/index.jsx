import React, { useState } from 'react';
import { Img } from '@chakra-ui/react';
// import { IconProps } from 'react-feather'
// import Image from '../Image'
// import { classNames } from '../../functions'
// import { cloudinaryLoader } from '../../functions/cloudinary'
const BAD_SRCS = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const Logo = ({ srcs, width, height, alt = '', squared, mr, mb, ...rest }) => {
    const [, refresh] = useState(0);
    const src = srcs.find((src) => !BAD_SRCS[src]);
    return (<div className="rounded" style={{ width, height, marginBottom: mb && `${mb}px`, marginRight: mr && `${mr}px` }}>
      <Img onError={() => {
        if (src)
            BAD_SRCS[src] = true;
        refresh((i) => i + 1);
    }} borderRadius={squared ? width : 0} src={src || 'https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/unknown.png'}/>
    </div>);
};
export default Logo;
