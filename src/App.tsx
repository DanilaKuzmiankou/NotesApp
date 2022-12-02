import './App.scss';
import {NotesPage} from "./pages/NotesPage/NotesPage";
import {Navbar} from "./components/Navbar/Navbar";

function App() {
  return (
      <>
        <Navbar />
        <NotesPage />
      </>
  );
}

export default App;
