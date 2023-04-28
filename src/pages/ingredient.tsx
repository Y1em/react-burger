import { FunctionComponent } from "react";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";
import { getIngredient, getObj } from "../utils/utils"
import { TIngredientPageProps } from "../utils/types";
import { useLocation } from "react-router-dom";

const IngredientPage: FunctionComponent<TIngredientPageProps> = ({ id }) => {

  const data = getObj("ingredients");
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
    return <></>
  }

};

export default IngredientPage;
