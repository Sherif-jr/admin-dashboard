import Chart from "react-apexcharts";
import { Card } from "@mui/material";
import { setChartData } from "./chartData/totalGrowthdata";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../interfaces/User.interface";
import getPerMonthData from "../../util/getPerMonthData";
import { getAllUsers } from "../../util/query/httpFunctions/userHttpFunctions";
import { getAllEvents } from "../../util/query/httpFunctions/eventHttpFunctions";

const Dashboard = () => {
  const { data: users } = useQuery<User[]>({
    queryKey: ["users", "all"],
    queryFn: getAllUsers,
    initialData: [],
  });
  const { data: events } = useQuery<Event[]>({
    queryKey: ["events", "all"],
    queryFn: getAllEvents,
    initialData: [],
  });

  console.log(getPerMonthData(users, "createdAt"));

  const chartData = setChartData(
    [
      {
        name: "Users",
        type: "line",
        data: getPerMonthData(users, "createdAt"),
      },
      {
        name: "Events",
        type: "line",
        data: getPerMonthData(events, "createdAt"),
      },
    ]
    // {
    //   stroke: { curve: "smooth" },
    // }
  );
  return (
    <Card sx={{ p: 3 }}>
      <Chart {...chartData} />
    </Card>
  );
};

export default Dashboard;
