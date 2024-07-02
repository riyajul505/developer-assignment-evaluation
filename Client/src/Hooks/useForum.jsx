import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useForum = () => {
    const axiosSecure = useAxiosSecure();
    const {data, refetch} = useQuery({
        queryKey: ['data'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/get-forums')
            return res.data;
        }
    })
    return [data, refetch]
};

export default useForum;