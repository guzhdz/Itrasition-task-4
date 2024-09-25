//React import
import React from 'react';

const ConfirmModal = ({ title, message, onHandleOk }) => {
    return (
        <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                {message}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={onHandleOk}>Ok</button>
            </div>
        </div>
    </div>
    );
};

export default ConfirmModal;