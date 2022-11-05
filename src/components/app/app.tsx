import React from "react";
import Style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-datails/order-datails";

function App() {

  const [visibleIng, setVisibleIng] = React.useState(false);
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);

  const handleOpenIng = React.useCallback(
    (obj:any) => {
      setVisibleIng(true);
      setCurrentItem(obj);
    },
    [currentItem]
  );

  const handleOpenOrder = React.useCallback(
    () => {
      setVisibleOrder(true);
    },
    []
  )

  const handleCloseIng = () => {
    setVisibleIng(false);
  }

  const handleCloseOrder = () => {
    setVisibleOrder(false);
  }

  const modalIng = (
    <IngredientDetails obj={currentItem} toModalIng={handleCloseIng} />
  );

  const modalOrder = (
    <OrderDetails toModalOrder={handleCloseOrder} />
  )

  return (
    <div className={Style.app}>
      <AppHeader />
      <main className={Style.main}>
        <BurgerIngredients />
        <BurgerConstructor toAppIng={handleOpenIng} toAppOrder={handleOpenOrder} />
      </main>
      {visibleIng && modalIng}
      {visibleOrder && modalOrder}
    </div>
  );
}

export default App;
