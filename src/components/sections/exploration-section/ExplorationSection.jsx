import { ExplorationData } from "./ExplorationData";
import imgFrame1 from "@/assets/LandingPage/frame/frame1.png";
import { useInView } from "framer-motion";
import { useRef } from "react";

function Section1({ children, transforms }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : transforms,
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
      }}
    >
      {children}
    </div>
  );
}

function Section2({ children, transforms }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : transforms,
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
      }}
    >
      {children}
    </div>
  );
}

export function ExplorationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const highlightKeywords = [
    "Dapatkan",
    "Poin",
    "Tukarkan",
    "Laporkan",
    "Daur",
    "Ulang",
  ];

  const renderHighlightedTitle = (title) => {
    const words = title.split(" ");
    return words.map((word, index) =>
      highlightKeywords.includes(word) ? (
        <span key={index} className="text-green-400">
          {index > 0 ? " " : ""}
          {word}
        </span>
      ) : (
        <span key={index}>
          {index > 0 ? " " : ""}
          {word}
        </span>
      )
    );
  };
  return (
    <>
      <div
        id="framePahlawan"
        className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-row-1 justify-center items-center my-20 p-10 gap-20"
      >
        <div
          className="left"
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateX(-100px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
          }}
        >
          <img src={imgFrame1} alt="" className="mx-auto" />
        </div>
        <div
          className="right"
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateX(100px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s",
          }}
        >
          <p className="text-5xl font-semibold my-3 w-9/12">
            Jadi <span className="text-green-400"> Pahlawan Lingkungan </span>
            Untuk Masa Depan
          </p>
          <p className="font-regular text-gray-400 my-3 w-4/6">
            RecyThing adalah aplikasi ramah lingkungan yang memudahkan kamu
            melaporkan pelanggaran pembuangan sampah, menjalankan daur ulang
            sampah, dapatkan poin dari misi lingkungan, dan tukarkan poinmu
            dengan reward yang menarik. Ayo bergabunglah dengan kami dan jadi
            pahlawan lingkungan masa depan!
          </p>
          <button
            type="button"
            className="focus:outline-none my-3  text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Selengkapnya
          </button>
        </div>
      </div>
      {ExplorationData.map((data, id) => (
        <div
          id={id === 0 ? "frameDaurUlang" : ""}
          className={`grid lg:grid-cols-2 md:grid-cols-2 sm:grid-row-1 justify-center items-center my-20 p-10 gap-20  ${
            data.id % 2 === 0 ? "transparent " : "bg-green-50"
          }`}
          key={id}
        >
          <Section1
            transforms={
              data.id % 2 === 0 ? "translateX(-100px)" : "translateY(100px)"
            }
          >
            <div className="left bg-green-100 rounded-[3%] pt-10">
              <img src={data.image} alt="" className="mx-auto " />
            </div>
          </Section1>
          <div
            className={`group-text ${
              data.id % 2 === 0 ? "" : "lg:row-start-1 md:row-auto"
            }`}
          >
            <Section2
              transforms={
                data.id % 2 === 0 ? "translateX(100px)" : "translateY(-100px)"
              }
            >
              <p className="text-5xl font-semibold my-3 w-9/12">
                {renderHighlightedTitle(data.title)}
              </p>
              <p className="font-regular text-gray-400 my-3 w-4/6">
                {data.description}
              </p>
            </Section2>
          </div>
        </div>
      ))}
    </>
  );
}
