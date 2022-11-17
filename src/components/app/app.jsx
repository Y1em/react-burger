import React from "react";
import Style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { OrderDetails } from "../order-datails/order-datails";
import { getData, getOrder } from "../utils/api";
import { Modal } from "../modal/modal";
import {
  dataContext,
  orderContext,
  totalPriceContext,
} from "../../services/appContext";
import { getIds } from "../utils/utils";
import { ingredientsTitle } from "../utils/const";

const totalPriceInitialState = { totalPrice: 0 };
const totalPriceReducer = (state, action) => {
  if (action.type === "SET") {
    return { totalPrice: action.total };
  } else if (action.type === "RESET") {
    return totalPriceInitialState;
  } else {
    throw new Error(`Wrong type of action: ${action.type}`);
  }
};

function App() {
  const [visibleIng, setVisibleIng] = React.useState(false);
  const [visibleOrder, setVisibleOrder] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [order, setOrder] = React.useState({
    name: "",
    number: "...",
  });

  const [totalPriceState, totalPriceDispatcher] = React.useReducer(
    totalPriceReducer,
    totalPriceInitialState,
    undefined
  );

  React.useEffect(() => {
    getData()
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOpenIng = React.useCallback((obj) => {
    setVisibleIng(true);
    setCurrentItem(obj);
  }, []);

  const handleOpenOrder = React.useCallback(() => {
    setVisibleOrder(true);
    getOrder(getIds(data))
      .then((data) => {
        setOrder({ name: data.name, number: data.order.number.toString() });
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleCloseIng = () => {
    setVisibleIng(false);
  };

  const handleCloseOrder = () => {
    setVisibleOrder(false);
    setOrder({ name: "", number: "..." });
  };

  const modalIng = (
    <Modal title={ingredientsTitle} handleClose={handleCloseIng}>
      <IngredientDetails obj={currentItem} />
    </Modal>
  );

  const modalOrder = (
    <Modal title={"..."} handleClose={handleCloseOrder}>
      <OrderDetails />
    </Modal>
  );

  return (
    <div className={Style.app}>
      <dataContext.Provider value={{ data, setData }}>
        <orderContext.Provider value={{ order, setOrder }}>
          <totalPriceContext.Provider
            value={{ totalPriceState, totalPriceDispatcher }}
          >
            <AppHeader />
            <main className={Style.main}>
              <BurgerIngredients toApp={handleOpenIng} />
              <BurgerConstructor toApp={handleOpenOrder} />
            </main>
            {visibleIng && modalIng}
            {visibleOrder && modalOrder}
          </totalPriceContext.Provider>
        </orderContext.Provider>
      </dataContext.Provider>
    </div>
  );
}

export default App;
