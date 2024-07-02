import React, { useEffect, useState } from 'react';
import FeatureCard from './FeatureCard';

const FeatureSec = () => {
    const [feature, setFeature] = useState([]);

    useEffect(()=>{
        fetch('features.json')
        .then(res => res.json())
        .then(data => setFeature(data));
    },[]);
    // console.log(country, 'countryyy')
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                
                feature.map((i,idx)=><FeatureCard key={idx} data={i}></FeatureCard>)
            }
        </div>
    );
};

export default FeatureSec;