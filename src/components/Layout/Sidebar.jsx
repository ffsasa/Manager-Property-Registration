import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

const PROPERTY_ITEMS = [
  'Vinhomes Golden River',
  'Vinhomes Central Park',
  'Vinhomes Landmark 81',
  'Vinhomes Golden River',
  'Vinhomes Ocean Park',
  'Vinhomes Smart City'
];

const Sidebar = ({ user }) => {
  const displayName = user?.fullName || 'Quản trị viên';
  const email = user?.email || 'admin@company.vn';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.logo}>Đăng ký tư vấn</div>
        <div className={styles.profileCard}>
          <div className={styles.avatar}>{initials || 'AD'}</div>
          <div>
            <p className={styles.name}>{displayName}</p>
            <p className={styles.email}>{email}</p>
          </div>
        </div>
        <nav className={styles.menu}>
          {PROPERTY_ITEMS.map((property, index) => (
            <button
              type="button"
              key={`${property}-${index}`}
              className={`${styles.menuItem} ${index === 0 ? styles.active : ''}`}
            >
              {property}
            </button>
          ))}
        </nav>
      </div>
      <p className={styles.footerNote}>Managed Listener</p>
    </aside>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string
  })
};

export default Sidebar;