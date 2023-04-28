import React, { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../services/hooks/hooks";
import { FeedItem } from "../components/feed-item/feed-item";
import { BoardStatus } from "../components/board-status/board-status";
import style from "./feed.module.css";
import { ACTIVE } from "../services/actions/app-header";
import { Outlet } from "react-router-dom";
import { WS_FEED_CLOSE, WS_FEED_START } from "../services/actions/ws-feed";
import { getObj } from "../utils/utils";

const FeedPage: FunctionComponent = () => {
  const data = useAppSelector((store) => store.wsFeedReducer.data);
  const ingredients = useAppSelector((store) => store.ingredientsApiReducer.items);
  const savedData = getObj("ingredients");

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch({
      type: ACTIVE,
      active: window.location.pathname,
    });
  }, []); // eslint-disable-line

  React.useEffect(
    () => {
      dispatch({
        type: WS_FEED_START,
        payload: "/all",
      });

      return () => {
        dispatch({
          type: WS_FEED_CLOSE
        })
      }
    },
    [] // eslint-disable-line
  );

  React.useEffect(() => {
    if (!savedData) {
      localStorage.setItem("ingredients", JSON.stringify(ingredients));
    }
  }, [savedData]); // eslint-disable-line

  return (
    <div>
      {data?.orders ? (
        <main className={style.main}>
          <section>
            <h1 className="text text_type_main-medium mt-10 mb-5">
              Лента заказов
            </h1>
            <div className={style.container}>
              {data.orders.map((item) => {
                return <FeedItem order={item} type="feed" key={item._id} />;
              })}
            </div>
          </section>
          <section className={`${style.board} mt-25 ml-15`}>
            <div className={`${style.status}`}>
              <BoardStatus orders={data.orders} status="done" />
              <BoardStatus orders={data.orders} status="pending" />
            </div>
            <p className={`${style.text} text text_type_main-medium mt-15`}>
              Выполнено за все время:
            </p>
            <p className={`${style.total} text text_type_digits-large`}>
              {new Intl.NumberFormat("ru-RU").format(data.total)}
            </p>
            <p className={`${style.text} text text_type_main-medium mt-15`}>
              Выполнено за сегодня:
            </p>
            <p className={`${style.total} text text_type_digits-large`}>
              {data.totalToday}
            </p>
          </section>
        </main>
      ) : (
        ""
      )}
      <Outlet />
    </div>
  );
};

export default FeedPage;
