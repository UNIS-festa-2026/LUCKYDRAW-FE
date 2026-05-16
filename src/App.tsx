import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kwang from "./pages/Kwang";
import Loading from "./pages/Loading";
import Pay from "./pages/Pay";
import Unavailable from "./pages/Unavailable";
import Draw from "./pages/Draw";
import Done from "./pages/Done";
import Coupon from "./pages/Coupon";
import TarotHome from "./pages/tarot/Home";
import TarotSelection from "./pages/tarot/Selection";
import TarotDescription from "./pages/tarot/Description";

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
      <Route path="/coupon/:couponId" element={<Coupon />} />
      {/* Tarot pages */}
      <Route path="/tarot" element={<TarotHome />} />
      <Route path="/tarot/home" element={<TarotHome />} />
      <Route path="/tarot/selection" element={<TarotSelection />} />
      <Route path="/tarot/description/:cardId" element={<TarotDescription />} />
    </Routes>
  );
}

export default App;
