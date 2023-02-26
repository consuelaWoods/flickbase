import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom'

import { Loader } from '../../utils/tools';
import { acctVerify } from '../../store/actions/users';

const AcctVerify = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useSearchParams();
    const navigate = useNavigate();
    const token = search.get('t');

    useEffect( () => {
        if (token) {
            dispatch(acctVerify(token))
            .unwrap()
            .finally( () => {
                navigate('/')
            })
        } else {
            navigate('/');
        }
    }, [dispatch, navigate])

    return (
        <>
            <Loader/>
        </>
    )
}
export default AcctVerify;