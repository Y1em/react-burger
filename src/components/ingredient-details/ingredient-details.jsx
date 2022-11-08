import PropTypes from "prop-types";
import modal from './ingredient-details.module.css';
import { itemPropTypes } from "../utils/types";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const Ingredient = ({obj}) => {
  return (
    <div className={`${modal.container}`} >
      <img
        src={obj.image_large}
        alt={obj.name}
        className={`mb-4 ${modal.image}`}
      />
      <h3 className={`mb-8 text text_type_main-medium`}>
        {obj.name}
      </h3>
      <ul className={`${modal.nutrients}`} >

        <li className={`ml-5 ${modal.nutrient}`} >
          <p className={`text text_type_main-default mb-2`} >
            Калории,&nbsp;ккал
          </p>
          <p className={`text text_type_digits-default`} >
            {obj.calories}
          </p>
        </li>

        <li className={`ml-5 ${modal.nutrient}`} >
          <p className={`text text_type_main-default mb-2`} >
            Белки, г
          </p>
          <p className={`text text_type_digits-default`} >
            {obj.proteins}
          </p>
        </li>

        <li className={`ml-5 ${modal.nutrient}`} >
          <p className={`text text_type_main-default mb-2`} >
            Жиры, г
          </p>
          <p className={`text text_type_digits-default`} >
            {obj.fat}
          </p>
        </li>

        <li className={`ml-5 ${modal.nutrient}`} >
          <p className={`text text_type_main-default mb-2`} >
            Углеводы, г
          </p>
          <p className={`text text_type_digits-default`} >
            {obj.carbohydrates}
          </p>
        </li>

      </ul>
    </div>
  );
}

const IngredientDetails = ({ obj, closePopup }) => {
  const details = Ingredient({obj});
  return (
    <ModalOverlay Popup={details} type={'text'} handleClose={closePopup} />
  );
}

export { IngredientDetails };

IngredientDetails.propTypes = {
  obj: itemPropTypes,
  closePopup: PropTypes.func,
};

