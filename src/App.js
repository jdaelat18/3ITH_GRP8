import { Route, Routes, useLocation } from 'react-router-dom';
import Layout2 from './components/Layout/Layout2';
import HomeStyle from './components/Pages/HomeStyle';
import About from './components/Pages/About';
import Doctors from './components/Pages/Doctors';
import Appointments from './components/Pages/Appointments';
import Hospitals from './components/Pages/Hospitals';
import Dashboard from './components/DashboardPages/Dashboard';
import Benefits from './components/Pages/Benefits';
import Homepage from './components/DashboardPages/Homepage';
import AppointmentRequests from './components/DashboardPages/AppointmentRequests';
import AddDoctor from './components/DashboardPages/AddDoctor';
import AddHospital from './components/DashboardPages/AddHospital';

import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {/* Pages with Header + Footer */}
      <Route path="/" element={<Layout2 />}>
        <Route index element={<HomeStyle />} />
        <Route path="about" element={<About />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="hospitals" element={<Hospitals />} />
        <Route path="benefits" element={<Benefits />} />
      </Route>

      {/* Admin Dashboard (No Header, No Footer) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/homepage" element={<Homepage />} />
      <Route path="/dashboard/appointment-requests" element={<AppointmentRequests />} />
      <Route path="/dashboard/add-doctor" element={<AddDoctor />} />
      <Route path="/dashboard/add-hospital" element={<AddHospital />} />

    </Routes>
  );
}

export default App;
