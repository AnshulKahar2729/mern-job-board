import "./App.css";
import IndexHeader from "./components/indexHeader";
import Login from "./Login";
import Footer from "./components/footer";
import {Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import SearchResultPage from "./pages/SearchResultPage";

const App = () => {

  return (
    <div className="App ">
      <Routes>
        <Route path="/" element={<IndexPage/>}/>
        <Route path="jobs" element={<SearchResultPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
