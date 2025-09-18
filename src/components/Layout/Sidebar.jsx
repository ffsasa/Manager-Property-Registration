import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';
import { PROJECTS, DEFAULT_PROJECT_NAME } from '../../constants/index.js';
import { useProject } from '../../context/ProjectContext.jsx';

const Sidebar = ({ user }) => {
  const displayName = user?.fullName || 'Quản trị viên';
  const email = user?.email || 'admin@company.vn';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const { projectName, setProjectName } = useProject();
  const activeProject = projectName ?? DEFAULT_PROJECT_NAME;

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
          {PROJECTS.map((property, index) => (
            <button
              type="button"
              key={`${property}-${index}`}
              onClick={() => setProjectName(property)}
              className={`${styles.menuItem} ${
                activeProject === property ? styles.active : ''
              }`}
            >
              {property}
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.footer}>
        <p className={styles.footerNote}>Managed Consultation</p>
        <p className={styles.copyright}>
            © 2025 ConicBoulevard. All rights reserved.
        </p>
        <p className={styles.devNote}>
            Developed by An Tạ Ngọc (ffsasa)
        </p>
        </div>
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