import style from "./board-status.module.css";
import { findUserOrders } from "../utils/utils";
import PropTypes from "prop-types";

const BoardStatus = ({ name, orders }) => {
  return (
    <div className={`${style.container}`} >
      <h3 className="text text_type_main-medium mb-6" >
        {name === "done" ? "Готовы:" : "В работе:"}
      </h3>
      <ul className={`${style.numbers}`} >
        {
          findUserOrders(name, orders).map((number) => {
            return (
              <li
                key={number}
                className={name === "done" ? `text text_type_digits-default ${style.number} ${style.number_done}` : `text text_type_digits-default ${style.number}`}
              >
                {number}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export { BoardStatus };

BoardStatus.propTypes = {
  name: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
};
