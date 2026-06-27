import { FiX } from 'react-icons/fi'
import './Modal.css'

function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal--${size}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            <FiX size={20} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default Modal
