//React import
import React, { useRef, useEffect } from 'react';

//Library import
//import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const ToastComponent = ({ activeToast, setActiveToast, toastMessage }) => {
    const toastRef = useRef(null);


    const showToast = () => {
        if (toastRef.current) {
            const { Toast } = require("bootstrap");
            const toastBootstrap = new Toast(toastRef.current);
            toastBootstrap.show()
        }
    }

    useEffect(() => {
        if(activeToast) {
            showToast();
            setActiveToast(false);
        }
    }, [activeToast]);

    return (
        <>
        <div className="toast-container position-fixed bottom-0 bottom-0 start-50 translate-middle-x p-3">
            <div id="liveToast" className="toast align-items-center" role="alert" ref={toastRef}>
                <div className="d-flex">
                    <div className="toast-body">
                        {toastMessage}
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        </div>
        </>
    );
};

export default ToastComponent;