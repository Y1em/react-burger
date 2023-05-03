import { FunctionComponent } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { homePath, profilePath, feedPath } from "../../utils/const";
import { Link } from "react-router-dom";
import appHeader from "./app-header.module.css";
import { Item } from "../app-header-item/app-header-item";
import { useAppSelector } from "../../services/hooks/hooks";

const AppHeader: FunctionComponent = () => {
  const activeTab = useAppSelector((store) => store.headerReducer.active);

  return (
    <header className={appHeader.header}>
      <div className={appHeader.logo}>
        <Logo />
      </div>
      <ul className={appHeader.container}>
        <Link to={homePath} className={appHeader.link}>
          <Item
            name={"Конструктор"}
            icon={
              <BurgerIcon
                type={activeTab === homePath ? "primary" : "secondary"}
              />
            }
            active={activeTab === homePath ? true : false}
          />
        </Link>
        <Link to={feedPath} className={appHeader.link}>
          <Item
            name={"Лента заказов"}
            icon={
              <ListIcon
                type={activeTab === feedPath ? "primary" : "secondary"}
              />
            }
            active={activeTab === feedPath ? true : false}
          />
        </Link>
        <Link to={profilePath} className={appHeader.link}>
          <Item
            name={"Личный кабинет"}
            icon={
              <ProfileIcon
                type={activeTab === profilePath ? "primary" : "secondary"}
              />
            }
            active={activeTab === profilePath ? true : false}
          />
        </Link>
      </ul>
    </header>
  );
};

export default AppHeader;
