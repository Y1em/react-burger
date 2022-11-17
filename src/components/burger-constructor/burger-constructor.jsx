import React from "react";
import PropTypes from "prop-types";
import burgerConstructor from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { itemPropTypes } from "../utils/types";
import {
  isBun,
  extractBun,
  deleteBun,
  getTotal,
  getConstructorList,
} from "../utils/utils";
import { dataContext, totalPriceContext } from "../../services/appContext";

const Item = ({ obj, position }) => {
  const [state, setState] = React.useState({
    name: obj.name,
    price: obj.price,
    thumbnail: obj.image_mobile,
    type: "",
    isLocked: "",
  });

  const setBunState = () => {
    if (position === "first") {
      setState({ ...state, type: "top" });
    } else if (position === "last") {
      setState({ ...state, type: "bottom" });
    } else {
      setState({ ...state, type: undefined });
    }
  };

  const setLocked = () => {
    isBun(obj)
      ? setState({ ...state, isLocked: true })
      : setState({ ...state, isLocked: false });
  };

  React.useEffect(() => {
    setLocked();
  }, [state.type]);

  React.useEffect(() => {
    setBunState();
  }, []);

  function addName() {
    if (state.type === "top") {
      return "(верх)";
    } else if (state.type === "bottom") {
      return "(низ)";
    } else {
      return "";
    }
  }

  return (
    <li
      className={`mb-4 mr-4 card ${burgerConstructor.item}`}
    >
      {state.type === undefined && <DragIcon />}
      <ConstructorElement
        type={state.type}
        isLocked={state.isLocked}
        text={`${state.name} ${addName()}`}
        price={state.price}
        thumbnail={state.thumbnail}
      />
    </li>
  );
};

const ConstructorContainer = ({ arr }) => {

  if (arr.length === 0) {
    return <ul className={`${burgerConstructor.container}`}></ul>;
  } else {
    return (
      <ul className={`${burgerConstructor.container}`}>
        <Item
          obj={extractBun(arr)}
          position={"first"}
          key={`${extractBun(arr)._id}-top`}

        />
        <ul className={`mb-4 ${burgerConstructor.ingredients__container}`}>
          {deleteBun(arr).map((obj) => {
            return (
              <Item
                obj={obj}
                key={obj._id}

              />
            );
          })}
        </ul>
        <Item
          obj={extractBun(arr)}
          position={"last"}
          key={`${extractBun(arr)._id}-bottom`}

        />
      </ul>
    );
  }
};

const BurgerConstructor = ({ toApp }) => {

  const { data } = React.useContext(dataContext);
  const { totalPriceDispatcher, totalPriceState } = React.useContext(totalPriceContext);

  React.useEffect(() => {
    totalPriceDispatcher({type: 'set', total: getTotal(getConstructorList(data))});
  }, [totalPriceDispatcher, data]);

  function onButtonClick() {
    toApp();
  }

  if (data === null) {
    return (
      <section className={`pt-25 pl-4 ${burgerConstructor.section}`}></section>
    );
  } else {
    return (
      <section className={`pt-25 pl-4 ${burgerConstructor.section}`}>
        <ConstructorContainer arr={getConstructorList(data)} />
        <div className={`mr-4 mt-10 ${burgerConstructor.bottom}`}>
          <p className={"text text_type_digits-medium mr-2"}>
            {totalPriceState.totalPrice}
          </p>
          <div className={`mr-10 ${burgerConstructor.icon}`}>
            <CurrencyIcon />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={onButtonClick}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
};

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  toApp: PropTypes.func.isRequired,
};

ConstructorContainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes).isRequired,
};
Item.propTypes = {
  obj: itemPropTypes.isRequired,
  position: PropTypes.string,
};
