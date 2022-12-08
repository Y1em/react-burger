import React from "react";
import { useDispatch, useSelector } from "react-redux";
import burgerIngredients from "./burger-ingredients.module.css";
import { Modal } from "../modal/modal";
import { Tabs } from "../tabs/tabs";
import { IngredientContainer } from "../ingredient-container/ingredient-container";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ingredientsTitle } from "../utils/const";
import { sortByTypes, handleScrollTop, getScrollLimits } from "../utils/utils";
import { getItems } from "../../services/actions/ingredients.js";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.ingredients.items);
  const scrollContainerRef = React.useRef(null);
  const currentItem = useSelector((store) => store.ingredients.currentItem);
  const [currentTab, setCurrentTab] = React.useState("one");
  const [scrollTop, setScrollTop] = React.useState(0);

  function handleSetTab(event) {
    setCurrentTab(event);
    setScrollTop(handleScrollTop(event));
  }

  React.useEffect(
    () => {
      scrollContainerRef.current.scrollTop = scrollTop;
    },
    [scrollTop] // eslint-disable-line
  );

  React.useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  function handleScroll(event) {
    const limits = getScrollLimits(scrollContainerRef.current.children);
    setScrollTop(event.currentTarget.scrollTop);
    if (event.currentTarget.scrollTop <= 0) {
      setCurrentTab("one");
    } else if (
      event.currentTarget.scrollTop >= limits[1] &&
      event.currentTarget.scrollTop < limits[2]
    ) {
      setCurrentTab("two");
    } else if (event.currentTarget.scrollTop >= limits[2]) {
      setCurrentTab("three");
    }
  }

  React.useEffect(() => {
    if (scrollContainerRef) {
      scrollContainerRef.scrollTop = scrollTop;
    }
  }, [scrollTop]); // eslint-disable-line

  if (data === null) {
    return <section className={`mr-10 ${burgerIngredients.section}`}></section>;
  } else {
    return (
      <section className={`mr-10 ${burgerIngredients.section}`}>
        <nav className={`${burgerIngredients.header}`}>
          <h2
            className={`pt-10 pb-5 text text_type_main-large ${burgerIngredients.title}`}
          >
            Соберите бургер
          </h2>
          <Tabs currentTab={currentTab} setTab={handleSetTab} />
        </nav>
        <div
          className={`${burgerIngredients.menu}`}
          onScroll={handleScroll}
          ref={scrollContainerRef}
        >
          <IngredientContainer ingredients={sortByTypes(data)} />
        </div>
        {currentItem && (
          <Modal title={ingredientsTitle}>
            <IngredientDetails obj={currentItem} />
          </Modal>
        )}
      </section>
    );
  }
};

export { BurgerIngredients };
