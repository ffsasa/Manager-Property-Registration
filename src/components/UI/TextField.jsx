import PropTypes from "prop-types";
import styles from "./TextField.module.css";

const TextField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  autoComplete = "off",
}) => (
  <label className={styles.field}>
    <span className={styles.label}>{label}</span>
    <input
      className={styles.input}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
    />
  </label>
);

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
};

export default TextField;
