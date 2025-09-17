import ConsultationList from '../components/Consultations/ConsultationList.jsx';
import DashboardLayout from '../components/Layout/DashboardLayout.jsx';
import { useAuth } from '../hooks/useAuth.js';

const DashboardPage = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <DashboardLayout onLogout={handleLogout} user={user}>
      <ConsultationList />
    </DashboardLayout>
  );
};

export default DashboardPage;