import React from "react";
import Style from "./profile.module.css";
import AppHeader from "../components/app-header/app-header";
import {
  EmailInput,
  Input,
  Button,
  PasswordInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_SUCCSES, userLogout } from "../services/actions/auth";
import { updateToken, updateUser, getUser } from "../components/utils/api";
import { emailRegex, nameRegex } from "../components/utils/const";
import { ACTIVE } from "../services/actions/app-header";
import { update } from "../components/utils/utils";

function ProfilePage() {

  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');
  const name = useSelector(((store) => store.authReducer.name));
  const email = useSelector(((store) => store.authReducer.email));
  const [emailValue, setEmailValue] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [active, setActive] = React.useState('profile');
  const [isCorrect, setCorrect] = React.useState(false);

  const onNameChange = e => {
    setNameValue(e.target.value);
  }

  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  }

  const onEmailChange = e => {
    setEmailValue(e.target.value);
  }

  function onItemClick(e) {
    setActive(e.target.attributes.value.value);
  }

  function onLogoutClick(e) {
    onItemClick(e);
    if (refreshToken) {
      dispatch(userLogout(refreshToken));
      setNameValue("");
      setEmailValue("");
      setPasswordValue("");
    }
  }

  function onSaveClick(e) {
    e.preventDefault();
    if (accessToken) {
      updateUser(accessToken, {name: nameValue, email: emailValue}, update(updateToken, refreshToken, updateUser, setInfo, {name: nameValue, email: emailValue}))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCSES,
            name: res.user.name,
            email: res.user.email,
          });
          setInfo(res)
          setPasswordValue("");
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function setInfo(res) {
    setNameValue(res.user.name);
    setEmailValue(res.user.email);
  }

  function onCancelClick() {
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue("");
  }

  React.useEffect(() => {
    if (accessToken) {
      getUser(accessToken, update(updateToken, refreshToken, getUser, setInfo))
      .then((res) => {
        if (res && res.success) {
          setInfo(res)
        }
      })
      .catch((err) => {
        console.log(err);
      })
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
    dispatch({
      type: ACTIVE,
      active: window.location.pathname,
    });
  }, []); // eslint-disable-line

  return (
    <div>
      <AppHeader />

        <div className={Style.container} >
          <ul className={Style.list} >
            <li
              className={active === "profile" ? `${Style.item} ${Style.item_active} text text_type_main-medium` : `${Style.item} text text_type_main-medium` }
              value="profile"
              onClick={onItemClick}
            >
              Профиль
            </li>

            <li
              className={active === "orders" ? `${Style.item} ${Style.item_active} text text_type_main-medium` : `${Style.item} text text_type_main-medium` }
              value="orders"
              onClick={onItemClick}
            >
              История заказов
            </li>

            <li
              className={active === "exit" ? `${Style.item} ${Style.item_active} text text_type_main-medium mb-20` : `${Style.item} text text_type_main-medium mb-20`}
              onClick={onLogoutClick}
              value="exit"
            >
              Выход
            </li>

            <li className={`${Style.text} text text_type_main-default`} >
              В этом разделе вы можете изменить свои персональные данные
            </li>
          </ul>

          <form className={Style.form} >
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
                disabled={!isCorrect}
                onClick={onSaveClick}
              >
                Сохранить
              </Button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default ProfilePage;
