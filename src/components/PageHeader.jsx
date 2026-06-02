
function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      
      <div>
        <h2>{title}</h2>
        {subtitle && <span className="subtitle">{subtitle}</span>}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {children}
      </div>

    </div>
  );
}

export default PageHeader;