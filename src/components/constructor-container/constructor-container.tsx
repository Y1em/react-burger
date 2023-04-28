import { FunctionComponent } from "react";
import { TIngredient, TConstructuonContainer } from "../../utils/types";
import burgerConstructor from "./constructor-container.module.css";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { isBun, hasBun } from "../../utils/utils";
import { bunMessage } from "../../utils/const";
import {
  SET_BUN,
  INCREASE_COUNTER,
} from "../../services/actions/burger-ingredients";
import {
  SET_TOTAL_PRICE,
  ADD_BUN,
  ADD_MAIN,
} from "../../services/actions/burger-constructor";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { useDrop } from "react-dnd";

const ConstructorContainer: FunctionComponent<TConstructuonContainer> = ({
  mainList,
  bunList,
  message,
  handleSetMessage,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.ingredientsApiReducer.items);
  const moveItem = (item: TIngredient) => {
    if (!isBun(item)) {
      if (hasBun(bunList)) {
        dispatch({
          type: ADD_MAIN,
          id: item._id,
          items: data,
        });
      } else {
        handleSetMessage(bunMessage);
      }
    } else {
      dispatch({
        type: SET_BUN,
        id: item._id,
        ingredientType: item.type,
      });
      dispatch({
        type: ADD_BUN,
        item: item,
      });
    }
    dispatch({
      type: INCREASE_COUNTER,
      id: item._id,
      items: data,
    });
    dispatch({
      type: SET_TOTAL_PRICE,
    });
  };

  const [, dropTarget] = useDrop<TIngredient>({
    accept: "items",
    collect: (monitor) => ({
      item: monitor.getItem(),
    }),
    drop(itemId) {
      moveItem(itemId);
    },
  });

  if (bunList.length === 0) {
    return (
      <ul
        className={`${burgerConstructor.container} ${burgerConstructor.container_empty}`}
        ref={dropTarget}
      >
        <li className={"text text_type_main-medium"}>{message}</li>
      </ul>
    );
  }
  return (
    <ul className={`${burgerConstructor.container}`} ref={dropTarget}>
      <ConstructorItem
        ingredient={bunList[0]}
        position={"first"}
        key={`${bunList[0]._id}-top`}
      />
      <ul className={`mb-4 ${burgerConstructor.ingredients__container}`}>
        {mainList.map((obj, index) => {
          return (
            <ConstructorItem
              ingredient={obj}
              key={`${obj._id}-${index}`}
              index={index}
            />
          );
        })}
      </ul>
      <ConstructorItem
        ingredient={bunList[0]}
        position={"last"}
        key={`${bunList[0]._id}-bottom`}
      />
    </ul>
  );
};

export { ConstructorContainer };
