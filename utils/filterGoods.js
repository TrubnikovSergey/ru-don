function filterGoodsBySearchValue(goodsList = [], searchValue = null) {
  return goodsList.filter((item) => {
    const lowerTitle = String(item.title).toLowerCase();
    const lowerDescription = String(item.description).toLowerCase();
    const lowerSearchValue = String(searchValue).toLowerCase();

    return lowerTitle.includes(lowerSearchValue) || lowerDescription.includes(lowerSearchValue);
  });
}
function filterGoodsByCategoryId(goodsList = [], categoryId = null) {
  return goodsList.filter((item) => item.categoryId === categoryId);
}

export { filterGoodsBySearchValue, filterGoodsByCategoryId };
