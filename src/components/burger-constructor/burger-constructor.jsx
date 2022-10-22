import React from "react";
import PropTypes from 'prop-types';
import burgerConstructor from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredients from "../utils/data";

const itemPropTypes = PropTypes.shape({
  "_id": PropTypes.string.isRequired,
  "name": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "image_mobile": PropTypes.string.isRequired,
});

function isBun(obj) {
  if (obj.type === "bun") {
    return true;
  } else {
    return false;
  }
}

function getTotal(arr) {
  const doubledPriceBunArr =  Array.from(arr, el => {
    if (isBun(el)) {
      return el.price*2
    } else {
      return el.price
    }
  });
  return doubledPriceBunArr.reduce((prev, res) => {
    return prev + res
  }, 0)
}

const ConstructorContainer = ({ arr }) => {
  function extractBun(arr) {
    return arr.find((el) => isBun(el)); //Подразумевается что в бургере будет один тип булки, поэтому используем метод find
  }

  function deleteBun(arr) {
    const newArr = JSON.parse(JSON.stringify(arr));
    const bun = newArr.find((el) => isBun(el));
    newArr.splice(newArr.indexOf(bun), 1);
    return newArr;
  }

  return (
    <ul className={`${burgerConstructor.container}`}>
      <Item
        {...extractBun(arr)}
        position={"first"}
        key={`${extractBun(arr)._id}-top`}
      />
      <ul className={`mb-4 ${burgerConstructor.ingredients__container}`}>
        {deleteBun(arr).map((obj) => {
          return <Item {...obj} key={obj._id} />;
        })}
      </ul>
      <Item
        {...extractBun(arr)}
        position={"last"}
        key={`${extractBun(arr)._id}-bottom`}
      />
    </ul>
  );
};

class Item extends React.Component {
  state = {
    name: this.props.name,
    price: this.props.price,
    thumbnail: this.props.image_mobile,
    type: "",
    isLocked: "",
  };

  componentDidMount() {
    this.setBunState();
  }

  setBunState = () => {
    if (this.props.position === "first") {
      this.setState({ type: "top" });
    } else if (this.props.position === "last") {
      this.setState({ type: "bottom" });
    } else {
      this.setState({ type: undefined });
    }
    isBun(this.props)
      ? this.setState({ isLocked: true })
      : this.setState({ isLocked: false });
  };

  addName = () => {
    if (this.state.type === "top") {
      return "(верх)";
    } else if (this.state.type === "bottom") {
      return "(низ)";
    } else {
      return "";
    }
  };

  render() {
    return (
      <li className={`mb-4 mr-4 ${burgerConstructor.item}`}>
        {this.state.type === undefined && <DragIcon />}
        <ConstructorElement
          type={this.state.type}
          isLocked={this.state.isLocked}
          text={`${this.state.name} ${this.addName()}`}
          price={this.state.price}
          thumbnail={this.state.thumbnail}
        />
      </li>
    );
  }
}

class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={`pt-25 pl-4 ${burgerConstructor.section}`}>
        {/* Использовать весь массив только для верстки первого этапа, для второго
        этапа нужно прописать функциональность переноса из ингридиентов в конструктор */}
        <ConstructorContainer arr={ingredients} />
        <div className={`mr-4 mt-10 ${burgerConstructor.bottom}`}>
          <p className={"text text_type_digits-medium mr-2"}>
            {getTotal(ingredients)}
          </p>
          <div className={`mr-10 ${burgerConstructor.icon}`}>
            <CurrencyIcon />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </section>
    );
  }
}

export default BurgerConstructor;


ConstructorContainer.propTypes = {
  arr: PropTypes.arrayOf(itemPropTypes).isRequired
};
Item.propTypes = {itemPropTypes}

