import { Location, User, Message, ChevronDown, ChevronUp } from "react-iconly";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { fetchCategories, fetchCategoriesSelector } from "@/store/waste-exchange";
import { InputWithLogo } from "@/components/inputs";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export function Username({ control, error }) {
  return (
    <Controller
      name="username"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Masukkan nama pengguna"}
            Logo={User}
            autoComplete={"off"}
            error={error}
            {...field}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function UserEmail({ control, error }) {
  return (
    <Controller
      name="userEmail"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Masukkan email pengguna"}
            Logo={Message}
            type={"email"}
            autoComplete={"off"}
            error={error}
            {...field}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function DropPointLocation({ control, error }) {
  return (
    <Controller
      name="dropPointLocation"
      control={control}
      render={({ field }) => (
        <FormControl isInvalid={error}>
          <InputWithLogo
            label={"Masukkan nama drop point"}
            Logo={Location}
            autoComplete={"off"}
            error={error}
            {...field}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export function SelectTrashTypeField({ control, error, target }) {
	const dispatch = useDispatch();
	const { categories, status } = useSelector(fetchCategoriesSelector);
	const [selectedTrashType, setSelectedTrashType] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);
  
	useEffect(() => {
	  if (target && target.trash_type) {
		setSelectedTrashType(target.trash_type);
	  }
	}, [target]);
  
	useEffect(() => {
	  console.log("Status:", status);
	  console.log("Categories:", categories);
  
	  if (status === "idle" || status === "failed") {
		console.log("Dispatching fetchCategories");
		dispatch(fetchCategories());
	  }
	}, [dispatch, status]);
  
	const handleMenuOpen = () => {
	  setMenuOpen(!menuOpen);
	};
  
	return (
	  <Controller
		name="trash_type"
		control={control}
		render={({ field }) => (
		  <FormControl isInvalid={error}>
			<Menu>
			  <MenuButton
				as={Button}
				px={4}
				py={2}
				width={"220px"}
				height={"41px"}
				transition="all 0.2s"
				borderRadius="lg"
				borderWidth="1px"
				borderColor={"#949494"}
				backgroundColor={"white"}
				_hover={{ bg: "gray.100" }}
				_expanded={{
					bg: "#35CC33",
					textColor: "white",
					textTransform: "capitalize",
					borderColor: "#35CC33",
				}}
				rightIcon={menuOpen ? <ChevronUp /> : <ChevronDown />}
				onClick={handleMenuOpen}
				isActive={menuOpen}
				textAlign="left"
				fontWeight="normal"
				fontSize={"14px"}
			  >
				{field.value || "Pilih Jenis Sampah"}
			  </MenuButton>
			  <MenuList fontSize={"14px"}>
				{categories.map((category) => (
				  <MenuItem
					key={category.id}
					onClick={() => {
					  field.onChange(category.trash_type);
					  setSelectedTrashType(category.trash_type);
					  setMenuOpen(false);
					}}
					fontWeight={selectedTrashType === category.trash_type ? "bold" : "normal"}
				  >
					{category.trash_type}
				  </MenuItem>
				))}
			  </MenuList>
			</Menu>
			<FormErrorMessage>{error?.message}</FormErrorMessage>
		  </FormControl>
		)}
	  />
	);
  }