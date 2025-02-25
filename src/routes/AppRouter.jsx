import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import AboutPage from '../pages/AboutPage';
import Navbar from "../components/Navbar";
import CurrentAccount from '../pages/CurrentAccount';
import CurrentAccountList from '../pages/CurrentAccountList';

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <div style={{ marginLeft: "200px", padding: "16px" }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/about" element={<AboutPage />} />

                    {/* Cari İşlemler */}
                    <Route path="/current-account/create" element={<CurrentAccount />} />
                    <Route path="/current-account/list" element={<CurrentAccountList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
