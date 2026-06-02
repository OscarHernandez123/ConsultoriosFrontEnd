
function ApiMessage({ type = 'info', children, onClose }) {
  if (!children) {
    return null;
  }

  const icon = type === 'success' ? '✓ ' : type === 'error' ? '✕ ' : 'ℹ ';

  return (
    <div className={`api-message api-message-${type}`}>
      
      <div className = "message-container">
        <span className = "message-card">
          {icon}
        </span>
        <span>{children}</span>
      </div>

      {onClose && (
        <button className="api-message-close" onClick={onClose} type="button">
          ✕
        </button>
      )}
      
    </div>
  );
}

export default ApiMessage;