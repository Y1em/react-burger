import burgerIngredients from "./tabs.module.css";
import PropTypes from "prop-types";
import {
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = ({ currentTab, setTab }) => {
  function handleClickTab(event) {
    setTab(event)
  }

  return (
    <div className={burgerIngredients.tabs}>
      <Tab
        value="one"
        active={currentTab === "one"}
        onClick={handleClickTab}
      >
        Булки
      </Tab>
      <Tab
        value="two"
        active={currentTab === "two"}
        onClick={handleClickTab}
      >
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

Tabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  setTab: PropTypes.func,
};

export { Tabs }
