import {
  baseOffset,
  reLoginTrigger,
  getUserTrigger,
  updateUserTrigger,
  getOrdersTrigger,
} from './const.js';

function isBun(obj) {
  if (obj.type === "bun") {
    return true;
  } else {
    return false;
  }
}

function extractBun(arr) {
  return arr.find((el) => isBun(el));
}

function deleteBun(arr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  const bun = newArr.find((el) => isBun(el));
  newArr.splice(newArr.indexOf(bun), 1);
  return newArr;
}

function getConstructorList(arr) {
  if (arr.length !== 0) {
    const newArr = JSON.parse(JSON.stringify(arr));
    const bun = extractBun(newArr);
    const arrWithoutBun = newArr.filter((item) => !isBun(item));
    return arrWithoutBun.concat(bun);
  } else {
    return [];
  }
}

function getTotal(buns, mains) {
  if (buns.length !== 0) {
    const doubledPriceBun = buns[0].price*2;
    const mainsPrice = mains.reduce((prev, item) => {
      return prev + item.price;
    }, 0);
    return doubledPriceBun + mainsPrice
  } else {
    return 0;
  }
}

function getTitle(arr) {
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

function getTypes(data) {
  const types = Array.from(data, (item) => item.type).sort();
  for (let i = 0; i < types.length; i = i + 1) {
    while (types[i] === types[i + 1]) {
      types.splice(i, 1);
    }
  }
  return types;
}

function getOneTypeArr(data, type) {
  const arr = [];
  data.forEach((item) => {
    if (item.type === type) {
      arr.push(item);
    }
  });
  return arr;
}

function sortByTypes(data) {
  const arr = [];
  const types = getTypes(data);
  types.forEach((type) => {
    arr.push(getOneTypeArr(data, type));
  });
  return arr;
}

function getIds(data) {
  const arr = [];
  const constructorList = getConstructorList(data);
  [extractBun(constructorList)].concat(constructorList).forEach((item) => {
    arr.push(item._id);
  });
  return arr;
}

function hasBun(arr) {
  return arr.some((item) => isBun(item));
}

function deleteItem(arr, actionId) {
  const deletedItem = arr.find((item) => item._id === actionId);
  arr.splice(arr.indexOf(deletedItem), 1);
  return arr;
}

function moveItem(arr, actionId, targetIndex) {
  const deletedItem = arr.find((item) => (item._id === actionId));
  arr.splice(arr.indexOf(deletedItem), 1);
  arr.splice(targetIndex, 0, deletedItem);
  return arr;
}

function handleScrollTop (action) {
  if (action === "one") {
    return 0;
  } else if (action === "two") {
    return 260;
  } else if (action === "three") {
    return 1480;
  }
}

function getScrollLimits (arr) {
  const newArr = Array.from(arr, (item) => item);
  const limits = [];
  newArr.forEach((item, index) => {
    limits.push(item.offsetTop - baseOffset*index)
  })
  return limits;
}

function setBunType(position) {
  if (position === "first") {
    return "top";
  } else if (position === "last") {
    return "bottom";
  } else {
    return undefined;
  }
};

function addName(type) {
  if (type === "top") {
    return "(верх)";
  } else if (type === "bottom") {
    return "(низ)";
  } else {
    return "";
  }
}

function addBun(item, buns) {
  if (hasBun(buns)) {
    const deletedBun = buns.find((element) => isBun(element));
    buns.splice(buns.indexOf(deletedBun, 1));
    buns.push(item);
  } else {
    buns.push(item);
  }
  return buns
}

function getItem(id, items) {
  return items.find((item) =>
    item._id === id ? item : null
  )
}

function update(request, refreshToken, trigger, action, user) {
  request(refreshToken)
  .then((res) => {
    if (res && res.success) {
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('accessToken', res.accessToken);
      if (trigger === getUserTrigger) {
        action(res.accessToken, res.refreshToken);
      } else if (trigger === updateUserTrigger) {
        action(res.accessToken, user, res.refreshToken)
      } else if (trigger === reLoginTrigger) {
        action(res.accessToken, res.refreshToken);
      } else if (trigger === getOrdersTrigger) {
        action()
      }
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

function findItems (ids, objs) {
  const newArr = []
  ids.forEach((id) => {
    newArr.push(objs.find(obj => obj._id === id))
  })
  return newArr
};

function getDay(number) {
  if (number === 0) {
    return "Сегодня"
  } else if (number === 1) {
    return "Вчера"
  } else if ((number > 1) && (number < 5)) {
    return `${number} дня назад`
  } else if ((number > 4) && (number < 21)) {
    return `${number} дней назад`
  }
}

function dateFormat(string) {
  const today = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
  const orderMoscowDay = new Date(string).toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
  const orderDay = today.slice(0, 2) - orderMoscowDay.slice(0, 2);
  const orderMoscowTime = new Date(string).toLocaleTimeString("ru-RU", {timeZone: "Europe/Moscow"});
  const orderTime = orderMoscowTime.slice(0, 5);
  return `${getDay(orderDay)}, ${orderTime} i-GMT+3`
}

function totalPrice(arr) {
  return arr.reduce((prev, item) => {
    return prev + item.price;
  }, 0);
}

function findUserOrders(status, orders) {
  const arr = [];
  orders.forEach((order) => {
    if (status === order.status) {
      arr.push(order.number)
    }
  })
  return arr.slice(0, 10)
}

function getStatus(string) {
  if (string === "done") {
    return "Выполнен"
  } else if (string === "created") {
    return "Создан"
  } else if (string === "pending") {
    return "Готовится"
  }
}

function getQuantity(item, arr) {
  let count = 0;
  arr.forEach((element) => {
    if (element._id === item._id) {
      count = count + 1;
    }
  })
  return count
}

function getOneBunArr(arr) {
  let count = 0;
  arr.forEach((item) => {
    if (item.type === "bun") {
      count = count + 1;
    }
  })
  if (count === 2) {
    return deleteBun(arr)
  } else {
    return arr
  }
}

function shortToken(string) {
  return string.slice(7)
}

function reverseArr(arr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  return newArr.reverse()
}

function getPath(string) {
  const arr = string.split("/");
  const path = arr.splice(1, 1);
  return ("/").concat(path)
}

function getActiveTab(string) {
  const arr = string.split("/");
  return arr.splice(arr.length - 1, 1)[0]
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
  getItem,
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
  getActiveTab
};
