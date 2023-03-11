import React from "react";
import Style from "./register.module.css";
import AppHeader from "../components/app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userRegister } from "../services/actions/auth";
import { nameRegex, emailRegex, passwordRegex, loginPath } from "../components/utils/const";

function RegisterPage() {

  const [isCorrect, setCorrect] = React.useState(false);
  const dispatch = useDispatch();

  const [nameValue, setNameValue] = React.useState('')
  const onNameChange = e => {
    setNameValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  const [emailValue, setEmailValue] = React.useState('')
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  function onRegisterClick(e) {
    e.preventDefault();
    dispatch(userRegister(emailValue, passwordValue, nameValue));
  }

  React.useEffect(() => {
    if (emailRegex.test(emailValue) && nameRegex.test(nameValue) && passwordRegex.test(passwordValue)) {
      setCorrect(true)
    } else {
      setCorrect(false);
    }
  }, [emailValue, nameValue, passwordValue]); // eslint-disable-line

  return (
    <div>
      <AppHeader />
      <form className={Style.form} >
        <h1 className={`${Style.heading} mb-6 text text_type_main-medium`}>Регистрация</h1>
        <Input
          onChange={onNameChange}
          value={nameValue}
          name={'name'}
          placeholder="Имя"
          inputMode="text"
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name={'email'}
          placeholder="E-mail"
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
          onClick={onRegisterClick}
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isCorrect}
          extraClass="mb-20"
        >
          Зарегистрироваться
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

export default RegisterPage;
