import React from "react";
import { useDispatch } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import { FeedItem } from "../components/feed-item/feed-item";
import { BoardStatus } from "../components/board-status/board-status";
import { useSelector } from "react-redux";
import style from "./feed.module.css";
import { ACTIVE } from "../services/actions/app-header";
import { Outlet } from "react-router-dom";
import { WS_CONNECTION_START } from "../services/actions/ws-actions";

function FeedPage() {

  const data = useSelector(((store) => store.wsReducer.data));
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: ACTIVE,
      active: window.location.pathname,
    });
  }, []); // eslint-disable-line

  React.useEffect(
    () => {
      dispatch({
        type: WS_CONNECTION_START,
        request: "allOrders",
       });
    },
    [] // eslint-disable-line
  );

  return (
    <div>
      <AppHeader />
        { data.orders ?
          <main className={style.main}>
          <section>
            <h1 className="text text_type_main-medium mt-10 mb-5">
              Лента заказов
            </h1>
            <div className={style.container}>
              {
                data.orders.map((item) => {
                  return (
                    <FeedItem order={item} type="feed" key={item._id} />
                  )
                })
              }
            </div>
          </section>
          <section className={`${style.board} mt-25 ml-15`} >
            <div className={`${style.status}`}>
              <BoardStatus orders={data.orders} status="done" />
              <BoardStatus orders={data.orders} status="pending" />
            </div>
            <p className={`${style.text} text text_type_main-medium mt-15`} >
              Выполнено за все время:
            </p>
            <p className={`${style.total} text text_type_digits-large`} >
              {(new Intl.NumberFormat('ru-RU').format(data.total))}
            </p>
            <p className={`${style.text} text text_type_main-medium mt-15`}>
              Выполнено за сегодня:
            </p>
            <p className={`${style.total} text text_type_digits-large`} >
              {data.totalToday}
            </p>
          </section>
        </main> :
        ""
        }
      <Outlet />
    </div>
  );
}

export default FeedPage;
