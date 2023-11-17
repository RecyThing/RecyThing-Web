import { Input } from "@/components/inputs";
import { Switch } from "@chakra-ui/react";

export function OperationalSchedule() {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return(
    <div className="mt-8 flex flex-col gap-4">
      <p>Jadwal Operasional</p>

      {days.map((day, index) => (
        <div className="flex justify-between" key={index}>
          <div className="flex gap-2 min-w-[118px]">
            <Switch id={`switch-${index}`} colorScheme={"mainGreen"} size={'lg'} className="my-auto" />
            <p htmlFor={`switch-${index}`} className="my-auto font-medium">{day}</p>
          </div>

          <Input label={"Jam Buka"} />
          <Input label={"Jam Tutup"} />
        </div>
      ))}
    </div>
  );
}