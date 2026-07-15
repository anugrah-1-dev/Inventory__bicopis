import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PageProps } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const numberFormat = (number: number, decimals = 0, decPoint = ".", thousandsSep = ",") => {
  let n = !isFinite(+number) ? 0 : +number;
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  let sep = thousandsSep;
  let dec = decPoint;
  let s: string[] = [];
  const toFixedFix = (n: number, prec: number) => {
    const k = Math.pow(10, prec);
    return "" + Math.round(n * k) / k;
  };

  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

interface ChartProps extends PageProps {
  earnings: number[];
  expenses: number[];
}

const AreaChart: React.FC<ChartProps> = ({ earnings, expenses }) => {

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Barang Masuk",
        data: earnings,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        fill: true,
      },
      {
        label: "Barang Keluar",
        data: expenses,
        backgroundColor: "rgba(255, 99, 132, 0.05)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.dataset.label}: Rp.${numberFormat(tooltipItem.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (value: any) {
            return `Rp.${numberFormat(value)}`;
          },
        },
        grid: {
          color: "rgb(234, 236, 244)",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;
