export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Видалити' }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-secondary btn-sm">
            Скасувати
          </button>
          <button onClick={onConfirm} className="btn-danger btn-sm">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}