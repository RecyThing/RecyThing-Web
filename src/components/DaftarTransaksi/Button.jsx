import { Button, Text } from "@chakra-ui/react";
import { Box } from "iconsax-react";

export function DaftarTransaksiButton({ onSelected, name, diClick,dLength }) {
  {
    switch (name) {
      case "Semua": {
        switch (onSelected) {
          case "True":
            return (
              <Button
                paddingX={"14px"}
                backgroundColor={"#35CC33"}
                paddingY={"16px"}
                width={"132px"}
                height={"56px"}
                _hover={{ bg: '#35CC33' }}
                onClick={diClick}
              >
                <Text
                  style={{ color: "white" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
              </Button>
            );

          case "False":
            return (
              <Button
                paddingX={"14px"}
                paddingY={"16px"}
                backgroundColor={"transparent"}
                width={"132px"}
                height={"56px"}
                onClick={diClick}
              >
                <Text
                  style={{ color: "black" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
              </Button>
            );
        }
      };

      case "Diproses": {
        switch (onSelected) {
          case "True":
            return (
              <Button
                paddingX={"14px"}
                backgroundColor={"#35CC33"}
                paddingY={"16px"}
                width={"192px"}
                height={"56px"}
                _hover={{ bg: '#35CC33' }}
                onClick={diClick}
              >
                <Text
                  style={{ color: "white" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
                <div
                  className="rounded ms-1 px-2 flex items-center justify-center"
                  style={{ color: "#35CC33", backgroundColor: "white", width:"43px", height:"28px", borderRadius:"2000px" }}
                >
                  <p>{dLength}</p>
                </div>
              </Button>
            );

          case "False":
            return (
              <Button
                paddingX={"14px"}
                paddingY={"16px"}
                backgroundColor={"transparent"}
                width={"192px"}
                height={"56px"}
                onClick={diClick}
              >
                <Text
                  style={{ color: "black" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
                <div
                  className="rounded ms-1 px-2 flex items-center justify-center"
                  style={{ color: "white", backgroundColor: "#828282", width:"43px", height:"28px", borderRadius:"2000px" }}
                >
                  <p>{dLength}</p>
                </div>
              </Button>
            );
        }
      };

      case "Terbaru": {
        switch (onSelected) {
          case "True":
            return (
              <Button
                paddingX={"14px"}
                backgroundColor={"#35CC33"}
                paddingY={"16px"}
                width={"200px"}
                height={"56px"}
                _hover={{ bg: '#35CC33' }}
                onClick={diClick}
              >
                <Text
                  style={{ color: "white" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
                <div
                  className="rounded ms-1 px-2 flex items-center justify-center"
                  style={{ color: "#35CC33", backgroundColor: "white", width:"43px", height:"28px", borderRadius:"2000px" }}
                >
                  <p>{dLength}</p>
                </div>
              </Button>
            );

          case "False":
            return (
              <Button
                paddingX={"14px"}
                paddingY={"16px"}
                backgroundColor={"transparent"}
                width={"200px"}
                height={"56px"}
                onClick={diClick}
              >
                <Text
                  style={{ color: "black" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
                <div
                  className="rounded ms-1 px-2 flex items-center justify-center"
                  style={{ color: "white", backgroundColor: "#828282", width:"43px", height:"28px", borderRadius:"2000px" }}
                >
                  <p>{dLength}</p>
                </div>
              </Button>
            );
        }
      };

      case "Selesai": {
        switch (onSelected) {
          case "True":
            return (
              <Button
                paddingX={"14px"}
                backgroundColor={"#35CC33"}
                paddingY={"16px"}
                width={"187px"}
                height={"56px"}
                _hover={{ bg: '#35CC33' }}
                onClick={diClick}
              >
                <Text
                  style={{ color: "white" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
                <div
                  className="rounded ms-1 px-2 flex items-center justify-center"
                  style={{ color: "#35CC33", backgroundColor: "white", width:"43px", height:"28px", borderRadius:"2000px" }}
                >
                  <p>{dLength}</p>
                </div>
              </Button>
            );

          case "False":
            return (
              <Button
                paddingX={"14px"}
                paddingY={"16px"}
                backgroundColor={"transparent"}
                width={"187px"}
                height={"56px"}
                onClick={diClick}
              >
                <Text
                  style={{ color: "black" }}
                  fontSize={"16px"}
                  fontWeight={"400"}
                >
                  {name}
                </Text>
                <div
                  className="rounded ms-1 px-2 flex items-center justify-center"
                  style={{ color: "white", backgroundColor: "#828282", width:"43px", height:"28px", borderRadius:"2000px" }}
                >
                  <p>{dLength}</p>
                </div>
              </Button>
            );
        }
      };
    }
  }
}
