import { FunctionComponent } from "react";
import burgerIngredients from "./ingredient-subcontainer.module.css";
import { IngredientItem } from "../ingredient-item/ingredient-item";
import { TIngredientsSubcontainerProps } from "../utils/types";

const IngredientSubcontainer: FunctionComponent<
  TIngredientsSubcontainerProps
> = ({ sortedIngredients }) => {
  return (
    <ul className={`pl-4 pr-2 ${burgerIngredients.subcontainer}`}>
      {Object.values(sortedIngredients).map((item) => (
        <IngredientItem ingredient={item} key={item._id} />
      ))}
    </ul>
  );
};

export { IngredientSubcontainer };
