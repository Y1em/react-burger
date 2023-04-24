import { FunctionComponent } from "react";
import Style from "./notfound.module.css";
import AppHeader from "../components/app-header/app-header";
import infoicon from "../images/infoicon.svg";

const NotFoundPage: FunctionComponent = () => {
  return (
    <>
      <AppHeader />
      <div className={Style.container}>
        <h1 className="text text_type_digits-large m-15">404</h1>
        <img src={infoicon} alt="Информация" className={Style.image} />
        <p className="text text_type_main-large m-15">Страница не найдена</p>
      </div>
    </>
  );
};

export { NotFoundPage };
