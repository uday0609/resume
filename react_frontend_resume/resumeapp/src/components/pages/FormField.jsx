const FormField = ({ label, type, name, value, onChange, required, placeholder }) => {
  return (
    <div className="form-group">
      <label className="step-title">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="form-input"
      />
      {placeholder && <p className="instruction">{placeholder}</p>}
    </div>
  );
};

export default FormField;
