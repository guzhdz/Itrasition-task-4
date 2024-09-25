//React import
import React, { useEffect, useRef, useState } from 'react';

//Styles and Assets import
import styles from './admin-panel.module.css';

//Components imports
import Button from '../shared/Button';
import ConfirmModal from '../shared/ConfirmModal';
import ToastComponent from '../shared/ToastComponent';

//Library import
import { Collapse } from 'bootstrap';

//Services import
import { updateUsers, deleteUsers } from '../../services/userService';

const Table = ({ users, fetchData, userInfo, deleteUserId, router, setIsLoading, isTableLoading, setIsLoadingTable }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [activeToast, setActiveToast] = useState(false);
    const [modalInfo, setModalInfo] = useState({
        title: '',
        message: '',
        onHandleOk: () => { }
    });
    const collapseRef = useRef(null);

    const handleCheckboxChange = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
            setIsSelectAll(false);
        } else {
            setSelectedUsers([...selectedUsers, userId]);
            if (users.length - 1 === selectedUsers.length) {
                setIsSelectAll(true);
            }
        }
    }

    const handleSelectAll = () => {
        if (isSelectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map((user) => user.id_user));
        }
        setIsSelectAll(!isSelectAll);
    }

    const collapseToggle = () => {
        const collapseElement = collapseRef.current;
        const bsCollapse = new Collapse(collapseElement, { toggle: false });

        if (selectedUsers.length > 0) {
            bsCollapse.show();
        } else {
            bsCollapse.hide();
        }
    }

    const handleActionButton = async (type) => {
        if (userInfo.status) {
            switch (type) {
                case 1:
                    setNewModalInfo('Block');
                    break;
                case 2:
                    setNewModalInfo('Unblock');
                    break;
                case 3:
                    setNewModalInfo('Delete');
                    break;
                default:
                    break;
            }
        } else {
            alert("Your account is no longer accessible. You have been logged out for security reasons");
            await deleteUserId();
            setIsLoading(true);
            router.push('/');
        }
    }

    const setNewModalInfo = (action) => {
        setModalInfo({
            title: selectedUsers.length > 1 ? `${action} users` : `${action} user`,
            message: selectedUsers.length > 1 ? `Are you sure you want to ${action.toLowerCase()} these users?`
                : `Are you sure you want to ${action.toLowerCase()} this user?`,
            onHandleOk: () => {
                if (action === 'Block') {
                    blockUnblockUsers(0);
                } else if (action === 'Unblock') {
                    blockUnblockUsers(1);
                } else if (action === 'Delete') {
                    callDeleteUsers();
                }
            }
        });
    }

    const callDeleteUsers = async () => {
        setIsLoadingTable(true);
        const response = await deleteUsers(selectedUsers);
        if (response.ok) {
            fetchData();
            setSelectedUsers([]);
            setIsSelectAll(false);
            showToast("Users deleted successfully");
        } else {
            showToast(response.message);
        }
    }

    const blockUnblockUsers = async (type) => {
        setIsLoadingTable(true);
        const users = selectedUsers.map((userId) => ({ idUser: userId, statusUser: type }));
        const response = await updateUsers(users);
        if (response.ok) {
            fetchData();
            setSelectedUsers([]);
            setIsSelectAll(false);
            showToast("Users updated successfully");
        } else {
            showToast(response.message);
        }
    }

    const showToast = (message) => {
        setToastMessage(message);
        setActiveToast(true);
    }

    useEffect(() => {
        collapseToggle();
    }, [selectedUsers]);

    return (
        <div className={`card border border-0 p-2 ${styles['card-custom']}`}>
            <div className="collapse" id="actionButtons" ref={collapseRef}>
                <div className="d-flex gap-2 justify-content-end">
                    <div data-bs-toggle={!userInfo.status ? '' : 'modal'} data-bs-target={!userInfo.status ? '' : '#confirmModal'}>
                        <Button
                            type="button"
                            text="Block"
                            color="btn-danger"
                            onClick={() => handleActionButton(1)}
                        />
                    </div>
                    <div data-bs-toggle={!userInfo.status ? '' : 'modal'} data-bs-target={!userInfo.status ? '' : '#confirmModal'}>
                        <Button
                            type="button"
                            customColor="btn-primary-light-custom"
                            onClick={() => handleActionButton(2)} >
                            <i className="bi bi-unlock-fill"></i>
                        </Button>
                    </div>
                    <div data-bs-toggle={!userInfo.status ? '' : 'modal'} data-bs-target={!userInfo.status ? '' : '#confirmModal'}>
                        <Button
                            type="button"
                            color="btn-secondary"
                            onClick={() => handleActionButton(3)} >
                            <i className="bi bi-trash-fill"></i>
                        </Button>
                    </div>
                </div>
            </div>
            <table className="table mb-0 table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">
                            <input
                                className="form-check-input border border-primary"
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={isSelectAll}
                                disabled={users.length === 0 || isTableLoading} />
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Last login time</th>
                        <th scope="col">Register time</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {!isTableLoading &&
                        users.map((user) => (
                            <tr key={user.id_user}>
                                <th scope="row">
                                    <input
                                        className="form-check-input border border-primary"
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(user.id_user)}
                                        checked={selectedUsers.includes(user.id_user)} />
                                </th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.last_login_time ? new Date(user.last_login_time).toLocaleString() : '-'}</td>
                                <td>{user.register_time ? new Date(user.register_time).toLocaleString() : '-'}</td>
                                <td>
                                    <span className={`badge ${user.status ? ' text-bg-success' : 'text-bg-danger'}`}>
                                        {user.status ? 'Active' : 'Blocked'}
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {users.length === 0 && !isTableLoading && 
            <div className={`d-flex flex-column justify-content-center align-items-center ${styles['no-records-custom']}`}>
                <i className="bi bi-database-fill-x fs-1 p-0"></i>
                <p className="fs-5 m-0 p-0 fw-medium">No records found</p>
            </div>}

            {isTableLoading && <div className="d-flex justify-content-center m-2">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}

            <div className="modal fade" id="confirmModal" tabIndex="-1">
                <ConfirmModal
                    title={modalInfo.title}
                    message={modalInfo.message}
                    onHandleOk={modalInfo.onHandleOk} />
            </div>

            <ToastComponent
                toastMessage={toastMessage}
                activeToast={activeToast}
                setActiveToast={setActiveToast} />
        </div>
    );
};

export default Table;