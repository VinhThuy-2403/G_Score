const ErrorBanner = ({ message }) => {
  if (!message) return null;
  return (
    <div className="error-banner" role="alert">
      <span style={{ fontSize: '16px' }}>⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorBanner;
