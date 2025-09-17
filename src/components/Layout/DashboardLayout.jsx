import PropTypes from 'prop-types';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import styles from './DashboardLayout.module.css';

const DashboardLayout = ({ children, onLogout, user }) => (
  <div className={styles.wrapper}>
    <Sidebar user={user} />
    <main className={styles.main}>
      <TopBar onLogout={onLogout} user={user} />
      <div className={styles.content}>{children}</div>
    </main>
  </div>
);

DashboardLayout.propTypes = {
  children: PropTypes.node,
  onLogout: PropTypes.func,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string
  })
};

export default DashboardLayout;