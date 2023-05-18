import { Text } from '@chakra-ui/react';
import React from 'react';
const SkipBtn = ({ skipAllTours }) => {
    return (<button>
            <Text py={3} decoration='underline' fontSize="16px" onClick={skipAllTours} fontWeight="normal" color='white'>
                Skip</Text>
        </button>);
};
export default SkipBtn;
