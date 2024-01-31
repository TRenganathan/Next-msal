// TrafficGraph.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import moment from 'moment';

const DynamicLineChart = dynamic(() => import('../../components/linegraph'), { ssr: false });

const TrafficGraph = () => {
  // const [graphData, setGraphData] = useState(null);
const graphData =  [
  {
      "outTraffic": "79580190.00",
      "time": "2024-01-18T05:31:00Z",
      "inTraffic": "817856761.47"
  },
  {
      "outTraffic": "69432170.13",
      "time": "2024-01-18T05:32:00Z",
      "inTraffic": "600653456.67"
  },
  {
      "outTraffic": "66375636.80",
      "time": "2024-01-18T05:33:00Z",
      "inTraffic": "629636817.20"
  },
  {
      "outTraffic": "55268920.93",
      "time": "2024-01-18T05:34:00Z",
      "inTraffic": "261543411.87"
  },
  {
      "outTraffic": "72624618.67",
      "time": "2024-01-18T05:35:00Z",
      "inTraffic": "702786238.27"
  }
]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/traffic-data');
        setGraphData(response.data.data.graph);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!graphData) {
    return <div>Loading...</div>;
  }

  return <DynamicLineChart graphData={graphData} />;
};

export default TrafficGraph;
