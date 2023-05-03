import React, { FunctionComponent, SyntheticEvent } from "react";
import Style from "./login.module.css";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogin } from "../services/actions/auth";
import {
  emailRegex,
  passwordRegex,
  registerPath,
  forgotPath,
} from "../utils/const";
import { ACTIVE } from "../services/actions/app-header";

const LoginPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.authReducer.name);
  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [isCorrect, setCorrect] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  function onFormSubmit(e: SyntheticEvent) {
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
      setCorrect(true);
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
    <form
      className={Style.form}
      onSubmit={onFormSubmit}
      >
      <h1 className={`${Style.heading} mb-6 text text_type_main-medium`}>
        Вход
      </h1>
      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={passwordValue}
        name={"password"}
        placeholder="Пароль"
        extraClass="mb-6"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
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
  );
};

export default LoginPage;
