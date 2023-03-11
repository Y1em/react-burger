import React from "react";
import Style from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userLogin } from "../services/actions/auth";
import { emailRegex, passwordRegex, registerPath, forgotPath } from "../components/utils/const";
import { ACTIVE } from "../services/actions/app-header";

function LoginPage() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.authReducer.name);
  const [passwordValue, setPasswordValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [isCorrect, setCorrect] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  function onLoginClick(e) {
    e.preventDefault();
    dispatch(userLogin(emailValue, passwordValue));
  }

  React.useEffect(() => {
    if (user && location.state) {
      navigate(location.state.from.pathname);
    }
  }, [user]); // eslint-disable-line

  React.useEffect(() => {
    if (emailRegex.test(emailValue) && passwordRegex.test(passwordValue)) {
      setCorrect(true)
    } else {
      setCorrect(false);
    }
  }, [emailValue, passwordValue]); // eslint-disable-line

  React.useEffect(() => {
    dispatch({
      type: ACTIVE,
      active: location.pathname,
    });
  }, []); // eslint-disable-line

  return (
    <div>
      <AppHeader />
      <form className={Style.form}>
        <h1 className={`${Style.heading} mb-6 text text_type_main-medium`}>Вход</h1>
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'password'}
            placeholder="Пароль"
            extraClass="mb-6"
          />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={onLoginClick}
          disabled={!isCorrect}
          extraClass="mb-20"
        >
          Войти
        </Button>
        <p className={`text text_type_main-default mb-4`}>
          Вы — новый пользователь?&nbsp;
          <Link to={registerPath} className={Style.text}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={`text text_type_main-default`}>
          Забыли пароль?&nbsp;
          <Link to={forgotPath} className={Style.text}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
