import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ABQuiz from './pages/ABQuiz/ABPanel';
import HomePage from './pages/Home/HomePage';
import './App.css';
import SliderBreedSelector from './pages/SliderBreedSelector/SliderBreedSelector';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <BrowserRouter>
        <nav
          style={{
            padding: '20px',
            background: '#eee',
            display: 'flex',
            gap: '15px',
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/quiz">AB Quiz</Link>
          <Link to="/slider">Slider Quiz</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/slider" element={<SliderBreedSelector />} />
          <Route path="/quiz" element={<ABQuiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
