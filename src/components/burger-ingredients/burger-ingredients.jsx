import React from "react";
import PropTypes from "prop-types";
import { itemPropTypes } from "../utils/types";
import burgerIngredients from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredients from "../utils/data";
import {
  isBun,
  extractBun,
  sortByTypes,
  isBunInArr,
  getTitle,
} from "../utils/utils";

// Данные функции разбивают исходный массив по типам (data.type), создавая отдельные массивы с одним типом.
// Теперь если в меню появится новый тип, он автоматически появится в разделе "Новинки" :D

const newData = sortByTypes(ingredients);

const ingredientsArr = []; // В дальнейшей этот массив будет передаваться в конструктор

const Item = ({ obj, onCardClick, value }) => {
  const [state, setState] = React.useState({
    display: false,
    count: 0,
  });

  React.useEffect(() => {
    if (isBun(obj)) {
      setState({ display: obj._id === value.current ? true : false, count: 1 });
    }
  }, [value.current, state.display]);

  const onItemClick = () => {
    onCardClick(obj);
    if (!isBun(obj)) {
      setState({ display: true, count: state.count + 1 });
      ingredientsArr.push(obj);
    } else {
      if (isBunInArr(ingredientsArr)) {
        ingredientsArr.splice(
          ingredientsArr.indexOf(extractBun(ingredientsArr)),
          1
        );
        ingredientsArr.push(obj);
      } else {
        ingredientsArr.push(obj);
      }
    }
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
      <img src={obj.image} className={`ml-4 mr-4`} />
      <div className={`mt-1 mb-1 ${burgerIngredients.price}`}>
        <p className={`mr-1 text text_type_digits-default`}>{obj.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${burgerIngredients.name}`}>{obj.name}</p>
    </li>
  );
};

const Subcontainer = ({ arr }) => {
  const [current, setCurrent] = React.useState({});

  const handleListItemClick = React.useCallback(
    (obj) => {
      setCurrent({ current: obj._id });
    },
    [current]
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

const Container = ({ arr }) => {
  return (
    <>
      {arr.map((sortedArr, index) => (
        <div key={index} className={`pt-10 ${burgerIngredients.container}`}>
          <h3
            className={`text text_type_main-medium mb-6 ${burgerIngredients.container__title}`}
          >
            {getTitle(sortedArr)}
          </h3>
          <Subcontainer arr={sortedArr} />
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

const BurgerIngredients = () => {
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
        <Container arr={newData} />
      </div>
    </section>
  );
};

export { BurgerIngredients };

Container.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.array).isRequired,
};

Subcontainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes).isRequired,
};

Item.propTypes = {
  obj: itemPropTypes.isRequired,
  onCardClick: PropTypes.func,
  value: PropTypes.object,
};
