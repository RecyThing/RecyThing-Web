import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Chart() {
  const data = {
    labels: ["Individu", "Perusahaan"],
    datasets: [
      {
        label: "% Pelanggaran",
        data: [60, 40],
        backgroundColor: ["#4339F2", "#FF3A29"],
      },
    ],
    text: '23%'
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        formatter: (value) => {
          return `${value}%`;
        },
        display: true,
        color: 'white',
        labels: {
          title: {
            font: {
              size: '16px'
            }
          },
        }
     }
    },
  }

  return (
    <div className="p-5 rounded-xl shadow-md bg-white">
      <p className="text-xl font-semibold leading-[30px]">Pelaporan</p>
      <p className="text-sm text-[#777980] leading-5">Pelaporan Pelanggaran Sampah</p>

      <Pie className='mt-10 max-h-[154px]' options={options} data={data} />
    </div>
  )
}

export default Chart;
