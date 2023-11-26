import "./App.css";
import IndexHeader from "./components/indexHeader";
import Login from "./Login";
import Footer from "./components/footer";
import {Routes, Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage";

const App = () => {

  return (
    <div className="App" style={{height: "200vh"}}>
      <Routes>
        <Route path="/" element={<IndexPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
