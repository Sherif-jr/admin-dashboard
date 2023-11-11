const getPerMonthData = (data: object[], property: string) => {
  //   const monthCounts: { [month: number]: number } = {};
  const monthCounts: number[] = Array(12).fill(0);

  data.forEach((obj) => {
    const date = new Date(obj[property]);
    const month = date.getMonth();
    monthCounts[month]++;
  });

  // Convert the monthCounts object to an array of counts
  const countsPerMonth = Object.values(monthCounts);
  return countsPerMonth;
};

export default getPerMonthData;
