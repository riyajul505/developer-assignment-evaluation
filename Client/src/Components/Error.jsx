import Lottie from 'lottie-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Err from '../assets/error.json';
const Error = () => {
    return (
        <div>
             <div className='flex flex-col justify-center items-center'>
              <Lottie
                className="w-[100%] h-[80vh] mt-5"
                animationData={Err}
              ></Lottie>
              <Link to={'/'}><button className='btn btn-primary'>Back Home</button></Link>
            </div>
        </div>
    );
};

export default Error;