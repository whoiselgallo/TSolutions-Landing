import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Enero", "Febrero", "Marzo"],
  datasets: [
    {
      label: "Ventas",
      data: [12, 19, 3],
      backgroundColor: "rgba(75, 192, 192, 0.5)"
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Ventas trimestrales" }
  }
};

export default function AnalyticsChart() {
  return <Bar data={data} options={options} />;
}
