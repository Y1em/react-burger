import { FunctionComponent } from "react";
import burgerIngredients from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TTabProps } from "../../utils/types";

const Tabs: FunctionComponent<TTabProps> = ({ currentTab, setTab }) => {
  function handleClickTab(event: string) {
    setTab(event);
  }

  return (
    <div className={burgerIngredients.tabs}>
      <Tab value="one" active={currentTab === "one"} onClick={handleClickTab}>
        Булки
      </Tab>
      <Tab value="two" active={currentTab === "two"} onClick={handleClickTab}>
        Начинки
      </Tab>
      <Tab
        value="three"
        active={currentTab === "three"}
        onClick={handleClickTab}
      >
        Соусы
      </Tab>
    </div>
  );
};

export { Tabs };
