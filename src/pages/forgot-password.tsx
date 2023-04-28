import React, { SyntheticEvent, FunctionComponent } from "react";
import Style from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { restorePassword } from "../utils/api";
import { emailRegex, resetPath, loginPath } from "../utils/const";
import { useAppDispatch } from "../services/hooks/hooks";
import { PASSWORD_REQUEST_SUCCESS } from "../services/actions/auth";

const ForgotPasswordPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [isRedirect, setRedirect] = React.useState<boolean>(false);
  const [isCorrect, setCorrect] = React.useState<boolean>(false);
  const [emailValue, setEmailValue] = React.useState<string>("");

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmailValue(e.target.value);
  }

  React.useEffect(() => {
    if (emailRegex.test(emailValue)) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  }, [emailValue]); // eslint-disable-line

  function onButtonClick(e: SyntheticEvent) {
    e.preventDefault();
    restorePassword(emailValue)
      .then((res) => {
        if (res.success) {
          setRedirect(true);
          dispatch({
            type: PASSWORD_REQUEST_SUCCESS,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isRedirect) {
    return <Navigate to={resetPath} />;
  }

  return (
    <form className={Style.form}>
      <h1 className={`${Style.heading} mb-6 text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={"email"}
        placeholder="E-mail"
        isIcon={false}
        inputMode={"email"}
        extraClass="mb-6"
      />
      <Button
        htmlType="button"
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
  );
};

export default ForgotPasswordPage;
