// LineChart.js
import React, { useEffect } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ graphData }) => {
  useEffect(() => {
    const labels = graphData.map((point) => moment(point.time).format('HH:mm'));
    const inTrafficData = graphData.map((point) => parseFloat(point.inTraffic));
    const outTrafficData = graphData.map((point) => parseFloat(point.outTraffic));

    const data = {
      labels,
      datasets: [
        {
          label: 'Inbound Traffic',
          data: inTrafficData,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          fill: true,
        },
        {
          label: 'Outbound Traffic',
          data: outTrafficData,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          fill: true,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
        },
      },
    };

    const chart = new Chart(document.getElementById('traffic-chart'), {
      type: 'line',
      data,
      options,
    });

    return () => {
      chart.destroy();
    };
  }, [graphData]);
  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
  };
  return <Line data={graphData} options={options} />;
};

export default LineChart;
