import React from 'react';
import { ThreeDots   } from  'react-loader-spinner';
const Loading = () => {
    return (
        <div className='flex justify-center '>
           <ThreeDots className="" color="#FFB742" height={80} width={80} />
        </div>
    );
};

export default Loading;