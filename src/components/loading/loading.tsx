import { FunctionComponent } from "react";
import style from "./loading.module.css";

const Loader: FunctionComponent = () => {
  return <div className={style.loader}></div>;
};

export { Loader };
