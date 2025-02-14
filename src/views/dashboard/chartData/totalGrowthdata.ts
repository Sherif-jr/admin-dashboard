interface ChartData {
  height: number;
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
}

const chartData: ChartData = {
  height: 480,
  //   type: "bar",
  options: {
    chart: {
      id: "bar-chart",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      offsetX: 20,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
  },
  series: [
    {
      name: "Users",
      type: "column",
      data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75],
    },
    {
      name: "Events",
      type: "line",
      data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75],
    },
  ],
};

interface ChartInput {
  name: string;
  type: "line" | "column";
  data: number[];
}

const setChartData = (chartInputs: ChartInput[], options?: object) => {
  chartData.series = chartInputs;
  chartData.options = { ...chartData.options, ...options };
  return chartData;
};
export default chartData;
export { setChartData };
