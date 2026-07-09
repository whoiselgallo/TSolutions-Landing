import { Bar } from "react-chartjs-2";

export function AnalyticsChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Diseño",
        data: data.map((d) => d.design),
        backgroundColor: "#00f5d4",
      },
      {
        label: "Funcionalidad",
        data: data.map((d) => d.functional),
        backgroundColor: "#ff6b00",
      },
    ],
  };

  return <Bar data={chartData} />;
}
