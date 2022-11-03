import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeader from "./app-header.module.css";

const AppHeader = () => {
  const Item = ({ name, icon }) => {
    return (
      <li className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${appHeader.item}`}>
        {icon}
        <p className={`pl-2 text text_type_main-default ${appHeader.title}`}>
          {name}
        </p>
      </li>
    );
  };

  return (
    <header className={appHeader.header}>
      <div className={appHeader.logo}>
        <Logo />
      </div>

      <ul className={appHeader.container}>
        <Item name={"Конструктор"} icon={<BurgerIcon />} />

        <Item name={"Лента заказов"} icon={<ListIcon />} />

        <Item name={"Личный кабинет"} icon={<ProfileIcon />} />
      </ul>
    </header>
  );
};

export default AppHeader;
