import React, { useState } from 'react';
import '../App.css';
import UserCard from './UserCard';

export const Pagination = ({ data, itemsPerPage, handleClick, handleCreate }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <div className='row'>
                <div className='col-lg-3' style={{ margin: '12px 0' }}>
                    <div className='wrapper add'>
                        <div className='circle' onClick={handleCreate}>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='circle-add'>Add user</div>
                    </div>
                </div>
                {currentItems.map(user => (
                    <UserCard key={user.id} user={user} onClick={handleClick} />
                ))}
            </div>

            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>

                <span style={{ margin: '0 10px' }}>
                    Page {currentPage} of {totalPages}
                </span>

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};
