import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={Style.app}>
      <AppHeader />
      <main className={Style.main}>
        <DndProvider backend={HTML5Backend}> {/* Если убрать провайдер ДНД не будет работать */}
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
