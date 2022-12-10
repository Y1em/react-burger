import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeader from "./app-header.module.css";
import PropTypes from "prop-types";

const Item = ({ name, icon, active }) => {
  return (
    <li className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${appHeader.list__item}`}>
      <a // eslint-disable-line
        className={`${appHeader.item} ${active ? appHeader.item_active : ""}`}
        href={""}
        target={"_blank"}
      >
        {icon}
        <p className={`pl-2 text text_type_main-default ${appHeader.title}`}>
          {name}
        </p>
      </a>
    </li>
  );
};

const AppHeader = () => {
  return (
    <header className={appHeader.header}>
      <div className={appHeader.logo}>
        <Logo />
      </div>

      <ul className={appHeader.container}>
        <Item name={"Конструктор"} icon={<BurgerIcon />} active={true} />

        <Item
          name={"Лента заказов"}
          icon={<ListIcon type="secondary" />}
          active={false}
        />

        <Item
          name={"Личный кабинет"}
          icon={<ProfileIcon type="secondary" />}
          active={false}
        />
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
