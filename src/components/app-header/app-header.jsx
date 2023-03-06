import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import appHeader from "./app-header.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Item = ({ name, icon, active }) => {
  return (
    <li className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${appHeader.list__item}`} >
      <div // eslint-disable-line
        className={`${appHeader.item} ${active ? appHeader.item_active : ""}`}
      >
        {icon}
        <p className={`pl-2 text text_type_main-default ${appHeader.title}`}>
          {name}
        </p>
      </div>
    </li>
  );
};

const AppHeader = () => {
  const activeTab = useSelector((store) => store.headerReducer.active);

  return (
    <header className={appHeader.header}>
      <div className={appHeader.logo}>
        <Logo />
      </div>
      <ul className={appHeader.container}>
        <Link to="/" className={appHeader.link} >
          <Item
            name={"Конструктор"}
            icon={<BurgerIcon type={activeTab === "/" ? "primary" : "secondary"} />}
            active={activeTab === "/" ? true : false}
          />
        </Link>
        <Link to="/orders" className={appHeader.link} >
        <Item
            name={"Лента заказов"}
            icon={<ListIcon type={activeTab === "/orders" ? "primary" : "secondary"} />}
            active={activeTab === "/orders" ? true : false}
          />
        </Link>
        <Link to="/profile" className={appHeader.link} >
          <Item
            name={"Личный кабинет"}
            icon={<ProfileIcon type={activeTab === "/profile" ? "primary" : "secondary"} />}
            active={activeTab === "/profile" ? true : false}
          />
        </Link>
      </ul>
    </header>
  );
};

export default AppHeader;

Item.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};
