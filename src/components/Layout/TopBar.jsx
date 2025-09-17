import PropTypes from 'prop-types';
import styles from './TopBar.module.css';

const TopBar = ({ onLogout, user }) => {
  const displayName = user?.fullName || 'Quản trị viên';

  return (
    <header className={styles.topbar}>
      <div>
        <p className={styles.subtitle}>Quản lý đăng ký tư vấn</p>
        <h1 className={styles.title}>Danh sách khách hàng</h1>
      </div>
      <div className={styles.actions}>
        <div className={styles.userSummary}>
          <div className={styles.userCircle}>{displayName.charAt(0)}</div>
          <div>
            <p className={styles.userName}>{displayName}</p>
            <p className={styles.userRole}>Administrator</p>
          </div>
        </div>
        <button type="button" className={styles.logoutButton} onClick={onLogout}>
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

TopBar.propTypes = {
  onLogout: PropTypes.func,
  user: PropTypes.shape({
    fullName: PropTypes.string
  })
};

export default TopBar;