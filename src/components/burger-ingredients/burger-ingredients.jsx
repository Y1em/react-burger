import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { itemPropTypes } from "../utils/types";
import burgerIngredients from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { isBun, sortByTypes, getTitle } from "../utils/utils";
import {
  getItems,
  OPEN_DETAILS,
  SET_COUNT,
  SET_TAB,
  SET_SCROLL_TOP,
} from "../../services/actions/ingredients.js";

import { useDrag } from "react-dnd"; //dnd

const Item = ({ obj }) => {
  const [state, setState] = React.useState({
    display: false,
    count: 0,
  });

  // dnd
  const [{ opacity }, ref] = useDrag({
    type: "items",
    item: obj,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  // dnd

  const dispatch = useDispatch();

  const activeBunId = useSelector((store) => store.ingredients.activeBunId);
  const constructorList = useSelector(
    (store) => store.ingredients.constructorItems
  );

  React.useEffect(() => {
    if (isBun(obj)) {
      setState({ display: obj._id === activeBunId ? true : false, count: 1 });
    }
  }, [activeBunId, state.display, obj]);

  React.useEffect(() => {
    if (!isBun(obj)) {
      setState({ display: obj.count > 0 ? true : false, count: obj.count });
    }
  }, [obj.count, constructorList]); // eslint-disable-line

  const onItemClick = () => {
    dispatch({
      type: OPEN_DETAILS,
      id: obj._id,
    });
  };

  return (
    <li
      className={burgerIngredients.item}
      onClick={onItemClick}
      ref={ref} // dnd
      style={{ opacity }} // dnd
    >
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

const Subcontainer = ({ arr }) => {
  return (
    <ul className={`pl-4 pr-2 ${burgerIngredients.subcontainer}`}>
      {arr.map((item) => (
        <Item obj={item} key={item._id} />
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
  const dispatch = useDispatch();
  const currentTab = useSelector((store) => store.ingredients.currentTab);
  function handleClickTab(event) {
    dispatch({
      type: SET_TAB,
      value: `${event}`,
    });
    dispatch({
      type: SET_SCROLL_TOP,
      value: `${event}`,
    });
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

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredients.items);
  const scrollContainer = document.getElementById("scrollContainer");
  const scrollTop = useSelector((store) => store.ingredients.scrollTop);

  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  React.useEffect(
    () => {
      dispatch({
        type: SET_COUNT,
      });
    },
    [data] // eslint-disable-line
  );

  function handleScroll(event) {
    if (event.currentTarget.scrollTop < 300) {
      dispatch({
        type: SET_TAB,
        value: "one",
      });
    } else if (
      event.currentTarget.scrollTop >= 300 &&
      event.currentTarget.scrollTop < 1400
    ) {
      dispatch({
        type: SET_TAB,
        value: "two",
      });
    } else if (event.currentTarget.scrollTop >= 1400) {
      dispatch({
        type: SET_TAB,
        value: "three",
      });
    }
  }

  React.useEffect(() => {
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollTop;
    }
  }, [scrollTop]); // eslint-disable-line

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
        <div
          className={`${burgerIngredients.menu}`}
          onScroll={handleScroll}
          id={"scrollContainer"}
        >
          <Container arr={sortByTypes(data)} />
        </div>
      </section>
    );
  }
};

export { BurgerIngredients };

Container.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.arrayOf(itemPropTypes.isRequired).isRequired)
    .isRequired,
};

Subcontainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

Item.propTypes = {
  obj: itemPropTypes.isRequired,
};
