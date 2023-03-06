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
import { UPDATE_USER_SUCCSES, UPDATE_TOKEN_SUCCSES, userLogout } from "../services/actions/auth";
import { updateToken, updateUser, getUser } from "../components/utils/api";
import { emailRegex, nameRegex } from "../components/utils/const";
import { ACTIVE } from "../services/actions/app-header";

function ProfilePage() {

  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = useSelector((store) => store.authReducer.accessToken);
  const name = useSelector(((store) => store.authReducer.name));
  const email = useSelector(((store) => store.authReducer.email));
  const password = useSelector(((store) => store.authReducer.password));

  const [emailValue, setEmailValue] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [active, setActive] = React.useState('profile');
  const [isCorrect, setCorrect] = React.useState(false);
  const [isPassword, setPassword] = React.useState(false);

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
      setPasswordValue("")
    }
  }

  function onSaveClick(e) {
    e.preventDefault();
    if (accessToken) {
      updateUser(accessToken, {name: nameValue, email: emailValue}, updateForSaveUser)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCSES,
            name: res.user.name,
            email: res.user.email,
          });
          setNameValue(res.user.name);
          setEmailValue(res.user.email);
          setPasswordValue("");
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  function updateForSaveUser() {
    updateToken(refreshToken)
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCSES,
          accessToken: res.accessToken
        })
        updateUser(res.accessToken, {name: res.user.name, email: res.user.email})
        .then((res) => {
          if (res && res.success) {
            setNameValue(res.user.name);
            setEmailValue(res.user.email);
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function updateForGetUser() {
    updateToken(refreshToken)
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCSES,
          accessToken: res.accessToken
        })
        getUser(res.accessToken)
        .then((res) => {
          if (res && res.success) {
            setNameValue(res.user.name);
            setEmailValue(res.user.email);
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function onCancelClick() {
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue("");
  }

  React.useEffect(() => {
    if (accessToken) {
      getUser(accessToken, updateForGetUser)
      .then((res) => {
        if (res && res.success) {
          setNameValue(res.user.name);
          setEmailValue(res.user.email);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (passwordValue === password) {
      setPassword(true)
    } else {
      setPassword(false);
    }
  }, [passwordValue, password]); // eslint-disable-line

  React.useEffect(() => {
    if (emailRegex.test(emailValue) && nameRegex.test(nameValue) && isPassword) {
      setCorrect(true)
    } else {
      setCorrect(false);
    }
  }, [emailValue, nameValue, isPassword]); // eslint-disable-line

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
