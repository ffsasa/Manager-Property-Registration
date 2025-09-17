import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  ...rest
}) => (
  <button
    type={type}
    className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ""}`}
    disabled={disabled || isLoading}
    {...rest}
  >
    {isLoading ? "Đang xử lý..." : children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
  fullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
