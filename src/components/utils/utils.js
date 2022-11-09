function isBun(obj) {
  if (obj.type === "bun") {
    return true;
  } else {
    return false;
  }
};

function extractBun(arr) {
  return arr.find((el) => isBun(el));
};

function deleteBun(arr) {
  const newArr = JSON.parse(JSON.stringify(arr));
  const bun = newArr.find((el) => isBun(el));
  newArr.splice(newArr.indexOf(bun), 1);
  return newArr;
};

function getConstructorList(arr) {
  if (arr.length !== 0) {
    const newArr = JSON.parse(JSON.stringify(arr));
  const bun = extractBun(newArr);
  const arrWithoutBun = newArr.filter((item) => !isBun(item));
  return arrWithoutBun.concat(bun);
  } else {
    return []
  }

};

function getTotal(arr) {
  if (arr.length !== 0) {
    const doubledPriceBunArr = Array.from(arr, (el) => {
      if (isBun(el)) {
        return el.price * 2;
      } else {
        return el.price;
      }
    });
    return doubledPriceBunArr.reduce((prev, res) => {
      return prev + res;
    }, 0);
  }
};

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
};

function isBunInArr(arr) {
  return arr.some((item) => isBun(item));
};

function getTypes(data) {
  const types = Array.from(data, (item) => item.type).sort();
  for (let i = 0; i < types.length; i = i + 1) {
    while (types[i] === types[i + 1]) {
      types.splice(i, 1);
    }
  }
  return types;
};

function getOneTypeArr(data, type) {
  const arr = [];
  data.forEach((item) => {
    if (item.type === type) {
      arr.push(item);
    }
  });
  return arr;
};

function sortByTypes(data) {
  const arr = [];
  const types = getTypes(data);
  types.forEach((type) => {
    arr.push(getOneTypeArr(data, type));
  });
  return arr;
};

const modalRoot = document.getElementById("react-modals");

export {
  extractBun,
  deleteBun,
  isBun,
  getTotal,
  getTitle,
  isBunInArr,
  sortByTypes,
  getOneTypeArr,
  getTypes,
  getConstructorList,
  modalRoot,
};
