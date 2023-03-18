import style from "./board-status.module.css";
import { findUserOrders } from "../utils/utils";
import PropTypes from "prop-types";

const BoardStatus = ({ status, orders }) => {
  return (
    <div className={`${style.container}`} >
      <h3 className="text text_type_main-medium mb-6" >
        {status === "done" ? "Готовы:" : "В работе:"}
      </h3>
      <ul className={`${style.numbers}`} >
        {
          findUserOrders(status, orders).map((number) => {
            return (
              <li
                key={number}
                className={status === "done" ? `text text_type_digits-default ${style.number} ${style.number_done}` : `text text_type_digits-default ${style.number}`}
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
  status: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
};
