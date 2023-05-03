import React, { FunctionComponent } from "react";
import { useAppDispatch } from "../services/hooks/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Style from "./homepage.module.css";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { Outlet } from "react-router-dom";
import { ACTIVE } from "../services/actions/app-header";

const HomePage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch({
      type: ACTIVE,
      active: window.location.pathname,
    });
  }, []); // eslint-disable-line

  return (
    <div className={Style.app}>
      <main className={Style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      <Outlet />
    </div>
  );
};

export { HomePage };
