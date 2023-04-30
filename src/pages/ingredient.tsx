import { FunctionComponent } from "react";
import style from "./ingredient.module.css";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { getIngredient } from "../utils/utils"
import { TIngredientPageProps } from "../utils/types";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../services/hooks/hooks";
import { Loader } from "../components/loading/loading";

const IngredientPage: FunctionComponent<TIngredientPageProps> = ({ id }) => {

  const data = useAppSelector((store) => store.ingredientsApiReducer.items);
  const item = getIngredient(id, data);
  const location = useLocation();
  const from = location.state;

  if (item) {
    return (
      <>
        {from === null && <div className={"mb-30"} />}
        <IngredientDetails obj={item} />
      </>
    );
  } else {
    return (
      <div className={style.container}>
        <div className="mb-30"/>
        <Loader />
      </div>
    )
  }

};

export default IngredientPage;
