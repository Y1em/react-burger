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
import { getData } from "../utils/api";

const Item = ({ obj, position, toConstructorContainer }) => {
  const [state, setState] = React.useState({
    name: obj.name,
    price: obj.price,
    thumbnail: obj.image_mobile,
    type: "",
    isLocked: "",
  });

  function handleOpenModal() {
    toConstructorContainer(obj);
  }

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
      onClick={handleOpenModal}
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

const ConstructorContainer = ({ arr, toBurgerConstructor }) => {
  function handleOpenModal(obj) {
    toBurgerConstructor(obj);
  }

  if (arr.length === 0) {
    return <ul className={`${burgerConstructor.container}`}></ul>;
  } else {
    return (
      <ul className={`${burgerConstructor.container}`}>
        <Item
          obj={extractBun(arr)}
          position={"first"}
          key={`${extractBun(arr)._id}-top`}
          toConstructorContainer={handleOpenModal}
        />
        <ul className={`mb-4 ${burgerConstructor.ingredients__container}`}>
          {deleteBun(arr).map((obj) => {
            return (
              <Item
                obj={obj}
                key={obj._id}
                toConstructorContainer={handleOpenModal}
              />
            );
          })}
        </ul>
        <Item
          obj={extractBun(arr)}
          position={"last"}
          key={`${extractBun(arr)._id}-bottom`}
          toConstructorContainer={handleOpenModal}
        />
      </ul>
    );
  }
};

const BurgerConstructor = ({ toAppIng, toAppOrder }) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getData(setData, getConstructorList);
  }, []);

  function onItemClick(obj) {
    toAppIng(obj);
  }

  function onButtonClick() {
    toAppOrder();
  }

  if (data === null) {
    return (
      <section className={`pt-25 pl-4 ${burgerConstructor.section}`}></section>
    );
  } else {
    return (
      <section className={`pt-25 pl-4 ${burgerConstructor.section}`}>
        <ConstructorContainer arr={data} toBurgerConstructor={onItemClick} />
        <div className={`mr-4 mt-10 ${burgerConstructor.bottom}`}>
          <p className={"text text_type_digits-medium mr-2"}>
            {getTotal(data)}
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
  toAppIng: PropTypes.func,
  toAppOrder: PropTypes.func,
};

ConstructorContainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes).isRequired,
  toBurgerConstructor: PropTypes.func,
};
Item.propTypes = {
  obj: itemPropTypes.isRequired,
  position: PropTypes.string,
  toConstructorContainer: PropTypes.func,
};
