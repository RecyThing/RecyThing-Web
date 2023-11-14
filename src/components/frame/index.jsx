import {
  FrameTukar,
  FrameDapatkanPoin,
  FramePahlawan,
  FrameLaporkan,
  FrameDaurUlang,
} from "./FrameMain";

const index = () => {
  return (
    <>
      <FramePahlawan />
      <FrameDaurUlang />
      <FrameLaporkan />
      <FrameDapatkanPoin />
      <FrameTukar />
    </>
  );
};

export default index;
