import React from "react";
import Style from "./profileform.module.css";
import {
  EmailInput,
  Input,
  Button,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_SUCCSES } from "../services/actions/auth";
import { updateUser, getUser } from "../components/utils/api";
import { emailRegex, nameRegex, getUserTrigger, updateUserTrigger } from "../components/utils/const";
import { update } from "../components/utils/utils";

function ProfileForm() {

  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');
  const name = useSelector(((store) => store.authReducer.name));
  const email = useSelector(((store) => store.authReducer.email));
  const [emailValue, setEmailValue] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [isCorrect, setCorrect] = React.useState(false);
  const [isChanged, setChanged] = React.useState(false);

  const onNameChange = e => {
    setNameValue(e.target.value);
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  }

  const onEmailChange = e => {
    setEmailValue(e.target.value);
  }

  function updateUserAction(acToken, user, refToken) {
    updateUser(acToken, user, update, refToken, updateUserTrigger, updateUserAction)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_SUCCSES,
          name: res.user.name,
          email: res.user.email,
        });
        setInfo(res);
        setPasswordValue("");
      }
    })
    .catch((err) => {
      console.log(err);
    }
    )
  }

  function onSaveClick(e) {
    e.preventDefault();
    if (accessToken) {
      updateUserAction(accessToken, {email: emailValue, name: nameValue}, refreshToken);
    }
  }

  function onCancelClick() {
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue("");
  }

  function setInfo(res) {
    setNameValue(res.user.name);
    setEmailValue(res.user.email);
  }

  function getUserAction(acToken, refToken) {
    getUser(acToken, update, refToken, getUserTrigger, getUserAction)
    .then((res) => {
      if (res && res.success) {
        setInfo(res)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    if (accessToken) {
      getUserAction(accessToken, refreshToken)
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (emailRegex.test(emailValue) && nameRegex.test(nameValue)) {
      setCorrect(true)
    } else {
      setCorrect(false);
    }
  }, [emailValue, nameValue]); // eslint-disable-line

  React.useEffect(() => {
    if (name === nameValue && email === emailValue) {
      setChanged(false)
    } else {
      setChanged(true);
    }
  }, [emailValue, nameValue, name, email]); // eslint-disable-line

  return (
    <form className={`${Style.form} ml-15`}>
      <Input
        onChange={onNameChange}
        value={nameValue}
        name={'name'}
        placeholder="Имя"
        icon="EditIcon"
        type="text"
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={'email'}
        placeholder="Логин"
        icon="EditIcon"
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={passwordValue}
        name={'password'}
        placeholder="Пароль"
        extraClass="mb-6"
      />
      <div className={`${Style.bottom} text text_type_main-default`}>
        <p
          className={Style.cancel}
          onClick={onCancelClick}
        >
          Отмена
        </p>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="ml-7"
          disabled={isCorrect && !isChanged}
          onClick={onSaveClick}
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}

export { ProfileForm };
