import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelectorAndDispatch';
import { fetchAllUsersThunk, searchUsers, updateSearchedUser } from '../users/usersSlice';
import { IUserModel } from '../../app/userInterfaces';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import { FaUserCircle } from 'react-icons/fa';
import { BsFillSendFill } from 'react-icons/bs';
import { useCheckAuth } from "../../hooks/useCheckAuth";

const Users: React.FC = () => {
    useCheckAuth();
    const dispatch = useAppDispatch();
    const {
        allUsers,
        filteredUsers,
        searchedUser,
    } = useAppSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchAllUsersThunk());
    }, [dispatch]);
    console.log(allUsers)

    //useEffect(() => {
    //    if (searchedUser) dispatch(searchUsers(searchedUser));
    //}, [searchedUser]);

    //const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    //    const input = e.target.value;
    //    dispatch(updateSearchedUser(input !== '' ? input : null));
    //};

    //const currentList = searchedUser === null ? allUsers : filteredUsers;

    return (
        <Container fluid className="d-flex vw-100">
            <Row className="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
                <Col xs={12} md={8} lg={4} xl={2}>
                    <Form.Control
                        type="text"
                        placeholder="Search users..."
                    //onInput={search}
                    />

                    <ListGroup>
                        {allUsers?.map((user: IUserModel, i) => (
                            <Link key={user.id} to={`chats/${user.nickname}`} state={{ recieverId: user.id }}>
                                <ListGroup.Item
                                    className="d-flex align-items-center justify-content-between py-1">

                                    <FaUserCircle size={25} className="ms-2" />

                                    <h5>{`${user.nickname}`}</h5>

                                    <BsFillSendFill size={25} className="me-2" />

                                </ListGroup.Item>
                            </Link>
                        ))}
                    </ListGroup>

                </Col>
            </Row>
        </Container>
    );
};

export default Users;

