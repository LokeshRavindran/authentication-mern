export const sortObjectOnParticularStringKey = async (dataArray, key) => {
  const sortedData = dataArray.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedData;
};
