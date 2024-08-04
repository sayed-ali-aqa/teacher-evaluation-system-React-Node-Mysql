import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const AnswersModal = ({ data, subject, handleVisibility }) => {

    const hideModal = () => {
        handleVisibility();
    }

    return (
        <div className='answers-modal'>
            <div className="header">
                <div className="info">
                    <h5>Subject: {subject}</h5>
                </div>
                <div className="close" onClick={hideModal}><CloseIcon className='icon' /></div>
            </div>
            <div className="content">
                <div className="answers-view">
                    {data.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th className="number">No.</th>
                                    <th>Question</th>
                                    <th className="selected">Selected</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.answer_id}>
                                        <td>{index + 1}</td>
                                        <td>{item.question}</td>
                                        <td>{item.answer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ textAlign: 'center' }}>No data found!</p>
                    )}
                </div>
            </div>
            <div className="footer"></div>
        </div>
    )
}

export default AnswersModal;