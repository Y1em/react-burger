import React from "react";
import burgerIngredients from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredients from "../utils/data";

// Данные функции разбивают исходный массив по типам (data.type), создавая отдельные массивы с одним типом.
// Теперь если в меню появится новый тип, он автоматически появится в разделе "Новинки" :D

function getTypes(data) {
  const types = Array.from(data, (item) => item.type).sort();
  for (let i = 0; i < types.length; i = i + 1) {
    while (types[i] === types[i + 1]) {
      types.splice(i, 1);
    }
  }
  return types;
}

function getOneTypeArr(data, type) {
  const arr = [];
  data.forEach((item) => {
    if (item.type === type) {
      arr.push(item);
    }
  });
  return arr;
}

function sortByTypes(data) {
  const arr = [];
  const types = getTypes(data);
  types.forEach((type) => {
    arr.push(getOneTypeArr(data, type));
  });
  return arr;
}

const newData = sortByTypes(ingredients);

function getTitle(arr) {
  if (arr[0].type === "bun") {
    return "Булки";
  } else if (arr[0].type === "main") {
    return "Начинки";
  } else if (arr[0].type === "sauce") {
    return "Соусы";
  } else {
    return "Новинки";
  }
}

const ingredientsArr = [];

class Item extends React.Component {
  state = {
    display: false,
    count: 0,
  };

/*   handleCounter = (value) => {
    if (this.props.type === "bun") {
      this.setState({
        display: true,
        count: 1,
      });
    } else {
      this.setState({
        display: true,
        count: this.state.count + 1,
      });
    }

    ingredientsArr.push(this.props);
    console.log(value)
  }; */

  render() {
    return (
      <li className={burgerIngredients.item} >
        <div
          className={
            this.state.display
              ? `${burgerIngredients.counter} ${burgerIngredients.counter_active}`
              : `${burgerIngredients.counter}`
          }
        >
          <Counter count={this.state.count} size="default" />
        </div>
        <img src={this.props.image} className={`ml-4 mr-4`} />
        <div className={`mt-1 mb-1 ${burgerIngredients.price}`}>
          <p className={`mr-1 text text_type_digits-default`}>
            {this.props.price}
          </p>
          <CurrencyIcon />
        </div>
        <p className={`${burgerIngredients.name}`}>{this.props.name}</p>
      </li>
    );
  }
}

const Subcontainer = ({ arr }) => {
  const [current, setCurrent] = React.useState(false);
  function toggle() {
    setCurrent(current === true ? false : true);
  };

  return (
    <ul className={`pl-4 pr-2 ${burgerIngredients.subcontainer}`} >
      {arr.map((item) => (
        <Item {...item} key={item._id} onItemClick={toggle} />
      ))}
    </ul>
  );
};

const Container = ({ arr }) => {

  return (
    <>
      {arr.map((sortedArr, index) => (
        <div key={index} className={`pt-10 ${burgerIngredients.container}`}>
          <h3
            className={`text text_type_main-medium mb-6 ${burgerIngredients.container__title}`}
          >
            {getTitle(sortedArr)}
          </h3>
          <Subcontainer arr={sortedArr} />
        </div>
      ))}
    </>
  );
};

const Tabs = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={burgerIngredients.tabs}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Начинки
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Соусы
      </Tab>
    </div>
  );
};

class BurgerIngredients extends React.Component {
  state = {
    active: false,
  };

  handleTab = (value) => {
    this.setState({ active: value });
  };

  render() {
    return (
      <section className={`mr-10 ${burgerIngredients.section}`}>
        <nav className={`${burgerIngredients.header}`}>
          <h2
            className={`pt-10 pb-5 text text_type_main-large ${burgerIngredients.title}`}
          >
            Соберите бургер
          </h2>
          <Tabs />
        </nav>
        <div className={`${burgerIngredients.menu}`}>
          <Container arr={newData} />
        </div>
      </section>
    );
  }
}

export default BurgerIngredients;
