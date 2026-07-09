import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { ProgressBar } from "../components/dashboard/ProgressBar";
import { AnalyticsChart } from "../components/dashboard/AnalyticsChart";
import { StatusPanel } from "../components/dashboard/StatusPanel";

export default function Dashboard() {
  const progress = 100;
  const data = [
    { name: "Button", design: 100, functional: 100 },
    { name: "Card", design: 100, functional: 100 },
    { name: "Modal", design: 100, functional: 100 },
  ];

  return (
    <DashboardLayout>
      <ProgressBar progress={progress} />
      <div className="mt-10">
        <AnalyticsChart data={data} />
      </div>
      <div className="mt-10">
        <StatusPanel tokens="✔ Completos" interactivity="✔ Activa" />
      </div>
    </DashboardLayout>
  );
}
