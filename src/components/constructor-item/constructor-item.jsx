import React from "react";
import PropTypes from "prop-types";
import { itemPropTypes } from "../utils/types";
import burgerConstructor from "./constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { isBun, setBunType, addName } from "../utils/utils";
import {
  DELETE_ITEM,
  SET_TOTAL_PRICE,
  MOVE_ITEM,
} from "../../services/actions/burger-constructor";
import {
  DECREASE_COUNTER,
} from "../../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";
import { useDrop, useDrag } from "react-dnd";

const ConstructorItem = ({ ingredient, position, index }) => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredientsApiReducer.items);
  const [state, setState] = React.useState({
    name: ingredient.name,
    price: ingredient.price,
    thumbnail: ingredient.image_mobile,
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

  const [{ isHover }, drop] = useDrop({
    accept: "constructorItems",
    collect: (monitor) => ({
      item: monitor.getItem(),
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      moveConstructorItem(itemId);
    },
  });

  const padding = isHover ? '96px 0 0 0' : '0';

  const [{ opacity }, drag] = useDrag({
    type: "constructorItems",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  drag(drop(ref));

  React.useMemo(() => {
    setState({
      ...state,
      isLocked: isBun(ingredient),
      type: setBunType(position),
    });
  }, [ingredient]); // eslint-disable-line

  const onDelete = () => {
    dispatch({
      type: DELETE_ITEM,
      id: ingredient._id,
    });
    dispatch({
      type: SET_TOTAL_PRICE,
    });
    dispatch({
      type: DECREASE_COUNTER,
      id: ingredient._id,
      items: data,
    });
  };

  return (
    <li
      className={`mb-4 mr-4 card ${burgerConstructor.item}`}
      ref={ingredient.type === "bun" ? null : ref}
      style={{ opacity, padding }}
      id={index}
    >
      {state.type === undefined && <DragIcon />}
      <ConstructorElement
        type={state.type}
        isLocked={state.isLocked}
        text={`${state.name} ${addName(state.type)}`}
        price={state.price}
        thumbnail={state.thumbnail}
        handleClose={onDelete}
      />
    </li>
  );
};

ConstructorItem.propTypes = {
  ingredient: itemPropTypes.isRequired,
  position: PropTypes.string,
  index: PropTypes.number,
};

export { ConstructorItem };
