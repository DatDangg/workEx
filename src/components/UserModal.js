import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchema } from '../utils/schema';
import { useEffect } from 'react';
import './UserModal.css';

function formatDateToYMD(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d)) return '';
  return d.toISOString().split('T')[0];
}

export default function UserModal({ isOpen, onClose, initialData, onSubmit }) {
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    reset, //đặt lại giá trị form
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        dob: formatDateToYMD(initialData.dob),
        workfrom: formatDateToYMD(initialData.workfrom),
        workto: formatDateToYMD(initialData.workto),
      });
    } else {
      reset({ name: '', dob: '', workfrom: '', workto: '' });
    }
  }, [initialData, reset]);

  if (!isOpen) return null;

  const handleFinalSubmit = (data) => {
    const cleanedData = {
      ...data,
      dob: formatDateToYMD(data.dob),
      workfrom: formatDateToYMD(data.workfrom),
      workto: formatDateToYMD(data.workto),
    };
    onSubmit(cleanedData);
  };

  return (
    <>
      <div className="overlay show" onClick={onClose}></div>
      <div className="modalInput show">
        <div onClick={onClose} className="modal-close">
          <i className="fas fa-xmark"></i>
        </div>
        <form onSubmit={handleSubmit(handleFinalSubmit)}>
          <div className='input'>
            <label>User name:</label>
            <input type="text" {...register("name")} />
            {errors.name && <div style={{ color: 'red' }}>{errors.name.message}</div>}
          </div>
          <div className='input'>
            <label>Date of birth:</label>
            <input type="date" {...register("dob")} />
            {errors.dob && <div style={{ color: 'red' }}>{errors.dob.message}</div>}
          </div>
          <div className='input'>
            <label>Work from:</label>
            <input type="date" {...register("workfrom")} />
            {errors.workfrom && <div style={{ color: 'red' }}>{errors.workfrom.message}</div>}
          </div>
          <div className='input'>
            <label>Work to:</label>
            <input type="date" {...register("workto")} />
            {errors.workto && <div style={{ color: 'red' }}>{errors.workto.message}</div>}
          </div>
          <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </>
  );
}
