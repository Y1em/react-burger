import React from "react";
import PropTypes from "prop-types";
import { itemPropTypes } from "../utils/types";
import burgerConstructor from "./constructor-container.module.css";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { isBun, extractBun, hasBun } from "../utils/utils";
import { bunMessage } from "../utils/const";
import {
  SET_BUN,
  SET_TOTAL_PRICE,
  INCREASE_COUNTER,
  ADD_BUN,
  ADD_MAIN,
} from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

const ConstructorContainer = ({
  mainList,
  bunList,
  message,
  handleSetMessage,
}) => {
  const dispatch = useDispatch();
  const moveItem = (item) => {
    if (!isBun(item)) {
      if (hasBun(bunList)) {
        dispatch({
          type: ADD_MAIN,
          id: item._id,
        });
        dispatch({
          type: INCREASE_COUNTER,
          id: item._id,
        });
      } else {
        handleSetMessage(bunMessage);
      }
    } else {
      dispatch({
        type: SET_BUN,
        id: item._id,
        ingredientType: item.type,
      });
      if (hasBun(bunList)) {
        bunList.splice(
          bunList.indexOf(extractBun(bunList)),
          1
        );
        dispatch({
          type: ADD_BUN,
          id: item._id,
        });
      } else {
        dispatch({
          type: ADD_BUN,
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

  if (bunList.length === 0) {
    return (
      <ul
        className={`${burgerConstructor.container} ${burgerConstructor.container_empty}`}
        ref={dropTarget}
      >
        <li className={"text text_type_main-medium"}>{message}</li>
      </ul>
    );
  }
  return (
    <ul className={`${burgerConstructor.container}`} ref={dropTarget}>
      <ConstructorItem
        ingredient={bunList[0]}
        position={"first"}
        key={`${bunList[0]._id}-top`}
      />
      <ul className={`mb-4 ${burgerConstructor.ingredients__container}`}>
        {mainList.map((obj, index) => {
          return (
            <ConstructorItem
              ingredient={obj}
              key={`${obj._id}-${index}`}
              index={index}
            /> // В конструктор можно добавить два одинаковых ингредиента с одинаковым ID. Если не модифицировать ID вылезает ошибка в консоль
          );
        })}
      </ul>
      <ConstructorItem
        ingredient={bunList[0]}
        position={"last"}
        key={`${bunList[0]._id}-bottom`}
      />
    </ul>
  );
};

ConstructorContainer.propTypes = {
  mainList: PropTypes.arrayOf(itemPropTypes),
  bunList: PropTypes.arrayOf(itemPropTypes),
  message: PropTypes.string,
  handleSetMessage: PropTypes.func,
};

export { ConstructorContainer };
