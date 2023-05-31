export const calculatePaginateRange = (currentPage, paginationSize, countPages) => {
  let remainderDiv = 0;
  let integerDiv = 0;
  let integerDiv1 = 0;
  let start = 0;
  let calcEnd = 0;
  let minEnd = 0;
  let end = 0;

  if (countPages > paginationSize) {
    remainderDiv = currentPage % paginationSize;
    integerDiv = Math.floor(currentPage / paginationSize);
    integerDiv1 = remainderDiv > 0 ? integerDiv : integerDiv - 1;
    start = integerDiv1 * paginationSize + 1;
    calcEnd = start + paginationSize;
    minEnd = Math.min(calcEnd, countPages);
    end = start === minEnd ? minEnd + 1 : minEnd;
  } else {
    start = 1;
    end = countPages + 1;
  }

  return { start, end };
};
