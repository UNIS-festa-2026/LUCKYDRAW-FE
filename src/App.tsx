import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kwang from "./pages/Kwang";
import Loading from "./pages/Loading";
import Pay from "./pages/Pay";
import Unavailable from "./pages/Unavailable";
import Draw from "./pages/Draw";
import Done from "./pages/Done";
import Coupon from "./pages/Coupon";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/kwang" element={<Kwang />} />
      <Route path="/unavailable" element={<Unavailable />} />
      <Route path="/draw" element={<Draw />} />
      <Route path="/done" element={<Done />} />
      <Route path="/coupon" element={<Coupon />} />
    </Routes>
  );
}

export default App;
