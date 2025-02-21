// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router"; // Use react-router-dom for web apps
import { NotesProvider } from "./context/NotesContext";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";
import CreateNote from "./pages/CreateNote";

// App component wraps the home page content with the global NotesProvider.
// The outer div now uses an innovative gradient background (using Tailwind's bg-gradient-to-r)
const App = () => {
  return (
    <NotesProvider>
      <Router>
        {/* 
          'min-h-screen' ensures full viewport height.
          'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' adds a vibrant gradient.
          'bg-base-200' is replaced with our custom gradient.
        */}
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>
        </div>
      </Router>
    </NotesProvider>
  );
};

export default App;