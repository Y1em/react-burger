import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ProfilePage from "../../pages/profile";
import ResetPasswordPage from "../../pages/reset-password";
import OrdersPage from "../../pages/orders";
import { ProtectedRouteElement } from "../protected-route";
import { loginPath } from "../utils/const";
import IngredientPage from "../../pages/ingredient";
import { useSelector } from "react-redux";
import { Homepage } from "../../pages/homepage";
import { NotFoundPage } from '../../pages/notfound';

function App() {
  const currentItem = useSelector((store) => store.modalReducer.currentItem);
  const savedCurrentItem = JSON.parse(localStorage.getItem('currentItem'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          {currentItem || savedCurrentItem ? <Route path="ingredients/:id" element={<IngredientPage />}/> : ''}
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} path={loginPath} />} />
        <Route path="/orders" element={<ProtectedRouteElement element={<OrdersPage />} path={loginPath} />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>

  );
}
export default App;
