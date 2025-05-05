export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;
  
    return (
      <>
        <div className="overlay show" onClick={onCancel}></div>
        <div className="modalInput show" style={{ width: '300px', textAlign: 'center' }}>
          <p>{message || "Are you sure?"}</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
            <button className="btn btn-danger" onClick={onConfirm}>Yes</button>
            <button className="btn btn-secondary" onClick={onCancel}>No</button>
          </div>
        </div>
      </>
    );
  }