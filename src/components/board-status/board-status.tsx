import { FunctionComponent } from "react";
import style from "./board-status.module.css";
import { findUserOrders } from "../../utils/utils";
import { TBoardStatusProps } from "../../utils/types";

const BoardStatus: FunctionComponent<TBoardStatusProps> = ({
  status,
  orders,
}) => {
  return (
    <div className={`${style.container}`}>
      <h3 className="text text_type_main-medium mb-6">
        {status === "done" ? "Готовы:" : "В работе:"}
      </h3>
      <ul className={`${style.numbers}`}>
        {findUserOrders(status, orders).map((number) => {
          return (
            <li
              key={number}
              className={
                status === "done"
                  ? `text text_type_digits-default ${style.number} ${style.number_done}`
                  : `text text_type_digits-default ${style.number}`
              }
            >
              {number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { BoardStatus };
