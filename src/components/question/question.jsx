import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

function Question() {
  return (
    <>
      <div className="question px-4 lg:px-[72px] py-10 lg:py-16 bg-[#F6FEF6]">
        <div className="question-title flex flex-col lg:flex lg:flex-row lg:justify-between gap-5">
          <div className="lg:flex lg:w-[500px] lg:items-center">
            <p className="text-lg lg:text-4xl lg:items-center font-semibold lg:font-bold">
              Pertanyaan yang Sering Diajukan
            </p>
          </div>
          <div className="lg:flex lg:items-center">
            <button
              type="button"
              className="focus:outline-none text-white bg-[#35CC33] hover:bg-green-600 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
        <div className="question-list mt-10 lg:mt-14 bg-white">
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "#35cc33", color: "white" }}
                  className="flex justify-between gap-4"
                >
                  <Box className="flex font-semibold lg:px-[60px] lg:py-[43px]">
                    <p className="text-lg lg:text-4xl">01</p>
                    <p className="flex items-center text-left text-sm lg:text-2xl ml-4 lg:ml-[106px]">
                      Bagaimana cara mendaftar di RecyThing?
                    </p>
                  </Box>
                  <div className="lg:pr-[60px] lg:w-6">
                    <AccordionIcon />
                  </div>
                </AccordionButton>
              </h2>
              <div className="bg-[#35cc33] px-8 lg:px-[200px]">
                <AccordionPanel className="bg-[#35cc33    ] text-sm lg:text-xl font-normal text-white mb-4 lg:mb-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </div>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "#35cc33", color: "white" }}
                  className="flex justify-between gap-4"
                >
                  <Box className="flex font-semibold lg:px-[60px] lg:py-[43px]">
                    <p className="text-lg lg:text-4xl">02</p>
                    <p className="flex items-center text-left text-sm lg:text-2xl ml-4 lg:ml-[106px]">
                      Bagaimana cara melaporkan sampah sembarangan?
                    </p>
                  </Box>
                  <div className="lg:pr-[60px] lg:w-6">
                    <AccordionIcon />
                  </div>
                </AccordionButton>
              </h2>
              <div className="bg-[#35cc33] px-8 lg:px-[200px]">
                <AccordionPanel className="bg-[#35cc33    ] text-sm lg:text-xl font-normal text-white mb-4 lg:mb-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </div>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "#35cc33", color: "white" }}
                  className="flex justify-between gap-4"
                >
                  <Box className="flex font-semibold lg:px-[60px] lg:py-[43px]">
                    <p className="text-lg lg:text-4xl">03</p>
                    <p className="flex items-center text-left text-sm lg:text-2xl ml-4 lg:ml-[106px]">
                      Bagaimana cara menukar poin saya?
                    </p>
                  </Box>
                  <div className="lg:pr-[60px] lg:w-6">
                    <AccordionIcon />
                  </div>
                </AccordionButton>
              </h2>
              <div className="bg-[#35cc33] px-8 lg:px-[200px]">
                <AccordionPanel className="bg-[#35cc33    ] text-sm lg:text-xl font-normal text-white mb-4 lg:mb-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </div>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "#35cc33", color: "white" }}
                  className="flex justify-between gap-4"
                >
                  <Box className="flex font-semibold lg:px-[60px] lg:py-[43px]">
                    <p className="text-lg lg:text-4xl">04</p>
                    <p className="flex items-center text-left text-sm lg:text-2xl ml-4 lg:ml-[106px]">
                      Bagaimana cara menukar sampah dengan poin?
                    </p>
                  </Box>
                  <div className="lg:pr-[60px] lg:w-6">
                    <AccordionIcon />
                  </div>
                </AccordionButton>
              </h2>
              <div className="bg-[#35cc33] px-8 lg:px-[200px]">
                <AccordionPanel className="bg-[#35cc33    ] text-sm lg:text-xl font-normal text-white mb-4 lg:mb-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </div>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton
                  _expanded={{ bg: "#35cc33", color: "white" }}
                  className="flex justify-between gap-4"
                >
                  <Box className="flex font-semibold lg:px-[60px] lg:py-[43px]">
                    <p className="text-lg lg:text-4xl">05</p>
                    <p className="flex items-center text-left text-sm lg:text-2xl ml-4 lg:ml-[106px]">
                      Bagaimana mengikuti misi di RecyThing?
                    </p>
                  </Box>
                  <div className="lg:pr-[60px] lg:w-6">
                    <AccordionIcon />
                  </div>
                </AccordionButton>
              </h2>
              <div className="bg-[#35cc33] px-8 lg:px-[200px]">
                <AccordionPanel className="bg-[#35cc33    ] text-sm lg:text-xl font-normal text-white mb-4 lg:mb-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Question;
