//React import
import React from 'react';

const InvalidFeedback = ({message}) => {
    return (
        <>
            <div className="invalid-feedback">
                {message}
            </div>
        </>
    );
};

export default InvalidFeedback;