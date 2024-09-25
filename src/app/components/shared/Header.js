//React import
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

//Styles and Assets import
import styles from './shared.module.css';
import avatar from '../../public/images/avatar.png';

//Services import
import { deleteCookie } from '../../services/cookiesService';

const Header = ({ name, email }) => {
    const router = useRouter();

    const handleLogout = async() => {
        await deleteUserId() ? router.push('/') : alert("Something went wrong, please try again");
    };

    const deleteUserId = async() => {
        return await deleteCookie('userId');
    };

    return (
        <nav className={`navbar sticky-top py-3 px-3 ${styles['nav-custom']}`}>
            <Link
                href="/admin-panel"
                className={`d-flex align-items-center ${styles['logo-custom']}`}>
                <i className="bi bi-people-fill me-3 fs-4"></i>
                <p className="fs-4 mb-0 fw-semibold">UserHub</p>
            </Link>

            <div className="dropdown">
                <div className={`d-flex position-relative me-3 ${styles['account-custom']}`}
                    data-bs-toggle="dropdown">
                    <Image
                        alt="Login image"
                        src={avatar}
                        className="rounded-circle me-3"
                        width={45}
                        height={45}
                    />

                    <div className="d-flex flex-column">
                        <p className="fs-6 mb-0">{name}</p>
                        <p className={`mb-0 ${styles['account-email']}`}>{email}</p>
                    </div>

                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;