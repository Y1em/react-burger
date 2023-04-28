import React, { UIEvent, FunctionComponent } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import burgerIngredients from "./burger-ingredients.module.css";
import { Tabs } from "../tabs/tabs";
import { IngredientContainer } from "../ingredient-container/ingredient-container";
import { sortByTypes, handleScrollTop, getScrollLimits } from "../../utils/utils";

const BurgerIngredients: FunctionComponent = () => {
  const data = useAppSelector((store) => store.ingredientsApiReducer.items);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = React.useState<"one" | "two" | "three">(
    "one"
  );
  const [scrollTop, setScrollTop] = React.useState<number>(0);

  function handleSetTab(event: "one" | "two" | "three") {
    setCurrentTab(event);
    setScrollTop(handleScrollTop(event));
  }

  React.useEffect(
    () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollTop;
      }
    },
    [scrollTop] // eslint-disable-line
  );

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    let limits: number[] = [];
    if (scrollContainerRef.current) {
      limits = getScrollLimits(scrollContainerRef.current.children);
    }
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
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]); // eslint-disable-line

  if (data.length === 0) {
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
      </section>
    );
  }
};

export { BurgerIngredients };
