import React from "react";
import PropTypes from "prop-types";
import { itemPropTypes } from "../utils/types";
import burgerIngredients from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  isBun,
  sortByTypes,
  getTitle,
} from "../utils/utils";
import { dataContext } from "../../services/appContext";

const Item = ({ obj, onCardClick, value }) => {
  const [state, setState] = React.useState({
    display: false,
    count: 0,
  });

  React.useEffect(() => {
    if (isBun(obj)) {
      setState({ display: obj._id === value.current ? true : false, count: 1 });
    }
  }, [value, state.display, obj]);

  const onItemClick = () => {
    onCardClick(obj);
  };

  return (
    <li className={burgerIngredients.item} onClick={onItemClick}>
      <div
        className={
          state.display
            ? `${burgerIngredients.counter} ${burgerIngredients.counter_active}`
            : `${burgerIngredients.counter}`
        }
      >
        <Counter count={state.count} size="default" />
      </div>
      <img src={obj.image} className={`ml-4 mr-4`} alt={obj.name} />
      <div className={`mt-1 mb-1 ${burgerIngredients.price}`}>
        <p className={`mr-1 text text_type_digits-default`}>{obj.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${burgerIngredients.name}`}>{obj.name}</p>
    </li>
  );
};

const Subcontainer = ({ arr, toContainer }) => {
  const [current, setCurrent] = React.useState({});

  const handleListItemClick = React.useCallback(
    (obj) => {
      toContainer(obj);
      setCurrent({ current: obj._id });
    },
    [current] // eslint-disable-line
  );

  return (
    <ul className={`pl-4 pr-2 ${burgerIngredients.subcontainer}`}>
      {arr.map((item) => (
        <Item
          obj={item}
          value={current}
          key={item._id}
          onCardClick={handleListItemClick}
        />
      ))}
    </ul>
  );
};

const Container = ({ arr, toBurgerIngredients }) => {
  function handleListItemClick(obj) {
    toBurgerIngredients(obj);
  }
  return (
    <>
      {arr.map((sortedArr, index) => (
        <div key={index} className={`pt-10 ${burgerIngredients.container}`}>
          <h3
            className={`text text_type_main-medium mb-6 ${burgerIngredients.container__title}`}
          >
            {getTitle(sortedArr)}
          </h3>
          <Subcontainer arr={sortedArr} toContainer={handleListItemClick} />
        </div>
      ))}
    </>
  );
};

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={burgerIngredients.tabs}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Начинки
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Соусы
      </Tab>
    </div>
  );
};

const BurgerIngredients = ({ toApp }) => {
  const { data } = React.useContext(dataContext);

  function handleListItemClick(obj) {
    toApp(obj);
  }

  if (data === null) {
    return <section className={`mr-10 ${burgerIngredients.section}`}></section>;
  } else {
    return (
      <section className={`mr-10 ${burgerIngredients.section}`}>
        <nav className={`${burgerIngredients.header}`}>
          <h2
            className={`pt-10 pb-5 text text_type_main-large ${burgerIngredients.title}`}
          >
            Соберите бургер
          </h2>
          <Tabs />
        </nav>
        <div className={`${burgerIngredients.menu}`}>
          <Container
            arr={sortByTypes(data)}
            toBurgerIngredients={handleListItemClick}
          />
        </div>
      </section>
    );
  }
};

export { BurgerIngredients };

BurgerIngredients.propTypes = {
  toApp: PropTypes.func.isRequired,
};

Container.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.arrayOf(itemPropTypes.isRequired).isRequired)
    .isRequired,
  toBurgerIngredients: PropTypes.func.isRequired,
};

Subcontainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
  toContainer: PropTypes.func.isRequired,
};

Item.propTypes = {
  obj: itemPropTypes.isRequired,
  onCardClick: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
};