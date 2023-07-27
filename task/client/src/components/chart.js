// client/src/components/Chart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch initial data from the back-end API
    axios.get("/api/data").then((response) => {
      setData(response.data);
    });

    // Set up WebSocket connection
    const socket = io("http://localhost:3001");

    // Listen for real-time data updates from the back-end
    socket.on("newData", (newData) => {
      setData((prevData) => [...prevData, newData]);
    });
  }, []);

  const chartData = {
    labels: data.map((item) => item.timestamp),
    datasets: [
      {
        label: "Data Value",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;
