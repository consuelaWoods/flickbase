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
    Form,
    ModalHeader
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { AdminTitle } from '../../../utils/tools'
import { 
    getPageArticles, 
    changeStatus,
    removeArticle
 } from '../../../store/actions/articles';
import Paginate from './paginate';

const AdminArticles = () => {
    const articles = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [removeAlert, setRemoveAlert] = useState(false);
    const [idToRemove, setIdToRemove] = useState(null);

    useEffect( () => {
        dispatch(getPageArticles({}))
        // console.log(articles, 'index/dispatch')
    }, [])

    const handleClose = () => setRemoveAlert(false);
    const handleDelete = () => {
        // console.log(idToRemove, 'handleDelete')
        dispatch(removeArticle(idToRemove))
        .unwrap()
        .finally(() => {
            setRemoveAlert(false)
            setIdToRemove(null)
        })
    }
    const handleShow = (id=null) => {
        setIdToRemove(id)
        setRemoveAlert(true);
    }

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
                        handleShow={(id) => handleShow(id)}
                    />
                </>
                <Modal show={removeAlert} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        There is no going back!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary'
                            onClick={handleClose}>Cancel
                        </Button>
                        <Button variant='danger'
                            onClick={() => handleDelete()}>DELETE</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default AdminArticles;