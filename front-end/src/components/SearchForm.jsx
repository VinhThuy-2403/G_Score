import { useState } from 'react';

const SearchForm = ({ onSearch, loading = false }) => {
  const [sbd, setSbd] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = sbd.trim();

    if (!trimmed) {
      setValidationError('Vui lòng nhập số báo danh');
      return;
    }
    if (!/^\d{8}$/.test(trimmed)) {
      setValidationError('SBD phải có đúng 8 chữ số');
      return;
    }

    setValidationError('');
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p
        style={{
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          marginBottom: '8px',
          marginTop: 0,
        }}
      >
        Số báo danh:
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          id="sbd-input"
          className={`input${validationError ? ' error' : ''}`}
          type="text"
          placeholder="Nhập 8 chữ số báo danh..."
          value={sbd}
          onChange={(e) => {
            setSbd(e.target.value);
            if (validationError) setValidationError('');
          }}
          maxLength={8}
          disabled={loading}
        />
        <button
          id="sbd-submit-btn"
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ flexShrink: 0 }}
        >
          {loading ? 'Đang tra cứu...' : 'Tra cứu →'}
        </button>
      </div>
      {validationError && (
        <p style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '6px', marginBottom: 0 }}>
          {validationError}
        </p>
      )}
    </form>
  );
};

export default SearchForm;
