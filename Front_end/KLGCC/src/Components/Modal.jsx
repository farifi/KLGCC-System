import "./Components CSS files/Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation() }> {/* prevent close on inner click*/}
                {title && <h3>{title}</h3>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
