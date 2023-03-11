import React from "react";
import Style from "./forgot-password.module.css";
import AppHeader from "../components/app-header/app-header";
import {
  EmailInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from 'react-router-dom';
import { restorePassword } from "../components/utils/api";
import { emailRegex, resetPath, loginPath } from "../components/utils/const";
import { useDispatch } from "react-redux";
import { PASSWORD_REQUEST_SUCCSES } from "../services/actions/auth";

function ForgotPasswordPage() {

  const dispatch = useDispatch();
  const [isRedirect, setRedirect] = React.useState(false);
  const [isCorrect, setCorrect] = React.useState(false);
  const [emailValue, setEmailValue] = React.useState('');

  function onEmailChange (e) {
    setEmailValue(e.target.value);
  };

    React.useEffect(() => {
      if (emailRegex.test(emailValue)) {
        setCorrect(true)
      } else {
        setCorrect(false);
      }
  }, [emailValue]); // eslint-disable-line

  function onButtonClick(e) {
    e.preventDefault();
    restorePassword(emailValue)
    .then((res) => {
      if (res.success) {
        setRedirect(true);
        dispatch({
          type: PASSWORD_REQUEST_SUCCSES,
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  if (isRedirect) {
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
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          inputMode={"email"}
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
          Восстановить
        </Button>
        <p className={`text text_type_main-default mb-4`}>
          Вспомнили пароль?&nbsp;
          <Link to={loginPath} className={Style.text}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
