import React from "react";
import PropTypes from "prop-types";
import { itemPropTypes } from "../utils/types";
import burgerIngredients from "./ingredient-container.module.css";
import { IngredientSubcontainer } from "../ingredient-subcontainer/ingredient-subcontainer";
import { getTitle } from "../utils/utils";

const IngredientContainer = ({ ingredients }) => {
  const itemEls = React.useRef({});
  return (
    <>
      {ingredients.map((sortedArr, index) => (
        <div key={index} className={`pt-10 ${burgerIngredients.container}`}>
          <h3
            className={`text text_type_main-medium mb-6 ${burgerIngredients.container__title}`}
            ref={(element) => (itemEls.current[index] = element)}
          >
            {getTitle(sortedArr)}
          </h3>
          <IngredientSubcontainer sortedIngredients={sortedArr} />
        </div>
      ))}
    </>
  );
};

IngredientContainer.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(itemPropTypes.isRequired).isRequired)
    .isRequired,
};

export { IngredientContainer }
