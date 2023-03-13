import React from "react";
import Style from "./forgot-password.module.css";
import AppHeader from "../components/app-header/app-header";
import { FeedItem } from "../components/feed-item/feed-item";
import {
  EmailInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from 'react-router-dom';
import { restorePassword } from "../components/utils/api";
import { emailRegex, resetPath, loginPath } from "../components/utils/const";
import { useDispatch } from "react-redux";
import { PASSWORD_REQUEST_SUCCSES } from "../services/actions/auth";



function FeedPage() {

  const order1 =   {
    "_id": "640e72cc936b17001be68bd6",
    "ingredients": [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733cc",
        "60d3b41abdacab0026a733cf",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733d2",
        "60d3b41abdacab0026a733d3"
    ],
    "status": "done",
    "name": "Краторный spicy space антарианский традиционный-галактический бургер",
    "createdAt": "2023-03-13T00:48:12.434Z",
    "updatedAt": "2023-03-13T00:48:12.918Z",
    "number": 43591
}

const order2 =   {
  "_id": "640e72cc936b17001be68bd6",
  "ingredients": [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733cd",
      "60d3b41abdacab0026a733ce",
      "60d3b41abdacab0026a733cc",
      "60d3b41abdacab0026a733cf",
      "60d3b41abdacab0026a733d2",
      "60d3b41abdacab0026a733d3"
  ],
  "status": "done",
  "name": "Краторный spicy space антарианский традиционный-галактический бургер",
  "createdAt": "2023-03-13T12:48:12.434Z",
  "updatedAt": "2023-03-13T12:48:12.918Z",
  "number": 43595
}



  return (
    <div>
      <AppHeader />
      <h1 className="text text_type_main-medium mt-10">
        Лента заказов
      </h1>
      <FeedItem
        order={order1}
        type="feed"
      />
      <FeedItem
        type="orders"
        order={order2}
      />
    </div>
  );
}

export default FeedPage;
