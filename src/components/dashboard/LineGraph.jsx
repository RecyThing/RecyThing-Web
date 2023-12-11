import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineGraph({ filter }) {
  const labels = filter === "year" ? ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Nov', 'Okt', 'Des'] : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Tumpukan Sampah',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: '#883DCF',
        backgroundColor: '#883DCF',
      },
      {
        label: 'Pelanggaran Sampah',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: '#F86624',
        backgroundColor: '#F86624',
      },
    ]
  });

  const options =  {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        border:{dash: [3, 3]},
        grid: {
            color: '#C2C6CE',
            drawTicks: true, 
            drawOnChartArea: true
        },
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: false
      }
    }
  }

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: 'Tumpukan Sampah',
          data: labels.map(() => Math.floor(Math.random() * 100)),
          borderColor: '#883DCF',
          backgroundColor: '#883DCF',
        },
        {
          label: 'Pelanggaran Sampah',
          data: labels.map(() => Math.floor(Math.random() * 100)),
          borderColor: '#F86624',
          backgroundColor: '#F86624',
        },
      ]
    })
  }, [filter])

  return (
    <div>
      <Line className='!h-[252px]' options={options} data={data} />
    </div>
  )
}

export default LineGraph;
