import {
  baseOffset,
  reLoginTrigger,
  getUserTrigger,
  updateUserTrigger,
  getOrdersTrigger,
} from "./const";

import {
  TIngredient,
  TIngredientArr,
  TOrderArr,
  TUser,
  TResponse,
  TOrder,
} from "./types.js";

function isBun(obj: TIngredient) {
  if (obj.type === "bun") {
    return true;
  } else {
    return false;
  }
}

function extractBun(arr: TIngredientArr) {
  return arr.find((el) => isBun(el));
}

function deleteBun(arr: TIngredientArr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  const bun = newArr.find((el: TIngredient) => isBun(el));
  newArr.splice(newArr.indexOf(bun), 1);
  return newArr;
}

function getConstructorList(arr: TIngredientArr): TIngredientArr {
  if (arr.length !== 0) {
    const newArr: TIngredientArr = JSON.parse(JSON.stringify(arr));
    const bun = extractBun(newArr);
    const arrWithoutBun = newArr.filter((item: TIngredient) => !isBun(item));
    return bun ? arrWithoutBun.concat(bun) : newArr;
  } else {
    return [];
  }
}

function getTotal(buns: TIngredientArr, mains: TIngredientArr) {
  if (buns.length !== 0) {
    const doubledPriceBun = buns[0].price * 2;
    const mainsPrice = mains.reduce((prev, item) => {
      return prev + item.price;
    }, 0);
    return doubledPriceBun + mainsPrice;
  } else {
    return 0;
  }
}

function getTitle(arr: TIngredientArr) {
  if (arr[0].type === "bun") {
    return "Булки";
  } else if (arr[0].type === "main") {
    return "Начинки";
  } else if (arr[0].type === "sauce") {
    return "Соусы";
  } else {
    return "Новинки";
  }
}

function getTypes(data: TIngredientArr) {
  const types = Array.from(data, (item) => item.type).sort();
  for (let i = 0; i < types.length; i = i + 1) {
    while (types[i] === types[i + 1]) {
      types.splice(i, 1);
    }
  }
  return types;
}

function getOneTypeArr(data: TIngredientArr, type: TIngredient["type"]) {
  const arr: TIngredientArr = [];
  data.forEach((item) => {
    if (item.type === type) {
      arr.push(item);
    }
  });
  return arr;
}

function sortByTypes(data: TIngredientArr) {
  const arr: TIngredientArr[] = [];
  const types = getTypes(data);
  types.forEach((type) => {
    arr.push(getOneTypeArr(data, type));
  });
  return arr;
}

function getIds(data: TIngredientArr) {
  const arr: TIngredient["_id"][] = [];
  const constructorList = getConstructorList(data);
  const bun = extractBun(constructorList);
  bun
    ? [bun].concat(constructorList).forEach((item) => {
        arr.push(item._id);
      })
    : constructorList.forEach((item) => {
        arr.push(item._id);
      });
  return arr;
}

function hasBun(arr: TIngredientArr) {
  return arr.some((item) => isBun(item));
}

function deleteItem(arr: TIngredientArr, actionId: TIngredient["_id"]) {
  const deletedItem = arr.find((item) => item._id === actionId);
  if (deletedItem) {
    arr.splice(arr.indexOf(deletedItem), 1);
  }
  return arr;
}

function moveItem(
  arr: TIngredientArr,
  actionId: TIngredient["_id"],
  targetIndex: number
) {
  const deletedItem = arr.find((item) => item._id === actionId);
  if (deletedItem) {
    arr.splice(arr.indexOf(deletedItem), 1);
    arr.splice(targetIndex, 0, deletedItem);
  }
  return arr;
}

function handleScrollTop(action: "one" | "two" | "three"): number {
  let scrollTop = 0;
  if (action === "one") {
    scrollTop = 0;
  } else if (action === "two") {
    scrollTop = 260;
  } else if (action === "three") {
    scrollTop = 1480;
  }
  return scrollTop;
}

function getScrollLimits(arr: HTMLCollection) {
  const newArr: any = Array.from(arr, (item) => item);
  const limits: number[] = [];
  newArr.forEach((item: HTMLDivElement, index: number) => {
    limits.push(item.offsetTop - baseOffset * index);
  });
  return limits;
}

function setBunType(position: string) {
  if (position === "first") {
    return "top";
  } else {
    return "bottom";
  }
}

function addName(type: "top" | "bottom" | undefined) {
  if (type === "top") {
    return "(верх)";
  } else if (type === "bottom") {
    return "(низ)";
  } else {
    return "";
  }
}

function addBun(item: TIngredient, buns: TIngredientArr) {
  if (hasBun(buns)) {
    const deletedBun = buns.find((element) => isBun(element));
    if (deletedBun) {
      buns.splice(buns.indexOf(deletedBun, 1));
      buns.push(item);
    }
  } else {
    buns.push(item);
  }
  return buns;
}

function addMain(arr: TIngredientArr, items: TIngredientArr, id: string) {
  const main = items.find((item) =>
    item._id === id && !isBun(item) ? item : null
  );
  if (main) {
    arr.push(main);
  }
  return arr;
}

function setCounter(arr: TIngredientArr) {
  const newArr: TIngredientArr = JSON.parse(JSON.stringify(arr));
  newArr.forEach((item) => (item.count = 0));
  return newArr;
}

function increaseCounter(arr: TIngredientArr, id: string) {
  arr.find((item) => (item._id === id ? (item.count = item.count + 1) : null));
  return arr;
}

function decreaseCounter(arr: TIngredientArr, id: string) {
  arr.find((item) => (item._id === id ? (item.count = item.count - 1) : null));
  return arr;
}

function resetCounter(arr: TIngredientArr) {
  arr.forEach((item) => (item.count = 0));
  return arr;
}

function getIngredient(
  id: TIngredient["_id"] | undefined,
  items: TIngredientArr
) {
  return items.find((item) => (item._id === id ? item : null));
}

function getOrder(id: TOrder["_id"] | undefined, items: TOrderArr) {
  return items.find((item) => (item._id === id ? item : null));
}

function update(
  request: Function,
  refreshToken: string,
  trigger: string,
  action: Function,
  user?: TUser
) {
  request(refreshToken)
    .then((res: TResponse) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        if (trigger === getUserTrigger) {
          action(res.accessToken, res.refreshToken);
        } else if (trigger === updateUserTrigger) {
          action(res.accessToken, user, res.refreshToken);
        } else if (trigger === reLoginTrigger) {
          action(res.accessToken, res.refreshToken);
        } else if (trigger === getOrdersTrigger) {
          action();
        }
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
}

function findItems(ids: TIngredient["_id"][], objs: TIngredientArr) {
  const newArr: TIngredientArr = [];
  ids.forEach((id) => {
    const item = objs.find((obj) => obj._id === id);
    if (item) {
      newArr.push(item);
    }
  });
  return newArr;
}

function getDay(number: number) {
  if (number === 0) {
    return "Сегодня";
  } else if (number === 1) {
    return "Вчера";
  } else if (number > 1 && number < 5) {
    return `${number} дня назад`;
  } else if (number > 4 && number < 21) {
    return `${number} дней назад`;
  }
}

function dateFormat(data: string) {
  const today = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  const orderMoscowDay = new Date(data).toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  const orderDay =
    Number(today.slice(0, 2)) - Number(orderMoscowDay.slice(0, 2));
  const orderMoscowTime = new Date(data).toLocaleTimeString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  const orderTime = orderMoscowTime.slice(0, 5);
  return `${getDay(orderDay)}, ${orderTime} i-GMT+3`;
}

function totalPrice(arr: TIngredientArr) {
  return arr.reduce((prev, item) => {
    return prev + item.price;
  }, 0);
}

function findUserOrders(status: string, orders: TOrderArr) {
  const arr: number[] = [];
  orders.forEach((order) => {
    if (status === order.status) {
      arr.push(order.number);
    }
  });
  return arr.slice(0, 10);
}

function getStatus(string: string) {
  if (string === "done") {
    return "Выполнен";
  } else if (string === "created") {
    return "Создан";
  } else if (string === "pending") {
    return "Готовится";
  }
}

function getQuantity(item: TIngredient, arr: TIngredientArr) {
  let count = 0;
  arr.forEach((element) => {
    if (element._id === item._id) {
      count = count + 1;
    }
  });
  return count;
}

function getOneBunArr(arr: TIngredientArr): TIngredientArr {
  let count = 0;
  arr.forEach((item) => {
    if (item.type === "bun") {
      count = count + 1;
    }
  });
  if (count === 2) {
    return deleteBun(arr);
  } else {
    return arr;
  }
}

function shortToken(string: string) {
  return string.slice(7);
}

function reverseArr(arr: TOrderArr): TOrderArr {
  const newArr = JSON.parse(JSON.stringify(arr));
  return newArr.reverse();
}

function getPath(string: string) {
  const arr = string.split("/");
  const path = arr.splice(1, 1)[1];
  return "/".concat(path);
}

function getActiveTab(string: string) {
  const arr = string.split("/");
  return arr.splice(arr.length - 1, 1)[0];
}

function getObj(string: string) {
  const savedSrting = localStorage.getItem(string);
  if (savedSrting) {
    return JSON.parse(savedSrting);
  } else {
    return null;
  }
}

function getString(string: string) {
  const savedSrting = localStorage.getItem(string);
  if (savedSrting) {
    return savedSrting;
  } else {
    return null;
  }
}

function getUniqStringArr(arr: TIngredient["_id"][]) {
  const newArr: TIngredient["_id"][] = JSON.parse(JSON.stringify(arr));
  const resArr: TIngredient["_id"][] = [];
  newArr.sort().forEach((item, index, array) => {
    if (item !== array[index + 1]) {
      resArr.push(item)
    }
  })
  return resArr
}

function getId(path: string) {
  return path.slice(path.lastIndexOf("/") + 1)
}

export {
  extractBun,
  deleteBun,
  isBun,
  getTotal,
  getTitle,
  sortByTypes,
  getOneTypeArr,
  getTypes,
  getConstructorList,
  getIds,
  hasBun,
  deleteItem,
  moveItem,
  handleScrollTop,
  getScrollLimits,
  setBunType,
  addName,
  addBun,
  addMain,
  setCounter,
  increaseCounter,
  decreaseCounter,
  resetCounter,
  getIngredient,
  getOrder,
  update,
  findItems,
  dateFormat,
  totalPrice,
  findUserOrders,
  getStatus,
  getQuantity,
  getOneBunArr,
  shortToken,
  reverseArr,
  getPath,
  getActiveTab,
  getObj,
  getString,
  getUniqStringArr,
  getId,
};
