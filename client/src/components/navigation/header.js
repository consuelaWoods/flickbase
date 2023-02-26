import { Link, useNavigate, useLocation } from "react-router-dom";
import SideDrawer from './sideDrawer';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { clearNotifications } from '../../store/reducers/notifications';
import { showToast } from "../../utils/tools";
import { signOut } from "../../store/actions/users";
import { setLayout } from '../../store/reducers/site';

const Header = () => {
    const users = useSelector( state => state.users);
    const notifications = useSelector( state => state.notifications);
    const site = useSelector( state => state.site );
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    useEffect ( () => {
        let { global } = notifications;
        if (notifications && global.error){
            const msg = global.msg || "Error"
            showToast('ERROR', msg)
            dispatch (clearNotifications())
        }
        if (notifications && global.success) {
            const msg = global.msg || 'Success'
            showToast('SUCCESS', msg)
            dispatch (clearNotifications())
        }
    }, [notifications])     //watch for changes in notifications

    useEffect( () => {
        let pathname = location.pathname.split('/');
        if (pathname[1] === 'dashboard') {
            dispatch(setLayout('dash_layout'))
        } else {
            dispatch(setLayout(''))
        }
    }, [location.pathname, dispatch])

    const signOutUser = () => {
        dispatch(signOut())
        navigate('/')
    }

    return (
        <>
            {/* {!users.data.verified && users.auth */}
             { users.auth && !users.data.verified
                ? <div className='not_verified'>Not Verified</div>
                : null            
            }
            <nav className={`navbar fixed-top ${site.layout}`}>
                <Link to="/" className='navbar-brand d-flex align-items-center fredoka_ff'>
                    Flickbase
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser}/>
            </nav>
        </>
    )
}
export default Header;