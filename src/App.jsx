import './index.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="app-container">
      <Sidebar/>
      <div className = "main-content">
        <Topbar/>
        <DashboardPage/>
      </div>
    </div>
  );
}

export default App;
