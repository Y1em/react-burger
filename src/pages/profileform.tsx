import React, { FunctionComponent, SyntheticEvent } from "react";
import Style from "./profileform.module.css";
import {
  EmailInput,
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { UPDATE_USER_SUCCESS } from "../services/actions/auth";
import { updateUser, getUser } from "../utils/api";
import {
  emailRegex,
  nameRegex,
  getUserTrigger,
  updateUserTrigger,
} from "../utils/const";
import { update } from "../utils/utils";
import { TUser, TResponse } from "../utils/types";

const ProfileForm: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const name = useAppSelector((store) => store.authReducer.name);
  const email = useAppSelector((store) => store.authReducer.email);
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [nameValue, setNameValue] = React.useState<string>("");
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [isCorrect, setCorrect] = React.useState<boolean>(false);
  const [isChanged, setChanged] = React.useState<boolean>(false);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  function updateUserAction(acToken: string, user: TUser, refToken: string) {
    updateUser(
      acToken,
      user,
      update,
      refToken,
      updateUserTrigger,
      updateUserAction
    )
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
          setInfo(res);
          setPasswordValue("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onFormSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (accessToken && refreshToken) {
      updateUserAction(
        accessToken,
        { email: emailValue, name: nameValue },
        refreshToken
      );
    }
  }

  function onCancelClick() {
    setNameValue(name);
    setEmailValue(email);
    setPasswordValue("");
  }

  function setInfo(res: TResponse) {
    setNameValue(res.user.name);
    setEmailValue(res.user.email);
  }

  function getUserAction(acToken: string, refToken: string) {
    getUser(acToken, update, refToken, getUserTrigger, getUserAction)
      .then((res) => {
        if (res && res.success) {
          setInfo(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (accessToken && refreshToken) {
      getUserAction(accessToken, refreshToken);
    }
  }, []); // eslint-disable-line

  React.useEffect(() => {
    if (emailRegex.test(emailValue) && nameRegex.test(nameValue)) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  }, [emailValue, nameValue]); // eslint-disable-line

  React.useEffect(() => {
    if (name === nameValue && email === emailValue) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  }, [emailValue, nameValue, name, email]); // eslint-disable-line

  return (
    <form
      className={`${Style.form} ml-15`}
      onSubmit={onFormSubmit}
      >
      <Input
        onChange={onNameChange}
        value={nameValue}
        name={"name"}
        placeholder="Имя"
        icon="EditIcon"
        type="text"
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onEmailChange}
        value={emailValue}
        name={"email"}
        placeholder="Логин"
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={passwordValue}
        name={"password"}
        placeholder="Пароль"
        extraClass="mb-6"
      />
      <div className={`${Style.bottom} text text_type_main-default`}>
        <p className={Style.cancel} onClick={onCancelClick}>
          Отмена
        </p>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="ml-7"
          disabled={isCorrect && !isChanged}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export { ProfileForm };
