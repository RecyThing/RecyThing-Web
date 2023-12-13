import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { GoDash } from 'react-icons/go';

function InfoCard({ title, count, image, percentage, filter, status }) {
  return (
    <div className={"basis-1/4 h-[146px] p-4 shadow-md rounded-xl bg-white"}>
      <div className="flex justify-between">
        <p className="font-medium text-[#777980]">{title}</p>
        <img className='shrink-0 h-fit' src={image} alt="" />
      </div>
      <p className="text-[32px] font-semibold"><CountUp start={0} end={count} /></p>

      <div className={`mt-4 flex ${status === "naik" ? 'text-[#1A9882]' : status === "tetap" ? 'text-[#777980]' : 'text-[#E53535]'}`}>
        <p className="text-sm font-bold">{percentage}%</p>
        {status === "naik" ? <FaCaretUp className="my-auto ml-[2px]" /> : status === "tetap" ? <GoDash className="my-auto ml-[2px]" /> : <FaCaretDown className="my-auto ml-[2px]" />}
        <p className="ml-1 text-sm font-medium my-auto text-[#858D9D]">1 {filter === "years" ? 'Tahun' : 'Bulan'} Terakhir</p>
      </div>
    </div>
  )
}

export default InfoCard;

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  image: PropTypes.any.isRequired,
  percentage: PropTypes.number.isRequired,
}