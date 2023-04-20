import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import Coins from "./component/Coins";
import Exchanges from "./component/Exchanges";
import Details from "./component/Deatils";
import Footer from "./component/Footer";


function App() {
  return(
    <>
     <Router>
    <Header />
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/coins" element={<Coins/>}/>
      <Route  path="/exchanges" element={<Exchanges/>}/>
      <Route  path="/coin/:id" element={<Details/>}/>

    </Routes>
    <Footer />

  </Router>
  </>
  );
 
}

export default App;
