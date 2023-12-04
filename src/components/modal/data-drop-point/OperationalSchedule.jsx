import { Input } from "@/components/inputs";
import { Switch } from "@chakra-ui/react";

export function OperationalSchedule({ inputs, setInputs }) {

  function handleSwitchChange(e, item) {
    setInputs(prev => ({ ...prev, operational_schedule: prev.operational_schedule
      .map(object => object.day === item.day ? {...object, isChecked: e.target.checked, start_time: "", end_time: ""} : object) }));
  }

  function handleInputChange(e, item, time) {
    setInputs(prev => ({ ...prev, operational_schedule: prev.operational_schedule
      .map(object => object.day === item.day ? {...object, [time]: e.target.value} : object) }));
  }

  return(
    <div className="mt-8 flex flex-col gap-4">
      <p>Jadwal Operasional</p>

      {inputs.operational_schedule?.map((item, index) => (
        <div className="flex justify-between" key={index}>
          <div className="flex gap-2 min-w-[118px]">
            <Switch value={item.isChecked}  id={`switch-${index}`} onChange={(e) => handleSwitchChange(e, item)}
            colorScheme={"mainGreen"} size={'lg'} className="my-auto" />
            <p htmlFor={`switch-${index}`} className="my-auto font-medium">{item.day}</p>
          </div>
          <Input onChange={e => handleInputChange(e, item, "start_time")} type={"time"} disabled={!item.isChecked} 
          label={"Jam Buka"} className={`w-60 ${!item.isChecked && 'opacity-50'}`} value={item.start_time} />
          <Input onChange={e => handleInputChange(e, item, "end_time")} type={"time"} disabled={!item.isChecked} 
          label={"Jam Tutup"} className={`w-60 ${!item.isChecked && 'opacity-50'}`} value={item.end_time} />
        </div>
      ))}
    </div>
  );
}