//React import
import React from 'react';

//Styles import
import styles from './shared.module.css';

const LoadingPage = () => {
    return (
        <>
            <div>
                <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                    <div className={`spinner-border mb-3 ${styles['spinner-custom']}`} role="status"></div>
                    <span className="fs-3">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default LoadingPage;