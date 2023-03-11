import React from "react";
import Style from "./register.module.css";
import AppHeader from "../components/app-header/app-header";
import {
  PasswordInput,
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from 'react-router-dom';
import { getNewPassword } from "../components/utils/api";
import { passwordRegex, codeRegex, loginPath, resetPath } from "../components/utils/const";
import { useSelector } from "react-redux";


function ResetPasswordPage() {
  const passwordRequest = useSelector((store) => store.authReducer.passwordRequest);
  const [isCorrect, setCorrect] = React.useState(false);
  const [isRedirect, setRedirect] = React.useState(false);
  const [passwordValue, setPasswordValue] = React.useState('');
  const [codeValue, setCodeValue] = React.useState('');

  const onCodeChange = e => {
    setCodeValue(e.target.value)
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  function onButtonClick(e) {
    e.preventDefault();
    getNewPassword(passwordValue, codeValue)
    .then((res) => {
      if (res.success) {
        setRedirect(true);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    if (codeRegex.test(codeValue) && passwordRegex.test(passwordValue)) {
      setCorrect(true)
    } else {
      setCorrect(false);
    }
}, [codeValue, passwordValue]); // eslint-disable-line

if (isRedirect) {
  return (
    <Navigate
      to={loginPath}
    />
  );
}

if (!passwordRequest) {
  return (
    <Navigate
      to={resetPath}
    />
  );
}


  return (
    <div>
      <AppHeader />
      <form className={Style.form}>
        <h1 className={`${Style.heading} mb-6 text text_type_main-medium`}>Восстановление пароля</h1>
        <PasswordInput
            onChange={onPasswordChange}
            value={passwordValue}
            name={'password'}
            placeholder="Пароль"
            extraClass="mb-6"
          />
        <Input
          onChange={onCodeChange}
          value={codeValue}
          name={'code'}
          placeholder="Введите код из письма"
          inputMode="text"
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          onClick={onButtonClick}
          disabled={!isCorrect}
          extraClass="mb-20"
        >
          Сохранить
        </Button>

        <p className={`text text_type_main-default mb-4`}>
          Уже зарегистрированы?&nbsp;
          <Link to={loginPath} className={Style.text}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
