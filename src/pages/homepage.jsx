import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Style from "./homepage.module.css";
import AppHeader from "../components/app-header/app-header";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { Outlet } from 'react-router-dom';

function Homepage() {
  return (
    <div className={Style.app}>
      <AppHeader />
      <main className={Style.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      <Outlet />
    </div>
  )
}

export { Homepage };
