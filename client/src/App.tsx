import "./App.css";
import Login from "./Login";
import Footer from "./components/footer";
import {Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {

  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<IndexPage/>}/>
        <Route path="jobs" element={<SearchResultPage/>}/>
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </div>
  );
};

export default App;
