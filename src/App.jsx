import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ABQuiz from './pages/ABQuiz/ABPanel';
import HomePage from './pages/Home/HomePage';
import './App.css';
import SliderBreedSelector from './pages/SliderBreedSelector/SliderBreedSelector';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-blue-200 font-sans w-full">
      <BrowserRouter>
        <Navbar />
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
