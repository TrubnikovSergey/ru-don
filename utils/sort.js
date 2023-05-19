function sortTitleASC(a, b) {
  if (a.title < b.title) {
    return -1;
  } else {
    return 1;
  }
}
function sortTitleDESC(a, b) {
  if (a.title < b.title) {
    return 1;
  } else {
    return -1;
  }
}

function sortPriceASC(a, b) {
  if (a.price < b.price) {
    return -1;
  } else {
    return 1;
  }
}
function sortPriceDESC(a, b) {
  if (a.price < b.price) {
    return 1;
  } else {
    return -1;
  }
}

export function sortGoods(list, kindSort) {
  const [type, kind] = kindSort.split(" ");
  const newList = [...list];

  if (type === "title") {
    if (kind === "asc") {
      newList.sort(sortTitleASC);
    } else {
      newList.sort(sortTitleDESC);
    }
  } else if (type === "price") {
    if (kind === "asc") {
      newList.sort(sortPriceASC);
    } else {
      newList.sort(sortPriceDESC);
    }
  }

  return newList;
}
