import React from "react";
import { useSelector } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { getItem } from "../components/utils/utils";
import { getData } from "../components/utils/api";
import { Modal } from "../components/modal/modal";
import { useParams, useLocation } from 'react-router-dom';
import { ingredientsTitle } from "../components/utils/const";

function IngredientPage() {

  const currentItem = useSelector((store) => store.modalReducer.currentItem);
  const savedCurrentItem = JSON.parse(localStorage.getItem('currentItem'));
  const {id} = useParams();
  const [item, setItem] = React.useState('');
  const from = useLocation().state

  React.useEffect(() => {
    if (from === null)
      getData()
      .then((res) => {
        if (res && res.success) {
          setItem(getItem(id, res.data));
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
    )
  } else {
    return (
      (currentItem || savedCurrentItem) && (
        <Modal title={ingredientsTitle}>
          <IngredientDetails obj={currentItem ? currentItem : savedCurrentItem} />
        </Modal>
      )
    );
  }
}

export default IngredientPage;
