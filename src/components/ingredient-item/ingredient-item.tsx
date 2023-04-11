import React, { FunctionComponent } from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
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
} from "../../services/actions/modal";
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from 'react-router-dom';

type TItemProps = {
  ingredient: {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    count: number,
  };
}

type TState = {
  display: boolean,
  count: number,
}

const IngredientItem: FunctionComponent<TItemProps> = ({ ingredient }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname
  const [state, setState] = React.useState<TState>({
    display: false,
    count: 0,
  });

// типизация хранилища

  const data = useSelector((store) => store.ingredientsApiReducer.items);
  const activeBunId = useSelector((store) => store.ingredientsReducer.activeBunId);
  const mainsList = useSelector(
    (store) => store.constructorReducer.constructorMains
  );

  const goToIngredient = () => {
    navigate(`/ingredients/${ingredient._id}`, { replace: true, state: path });
  }

  const [{ opacity }, ref] = useDrag({
    type: "items",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  React.useMemo(() => {
    if (isBun(ingredient)) {
      setState({ display: ingredient._id === activeBunId ? true : false, count: 1 });
    } else {
      setState({ display: ingredient.count > 0 ? true : false, count: ingredient.count });
    }

  }, [ingredient.count, ingredient._id, mainsList, activeBunId]) // eslint-disable-line

  const onItemClick = () => {
    dispatch({
      type: SET_CURRENT_ITEM,
      id: ingredient._id,
      items: data,
    });
    goToIngredient();
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
        <CurrencyIcon type={"primary"} />
      </div>
      <p className={`${burgerIngredients.name} text text_type_main-small`}>{ingredient.name}</p>
    </li>
  );
};

export { IngredientItem }
