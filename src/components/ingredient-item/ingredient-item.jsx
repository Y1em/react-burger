import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemPropTypes } from "../utils/types";
import burgerIngredients from "./ingredient-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  isBun,
} from "../utils/utils";
import {
  SET_CURRENT_ITEM,
} from "../../services/actions/ingredients.js";
import { useDrag } from "react-dnd";

const IngredientItem = ({ ingredient }) => {
  const [state, setState] = React.useState({
    display: false,
    count: 0,
  });

  const [{ opacity }, ref] = useDrag({
    type: "items",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const dispatch = useDispatch();

  const activeBunId = useSelector((store) => store.ingredients.activeBunId);
  const mainsList = useSelector(
    (store) => store.ingredients.constructorMains
  );

  React.useMemo(() => {
    if (isBun(ingredient)) {
      setState({ display: ingredient._id === activeBunId ? true : false, count: 1 });
    } else {
      setState({ display: ingredient.count > 0 ? true : false, count: ingredient.count });
    }

  }, [ingredient.count, mainsList, activeBunId]) // eslint-disable-line

  const onItemClick = () => {
    dispatch({
      type: SET_CURRENT_ITEM,
      id: ingredient._id,
    });
  };

  return (
    <li
      className={burgerIngredients.item}
      onClick={onItemClick}
      ref={ref}
      style={{ opacity }}
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
      <img src={ingredient.image} className={`ml-4 mr-4`} alt={ingredient.name} />
      <div className={`mt-1 mb-1 ${burgerIngredients.price}`}>
        <p className={`mr-1 text text_type_digits-default`}>{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${burgerIngredients.name}`}>{ingredient.name}</p>
    </li>
  );
};

IngredientItem.propTypes = {
  ingredient: itemPropTypes.isRequired,
};

export { IngredientItem }
