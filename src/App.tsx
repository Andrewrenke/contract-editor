import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateContract from './pages/CreateContract';
import EditContract from './pages/EditContract';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateContract />} />
        <Route path="/edit/:id" element={<EditContract />} />
      </Routes>
    </Router>
  );
}

export default App;
