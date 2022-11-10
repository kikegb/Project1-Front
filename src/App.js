import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Tasks from './views/TasksPage';
import Users from './views/UsersPage'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/tasks/:userId" element={<Tasks />} />

          <Route path="/tasks" element={<Tasks />} />
            
          <Route path="/users" element={<Users />} />
          
          <Route path="/" element={<Navigate replace to="/users" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
