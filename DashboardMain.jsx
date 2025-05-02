
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

function Card({ children }) {
  return <div style={{
    backgroundColor: "#1e293b",
    border: "1px solid #0891b2",
    padding: "1rem",
    borderRadius: "1rem",
    marginBottom: "1rem"
  }}>{children}</div>;
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

export default function DashboardMain() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    setEquipments([
      { id: 1, name: "پمپ اصلی", serial: "PMP-001", health: 95 },
      { id: 2, name: "کوره ذوب", serial: "KRZ-147", health: 78 },
      { id: 3, name: "دستگاه برش", serial: "BRS-390", health: 52 },
      { id: 4, name: "خط نورد 1", serial: "NRD-011", health: 88 },
      { id: 5, name: "کمپرسور هوا", serial: "CMP-908", health: 64 },
    ]);
  }, []);

  const avgHealth =
    equipments.reduce((sum, eq) => sum + eq.health, 0) / equipments.length || 0;

  const healthColor = (val) => {
    if (val >= 90) return "#22c55e";
    if (val >= 60) return "#facc15";
    return "#ef4444";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white", padding: "2rem" }}>
      <Card>
        <CardContent>
          <h2 style={{ textAlign: "center", color: "#67e8f9", marginBottom: "1rem" }}>
            میانگین سلامت کل تجهیزات
          </h2>
          <div style={{ width: "160px", margin: "0 auto", position: "relative" }}>
            <Doughnut
              data={{
                labels: ["سلامت", "خالی"],
                datasets: [{
                  data: [avgHealth, 100 - avgHealth],
                  backgroundColor: [healthColor(avgHealth), "#1f2937"],
                  borderWidth: 0
                }]
              }}
              options={{ cutout: "70%" }}
            />
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "#67e8f9"
            }}>{Math.round(avgHealth)}%</div>
          </div>
        </CardContent>
      </Card>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1.5rem"
      }}>
        {equipments.map((eq) => (
          <Card key={eq.id}>
            <CardContent>
              <h3 style={{ color: "#67e8f9" }}>{eq.name}</h3>
              <p style={{ color: "#94a3b8" }}>سریال: {eq.serial}</p>
              <Bar
                data={{
                  labels: ["سلامت"],
                  datasets: [{
                    label: "% سلامت",
                    data: [eq.health],
                    backgroundColor: healthColor(eq.health),
                    barThickness: 24
                  }]
                }}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { max: 100, ticks: { color: "white" }, grid: { color: "#334155" } },
                    y: { ticks: { color: "white" }, grid: { color: "#334155" } }
                  }
                }}
              />
              <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                سلامت: {eq.health}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
