import React from "react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {

    labels: ['Total Jobs Applications', 'Selected', 'Hold'],

    datasets: [
      {
        label: 'Job Statistics',
        data: data, //  props
        backgroundColor: [
          '#01ABE8', // green - total jobs
        //   '#2196f3', // blue - applications
          '#0186C9', // yellow - selected
          '#00639C', // orange - hold
          // '#013B63'  // red - rejected


        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
     maintainAspectRatio: false,
     animation: {
    duration: 1000,      // 1 second duration
    easing: 'easeOutBounce', // Easing style
  },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Job Dashboard Overview',
      }
    }
  };

  return (
    <div className="p-3 mx-3 shadow" style={{ width: '100%', height: '400px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;