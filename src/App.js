import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import SearchResult from "./pages/SearchResult";
import VideoDetails from "./pages/VideoDetails";
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <div className="relative">
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchResults/:searchQuery" element={<SearchResult/>} />
        <Route path="/video/:id" element={<VideoDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
