"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
    { name: "Sales", data: new Array(12).fill(0) }, // Default empty data for 12 months
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/payment"); // Fetch API data
        const data = await response.json();

        const monthlySales = data.monthlySales || [];

        // Initialize an array for 12 months (Jan-Dec) with default 0 values
        const salesData = new Array(12).fill(0);

        // Map API data to the correct month index
        monthlySales.forEach((item: { month: number; total: number }) => {
          salesData[item.month - 1] = item.total; // month is 1-based, index is 0-based
        });

        setSeries([{ name: "Sales", data: salesData }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    legend: { show: false, position: "top", horizontalAlign: "left" },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2] },
    fill: { type: "gradient", gradient: { opacityFrom: 0.55, opacityTo: 0 } },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: { yaxis: { lines: { show: true } } },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, x: { format: "MMM" } },
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
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: { labels: { style: { fontSize: "12px", colors: ["#6B7280"] } } },
  };

  return (
    <div className="rounded-2xl border max-h-[210px] border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Bookings for each month
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className=" min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
