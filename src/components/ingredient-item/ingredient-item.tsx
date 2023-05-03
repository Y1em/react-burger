import React, { FunctionComponent } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import burgerIngredients from "./ingredient-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { isBun } from "../../utils/utils";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import { TIngredientProps, TIngredientItemState } from "../../utils/types";

const IngredientItem: FunctionComponent<TIngredientProps> = ({
  ingredient,
}) => {
  const location = useLocation();
  const initState = {
    display: false,
    count: 0,
  };
  const [state, setState] = React.useState<TIngredientItemState>(initState);
  const data = useAppSelector((store) => store.ingredientsApiReducer.items);
  const activeBunId = useAppSelector(
    (store) => store.ingredientsReducer.activeBunId
  );
  const mainsList = useAppSelector(
    (store) => store.constructorReducer.constructorMains
  );

  const [{ opacity }, ref] = useDrag({
    type: "items",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  React.useEffect(() => {
    if (isBun(ingredient)) {
      setState({
        ...state,
        display: ingredient._id === activeBunId ? true : false,
        count: 1,
      });
    } else {
      setState({
        ...state,
        display: ingredient.count > 0 ? true : false,
        count: ingredient.count,
      });
    }
  }, [data, ingredient.count, mainsList.length, activeBunId]); // eslint-disable-line

  return (
    <Link
      className={burgerIngredients.item}
      to={{pathname: `/ingredients/${ingredient._id}`}}
      state={{ background: location }}
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
      <img
        src={ingredient.image}
        className={`ml-4 mr-4`}
        alt={ingredient.name}
      />
      <div className={`mt-1 mb-1 ${burgerIngredients.price}`}>
        <p className={`mr-1 text text_type_digits-default`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className={`${burgerIngredients.name} text text_type_main-small`}>
        {ingredient.name}
      </p>
    </Link>
  );
};

export { IngredientItem };
