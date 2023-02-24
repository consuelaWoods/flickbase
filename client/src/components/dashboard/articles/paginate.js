import { Table, Pagination } from 'react-bootstrap';
import Moment from 'react-moment';

import { Loader } from '../../../utils/tools';

const Paginate = ({
    articles,
    gotoPrevPage,
    gotoNextPage,
    gotoEdit,
    handleStatusChange

}) => {

    return (
        <>
            {articles && articles.docs
                ? <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Title</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.docs.map( item => (
                                <tr key={item._id}>
                                    <td><Moment to={(item.date)}></Moment></td>
                                    <td>{item.title}</td>
                                    <td>{item.score}</td>
                                    <td className='action_btn remove_btn'
                                        onClick={() => {
                                            alert("to be deleted")
                                        }}
                                    >
                                        Remove
                                    </td>
                                    <td className='action_btn edit_btn'
                                        onClick={() => {
                                            gotoEdit(item._id)
                                        }}
                                    >
                                        Edit
                                    </td>
                                    <td className='action_btn status_btn'
                                        onClick={() => {
                                            handleStatusChange(item.status, item._id)
                                        }}
                                    >
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        {articles.hasPrevPage
                            ? <>
                                <Pagination.Prev 
                                    onClick={() => gotoPrevPage(articles.prevPage)}
                                />
                                <Pagination.Item
                                    onClick={() => gotoPrevPage(articles.prevPage)}
                                >
                                    {articles.prevPage}
                                </Pagination.Item>
                            </>
                            : null
                        }
                        <Pagination.Item active>
                            {articles.page}
                        </Pagination.Item>
                        {articles.hasNextPage
                            ?<>
                                <Pagination.Item
                                    onClick={() => gotoNextPage(articles.nextPage)}
                                >
                                    {articles.nextPage}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={() => gotoNextPage(articles.nextPage)}
                                />
                            </>
                            : null
                        }
                    </Pagination>
                </>
                : <Loader/>
            }
        </>
    )
}
export default Paginate;