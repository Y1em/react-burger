import { baseOffset } from './const.js'

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

function update(updateToken, refreshToken, request, action, user = {name: '', email: ''}) {
  updateToken(refreshToken)
  .then((res) => {
    if (res && res.success) {
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('accessToken', res.accessToken);
      request(res.accessToken, user)
      .then((res) => {
        if (res && res.success) {
          action();
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })
  .catch((err) => {
    console.log(err);
  })
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
  update
};
