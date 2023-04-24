import React, { FunctionComponent } from "react";
import { useAppSelector } from "../services/hooks/hooks";
import AppHeader from "../components/app-header/app-header";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { getIngredient } from "../components/utils/utils";
import { getData } from "../components/utils/api";
import { Modal } from "../components/modal/modal";
import { useParams, useLocation } from "react-router-dom";
import { ingredientsTitle } from "../components/utils/const";
import { getObj } from "../components/utils/utils";
import { TIngredient } from "../components/utils/types";

const IngredientPage: FunctionComponent = () => {
  const currentItem = useAppSelector((store) => store.modalReducer.currentItem);
  const savedCurrentItem = getObj("currentItem");
  const { id } = useParams();
  const [item, setItem] = React.useState<TIngredient | undefined>(undefined);
  const from = useLocation().state;

  React.useEffect(() => {
    if (from === null)
      getData()
        .then((res) => {
          if (res && res.success) {
            setItem(getIngredient(id, res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }, []); // eslint-disable-line

  if (from === null && item) {
    return (
      <div>
        <AppHeader />
        <div className="mb-30" />
        <IngredientDetails obj={item} />
      </div>
    );
  } else {
    return (
      (currentItem || savedCurrentItem) && (
        <Modal title={ingredientsTitle}>
          <IngredientDetails
            obj={currentItem ? currentItem : savedCurrentItem}
          />
        </Modal>
      )
    );
  }
};

export default IngredientPage;
