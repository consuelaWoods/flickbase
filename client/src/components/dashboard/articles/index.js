import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    Modal,
    Button,
    ButtonToolbar,
    ButtonGroup,
    InputGroup,
    FormControl,
    Form
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { AdminTitle } from '../../../utils/tools'
import { getPageArticles, changeStatus } from '../../../store/actions/articles';
import Paginate from './paginate';

const AdminArticles = () => {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        dispatch(getPageArticles({}))
        // console.log(articles, 'index/dispatch')
    }, [])

    // PAGINATION FUNCTIONS
    const gotoPrevPage = (page) => {
        dispatch(getPageArticles({page}))
    }
    const gotoNextPage = (page) => {
        dispatch(getPageArticles({page}))
    }
    const gotoEdit = (id) => {
        navigate(`/dashboard/articles/edit/${id}`)
    }
    const handleStatusChange = (status, _id) => {
        let newStatus = status === 'draft' ? 'public' : 'draft'
        dispatch(changeStatus({newStatus, _id}))
    }
    
    return (
        <>
            <AdminTitle title="Articles"/>
            <div className='articles_table'>
                <ButtonToolbar className='mb-3'>
                    <ButtonGroup className='me-2'>
                        <LinkContainer to="/dashboard/articles/add">
                            <Button variant='secondary'>
                                Add article
                            </Button>
                        </LinkContainer>
                    </ButtonGroup>
                    <Form>
                        <InputGroup>
                            <InputGroup.Text id="btngrp1">+</InputGroup.Text>
                            <FormControl
                                type='text'
                                placeholder='Search'
                            />
                        </InputGroup>
                    </Form>
                </ButtonToolbar>

                <>
                    <Paginate 
                        articles={articles.adminArticles}
                        gotoPrevPage={(page) => gotoPrevPage(page)}
                        gotoNextPage={(page) => gotoNextPage(page)}
                        gotoEdit={(id) => gotoEdit(id)}
                        handleStatusChange={(status, id) => handleStatusChange(status, id)}
                    />
                </>
                
            </div>
        </>
    )
}
export default AdminArticles;