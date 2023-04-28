import React, { FunctionComponent } from "react";
import burgerConstructor from "./constructor-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { isBun, setBunType, addName } from "../../utils/utils";
import {
  DELETE_ITEM,
  SET_TOTAL_PRICE,
  MOVE_ITEM,
} from "../../services/actions/burger-constructor";
import { DECREASE_COUNTER } from "../../services/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { useDrop, useDrag } from "react-dnd";
import {
  TIngredient,
  TConstructorItemState,
  TConstructorItem,
} from "../../utils/types";

const ConstructorItem: FunctionComponent<TConstructorItem> = ({
  ingredient,
  position,
  index,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.ingredientsApiReducer.items);
  const [state, setState] = React.useState<TConstructorItemState>({
    name: ingredient.name,
    price: ingredient.price,
    thumbnail: ingredient.image_mobile,
    type: undefined,
    isLocked: undefined,
  });

  const ref = React.useRef<HTMLLIElement>(null);

  function moveConstructorItem(item: TIngredient) {
    if (index && item.uuid) {
      dispatch({
        type: MOVE_ITEM,
        id: item.uuid,
        index: index,
      });
    }
  }

  const [{ isHover }, drop]: any = useDrop<TIngredient>({
    accept: "constructorItems",
    collect: (monitor) => ({
      item: monitor.getItem(),
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      moveConstructorItem(itemId);
    },
  });

  const padding = isHover ? "96px 0 0 0" : "0";

  const [{ opacity }, drag] = useDrag({
    type: "constructorItems",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  drag(drop(ref));

  React.useMemo(() => {
    if (position) {
      setState({
        ...state,
        isLocked: isBun(ingredient),
        type: setBunType(position),
      });
    }
  }, [ingredient]); // eslint-disable-line

  const onDelete = () => {
    dispatch({
      type: DELETE_ITEM,
      id: ingredient._id,
    });
    dispatch({
      type: SET_TOTAL_PRICE,
    });
    dispatch({
      type: DECREASE_COUNTER,
      id: ingredient._id,
      items: data,
    });
  };

  return (
    <li
      className={`mb-4 mr-4 card ${burgerConstructor.item}`}
      ref={ingredient.type === "bun" ? null : ref}
      style={{ opacity, padding }}
      id={`${index}`}
    >
      {state.type === undefined && <DragIcon type={"primary"} />}
      <ConstructorElement
        type={state.type}
        isLocked={state.isLocked}
        text={`${state.name} ${addName(state.type)}`}
        price={state.price}
        thumbnail={state.thumbnail}
        handleClose={onDelete}
      />
    </li>
  );
};

export { ConstructorItem };
