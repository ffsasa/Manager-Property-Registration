import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button.jsx';
import TextField from '../components/UI/TextField.jsx';
import { useAuth } from '../hooks/useAuth.js';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, authLoading, authError, isAuthenticated } = useAuth();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!formValues.email || !formValues.password) {
      setFormError('Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      await login({ email: formValues.email, password: formValues.password });
      navigate('/', { replace: true });
    } catch (error) {
      setFormError(error.message || 'Đăng nhập thất bại, vui lòng thử lại');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h1>LoginAdmin</h1>
          <p>Đăng nhập để quản lý đăng ký tư vấn</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="admin@company.vn"
            autoComplete="username"
            required
          />
          <TextField
            label="Mật khẩu"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          {(formError || authError) && <p className={styles.error}>{formError || authError}</p>}
          <Button type="submit" fullWidth isLoading={authLoading}>
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;