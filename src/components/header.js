import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {logout} from "../actions/userActions";
import {useNavigate} from "react-router-dom";

function Header(props) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // 注意 dispatch 一定要加上 才有用
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
       dispatch(logout())
       navigate('/login')
    }


    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <LinkContainer to='/'>
                        <i className="navbar-brand"> Fake-News-Detection-System</i>
                    </LinkContainer>

                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto">
                            <LinkContainer to='/cart'>
                                <li className="nav-item nav-link">Cart</li>
                            </LinkContainer>

                            {userInfo ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ): (
                                    <LinkContainer to='/login'>
                                        <li className="nav-item nav-link"><i className="fas fa-user"></i>Login</li>
                                    </LinkContainer>
                            )}


                        </ul>

                    </div>
                     <form className="d-flex">

                                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>

                     </form>
                </div>
            </nav>
        </header>
    );
}

export default Header;