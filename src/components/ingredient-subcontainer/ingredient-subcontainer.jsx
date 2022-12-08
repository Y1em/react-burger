import burgerIngredients from "./ingredient-subcontainer.module.css";
import PropTypes from "prop-types";
import { itemPropTypes } from "../utils/types";
import { IngredientItem } from "../ingredient-item/ingredient-item";

const IngredientSubcontainer = ({ sortedIngredients }) => {
  return (
    <ul className={`pl-4 pr-2 ${burgerIngredients.subcontainer}`}>
      {sortedIngredients.map((item) => (
        <IngredientItem ingredient={item} key={item._id} />
      ))}
    </ul>
  );
};

IngredientSubcontainer.propTypes = {
  sortedIngredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};

export { IngredientSubcontainer }
