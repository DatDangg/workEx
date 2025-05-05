import '../App.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import UserModal from '../components/UserModal';
import { updateUser, deleteUser, getUserById } from '../services/userService';
import { formatDate } from '../utils/formatDate';
import ConfirmModal from '../components/ConfirmModal';

function UserDetail() {
  const [detail, setDetail] = useState({});
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const loadingRef = useRef();
  const wrapperRef = useRef();
  const userId = location?.state.userId || '';

  const closeLoading = () => {
    loadingRef.current.classList.add('hidden');
    wrapperRef.current.classList.remove('hidden');
  };

  useEffect(() => {
    getUserById(userId)
      .then(res => {
        closeLoading();
        setUser(res.data);
        setDetail(res.data);
      })
      .catch(err => console.log(err));
  }, []);


  const handleSubmitUpdate = (data) => {
    updateUser(userId, data)
      .then(() => {
        toast("User updated");
        setDetail(data);
        setUser(data);
        setModalOpen(false);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = () => setConfirmOpen(true);

  const confirmDelete = () => {
    deleteUser(userId)
      .then(() => {
        toast('User deleted');
        navigate('/');
      })
      .catch(err => console.log(err));
  };


  return (
    <>
      <div className='container'>
        <Link to='/'> <button style={{ marginLeft: '-12px' }}>Back</button> </Link>
        <div className='row'>
          <div className='loading' ref={loadingRef}>Loading....</div>
          <div className='wrapper hidden' ref={wrapperRef}>
            <div>Name: {detail.name}</div>
            <div>Date of birth: {formatDate(detail.dob)}</div>
            <div>Age: {detail.age}</div>
            <div>Work from: {formatDate(detail.workfrom)}</div>
            <div>Work to: {formatDate(detail.workto)}</div>
          </div>
        </div>
        <button onClick={() => setModalOpen(true)} style={{ marginRight: '36px', marginLeft: '-12px' }}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <UserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={user}
        onSubmit={handleSubmitUpdate}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        message="Do you really want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

export default UserDetail;
