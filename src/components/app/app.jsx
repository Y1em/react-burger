import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-datails/order-datails";
import { Modal } from "../modal/modal";
import { ingredientsTitle } from "../utils/const";
import { useSelector } from 'react-redux';

function App() {
  const visibleIng = useSelector(store => store.ingredients.displayCurrentItem);
  const currentItem = useSelector(store => store.ingredients.currentItem);
  const visibleOrder = useSelector(store => store.ingredients.displayOrder);

  const modalIng = (
    <Modal title={ingredientsTitle} >
      <IngredientDetails obj={currentItem} />
    </Modal>
  );

  const modalOrder = (
    <Modal title={"..."} >
      <OrderDetails />
    </Modal>
  );

  return (
    <div className={Style.app}>
      <AppHeader />
      <main className={Style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {visibleIng && modalIng}
      {visibleOrder && modalOrder}
    </div>
  );
}

export default App;
