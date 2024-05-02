import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

//chart generation
const WeatherChart = ({ hoursData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const formatTime = (time) => {
      let [hour, minute] = time.split(":");
      hour = parseInt(hour, 10);
      const ampm = hour >= 12 ? "pm" : "am";
      hour = hour % 12;
      hour = hour ? hour : 12;
      return `${hour}${ampm}`;
    };

    const labels = hoursData.map((hour) => formatTime(hour.datetime));
    const temperatures = hoursData.map((hour) => parseFloat(hour.temp));
    const windSpeeds = hoursData.map((hour) => parseFloat(hour.windspeed));
    const humidities = hoursData.map((hour) => parseFloat(hour.humidity));

    //graph plots
    const data = {
      labels,
      datasets: [
        {
          label: "Temperature",
          data: temperatures,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.5,
          yAxisID: "y-temperature",
        },
        {
          label: "Wind Speed",
          data: windSpeeds,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.5,
          yAxisID: "y-wind",
        },
        {
          label: "Humidity",
          data: humidities,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0)",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          tension: 0.5,
          yAxisID: "y-humidity",
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          callbacks: {
            title: function (tooltipItems) {
              return tooltipItems[0].label;
            },
            label: function (tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
            },
          },
        },
      },
      scales: {
        x: {
          position: "top",
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false,
            drawOnChartArea: false,
          },
          ticks: {
            display: false,
          },
        },
        "y-temperature": {
          type: "linear",
          display: false,
          position: "left",
          grid: {
            display: false,
          },
        },
        "y-wind": {
          type: "linear",
          display: false,
          position: "right",
          beginAtZero: true,
          suggestedMax: Math.max(...windSpeeds) + 1,
        },
        "y-humidity": {
          type: "linear",
          display: false,
          position: "right",
          beginAtZero: true,
          suggestedMax: Math.max(...humidities) * 1.2,
        },
      },
    };

    if (chartInstance.current) {
      chartInstance.current.data = data;
      chartInstance.current.options = options;
      chartInstance.current.update();
    } else {
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data,
        options,
      });
    }
    //destroys previous chart when generating new one
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [hoursData]);

  return <canvas ref={chartRef} />;
};

export default WeatherChart;
