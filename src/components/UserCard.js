import React from 'react';

const UserCard = ({ user, onClick }) => {
    return (
        <div className='col-lg-3' style={{ margin: '12px 0' }}>
            <div className='wrapper'>
                <div>Name: {user.name}</div>
                <div>Age: {user.age}</div>
                {onClick && (
                    <button onClick={() => onClick(user.id)}>View detail</button>
                )}
            </div>
        </div>
    );
};

export default UserCard;
