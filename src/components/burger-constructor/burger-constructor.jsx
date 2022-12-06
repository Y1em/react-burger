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
import { isBun, extractBun, deleteBun, getIds, hasBun } from "../utils/utils";
import {
  DELETE_ITEM,
  OPEN_ORDER,
  getOrderData,
  GET_EMPTY_ORDER_MESSAGE,
  ADD_ITEM,
  GET_BUN_MESSAGE,
  SET_BUN,
  SET_TOTAL_PRICE,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  MOVE_ITEM,
} from "../../services/actions/ingredients";

import { useDispatch, useSelector } from "react-redux";

import { useDrop, useDrag } from "react-dnd";

const Item = ({ obj, position, index }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    name: obj.name,
    price: obj.price,
    thumbnail: obj.image_mobile,
    type: "",
    isLocked: "",
  });

  const ref = React.useRef(null);

  function moveConstructorItem(item) {
    dispatch({
      type: MOVE_ITEM,
      id: item._id,
      index: index,
    });
  }

  const [, drop] = useDrop({
    accept: "constructorItems",
    collect: (monitor) => ({
      item: monitor.getItem(),
    }),
    drop(itemId) {
      moveConstructorItem(itemId);
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "constructorItems",
    item: obj,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  drag(drop(ref));

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
  }, [state.type]); // eslint-disable-line

  React.useEffect(() => {
    setBunState();
  }, []); // eslint-disable-line

  function addName() {
    if (state.type === "top") {
      return "(верх)";
    } else if (state.type === "bottom") {
      return "(низ)";
    } else {
      return "";
    }
  }

  const onDelete = () => {
    dispatch({
      type: DELETE_ITEM,
      id: obj._id,
    });
    dispatch({
      type: SET_TOTAL_PRICE,
    });
    dispatch({
      type: DECREASE_COUNTER,
      id: obj._id,
    });
  };

  const handleDragOver = (e) => {
    console.dir(e.target.closest(".card").id);
  };

  return (
    <li
      className={`mb-4 mr-4 card ${burgerConstructor.item}`}
      ref={obj.type === "bun" ? null : ref} // dnd
      style={{ opacity }}
      onDragOver={handleDragOver}
      id={index}
    >
      {state.type === undefined && <DragIcon />}
      <ConstructorElement
        type={state.type}
        isLocked={state.isLocked}
        text={`${state.name} ${addName()}`}
        price={state.price}
        thumbnail={state.thumbnail}
        handleClose={onDelete}
      />
    </li>
  );
};

const ConstructorContainer = ({ arr }) => {
  const dispatch = useDispatch();

  const moveItem = (item) => {
    dispatch({
      type: SET_BUN,
      id: item._id,
      ingredientType: item.type,
    });

    if (!isBun(item)) {
      if (hasBun(arr)) {
        dispatch({
          type: ADD_ITEM,
          id: item._id,
        });
        dispatch({
          type: INCREASE_COUNTER,
          id: item._id,
        });
      } else {
        dispatch({
          type: GET_BUN_MESSAGE,
        });
      }
    } else {
      if (hasBun(arr)) {
        arr.splice(arr.indexOf(extractBun(arr)), 1);
        dispatch({
          type: ADD_ITEM,
          id: item._id,
        });
      } else {
        dispatch({
          type: ADD_ITEM,
          id: item._id,
        });
      }
    }

    dispatch({
      type: SET_TOTAL_PRICE,
    });
  };

  const [, dropTarget] = useDrop({
    accept: "items",
    collect: (monitor) => ({
      item: monitor.getItem(),
    }),
    drop(itemId) {
      moveItem(itemId);
    },
  });

  const message = useSelector((store) => store.ingredients.message);

  if (arr.length === 0) {
    return (
      <ul
        className={`${burgerConstructor.container} ${burgerConstructor.container_empty}`}
        ref={dropTarget}
      >
        <li className={"text text_type_main-medium"}>{message}</li>
      </ul>
    );
  } else {
    return (
      <ul
        className={`${burgerConstructor.container}`}
        ref={dropTarget} // dnd
      >
        <Item
          obj={extractBun(arr)}
          position={"first"}
          key={`${extractBun(arr)._id}-top`}
        />
        <ul className={`mb-4 ${burgerConstructor.ingredients__container}`}>
          {deleteBun(arr).map((obj, index) => {
            return (
              <Item obj={obj} key={`${obj._id}-${index}`} index={index + 1} />
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

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredients.constructorItems);
  const totalPrice = useSelector((store) => store.ingredients.totalPrice);

  function onButtonClick() {
    if (data.length === 0) {
      dispatch({
        type: GET_EMPTY_ORDER_MESSAGE,
      });
    } else {
      dispatch(getOrderData(getIds(data)));
      dispatch({
        type: OPEN_ORDER,
      });
    }
  }

  return (
    <section className={`pt-25 pl-4 ${burgerConstructor.section} `}>
      <ConstructorContainer arr={data} />
      <div className={`mr-4 mt-10 ${burgerConstructor.bottom}`}>
        <p className={"text text_type_digits-medium mr-2"}>{totalPrice}</p>
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
};

export default BurgerConstructor;

ConstructorContainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes).isRequired,
};
Item.propTypes = {
  obj: itemPropTypes.isRequired,
  position: PropTypes.string,
};
