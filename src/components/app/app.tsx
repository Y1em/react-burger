import React from "react";
import Style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-datails/order-datails";
import { getData } from "../utils/api";

function App() {

  const [visibleIng, setVisibleIng] = React.useState(false);
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [data, setData] = React.useState([])


  React.useEffect(() => {
    getData()
    .then((data) => {
      setData(data.data);
    })
    .catch((err) => console.log(err));
  }, []);


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
    <IngredientDetails obj={currentItem} closePopup={handleCloseIng} />
  );

  const modalOrder = (
    <OrderDetails closePopup={handleCloseOrder} />
  )

  return (
    <div className={Style.app}>
      <AppHeader />
      <main className={Style.main}>
        <BurgerIngredients array={data} toApp={handleOpenIng} />
        <BurgerConstructor array={data} toApp={handleOpenOrder} />
      </main>
      {visibleIng && modalIng}
      {visibleOrder && modalOrder}
    </div>
  );
}

export default App;
