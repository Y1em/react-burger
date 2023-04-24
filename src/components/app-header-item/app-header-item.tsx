import { FunctionComponent } from "react";
import appHeader from "./app-header-item.module.css";
import { THeaderItemProps } from "../utils/types";

const Item: FunctionComponent<THeaderItemProps> = ({ name, icon, active }) => {
  return (
    <li className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4`}>
      <div // eslint-disable-line
        className={`${appHeader.item} ${active ? appHeader.item_active : ""}`}
      >
        {icon}
        <p className={`pl-2 text text_type_main-default ${appHeader.title}`}>
          {name}
        </p>
      </div>
    </li>
  );
};

export { Item };
