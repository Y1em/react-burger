import { FunctionComponent } from "react";
import burgerIngredients from "./ingredient-container.module.css";
import { IngredientSubcontainer } from "../ingredient-subcontainer/ingredient-subcontainer";
import { getTitle } from "../../utils/utils";
import { TIngredintsContainerProps } from "../../utils/types";

const IngredientContainer: FunctionComponent<TIngredintsContainerProps> = ({
  ingredients,
}) => {
  return (
    <>
      {Object.values(ingredients).map((sortedArr, index) => (
        <div key={index} className={`pt-10 ${burgerIngredients.container}`}>
          <h3
            className={`text text_type_main-medium mb-6 ${burgerIngredients.container__title}`}
          >
            {getTitle(sortedArr)}
          </h3>
          <IngredientSubcontainer sortedIngredients={sortedArr} />
        </div>
      ))}
    </>
  );
};

export { IngredientContainer };
