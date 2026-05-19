import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kwang from "./pages/Kwang";
import Loading from "./pages/Loading";
import Pay from "./pages/Pay";
import Unavailable from "./pages/Unavailable";
import Draw from "./pages/Draw";
import Done from "./pages/Done";
import Coupon from "./pages/Coupon";

// 모든 쿠폰명 (이미지 파일명 기준, 확장자 제외)
const couponList = [
  "이화검도부 1000원 할인권",
  "EMC 1000원 할인권",
  "일반대학원 총학생회 1000원 할인권",
  "중앙스트릿댄스동아리 ACTION 1000원 할인권",
  "융합보건학과 학생회 VITAL 1000원 할인권",
  "디자인학부 학생회 1000원 할인권",
  "AIESEC 1000원 할인권",
  "인문과학대학 학생회 리베리음 1000원 할인권",
  "중어중문학과 학생회 전진중문 1000원 할인권",
  "BBQ 황올",
  "컴포즈 아이스 아메리카노",
  "베라 아이스크림 싱글레귤러",
  "청년다방 떡볶이",
  "올리브영 기프트카드 3만원",
];
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
      <Route path="/coupon/:couponId/:index" element={<Coupon />} />
      {/* 모든 쿠폰을 라우팅으로 접근 가능하게 */}
      {couponList.map((name) => (
        <Route
          key={name}
          path={`/coupon/${encodeURIComponent(name)}`}
          element={<Coupon />}
        />
      ))}
      {/* Tarot pages */}
      <Route path="/tarot" element={<TarotHome />} />
      <Route path="/tarot/home" element={<TarotHome />} />
      <Route path="/tarot/selection" element={<TarotSelection />} />
      <Route path="/tarot/description/:cardId" element={<TarotDescription />} />
    </Routes>
  );
}

export default App;
