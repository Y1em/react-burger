import React from "react";
import PropTypes from "prop-types";
import PortalReactDOM from 'react-dom';
import modal from './ingredient-details.module.css';
import {
  CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { modalRoot } from "../utils/utils";
import { itemPropTypes } from "../utils/types";

const IngredientDetails = ({ obj, toModalIng }) => {

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.focus()
  }, [obj]);

  function handleClose() {
    toModalIng()
  }

  function handleCloseByEscape(e) {
    if (e.key === "Escape") {
      toModalIng();
    }
  }

  function handleCloseByOverlay(e) {
    if (e.target === ref.current) {
      toModalIng();
    }
  }

  return PortalReactDOM.createPortal(
    (
      <section className={`${modal.section}`} onClick={handleCloseByOverlay} onKeyDown={handleCloseByEscape} tabIndex={0} ref={ref} >
        <div className={`pt-10 pl-10 pr-10 pb-15 ${modal.container}`} >
          <header className={`${modal.header}`} >
            <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
            <div className={`${modal.close}`} >
              <CloseIcon onClick={handleClose} />
            </div>
          </header>
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
      </section>
    ),
    modalRoot
  );
}

export { IngredientDetails };

IngredientDetails.propTypes = {
  obj: itemPropTypes,
  toModalIng: PropTypes.func,
};

