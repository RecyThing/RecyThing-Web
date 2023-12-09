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
import { fetchCategories, selectFetchCategoriesState } from "@/store/waste-exchange";
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
export const SelectTrashTypeField = ({ isOpen, control, error, index, target }) => {
	const dispatch = useDispatch();
	const { categories, status } = useSelector(selectFetchCategoriesState);
	const [selectedUnit, setSelectedUnit] = useState("");
  	const [menuOpen, setMenuOpen] = useState(false);
  
	useEffect(() => {
	  if (status === "idle") {
		dispatch(fetchCategories());
	  }
	}, [dispatch, status]);
	useEffect(() => {
		console.log("Categories data:", categories); // Check if categories is populated
		if (target) {
		  setSelectedUnit(target.unit || "");
		}
	  }, [target, categories]);

	useEffect(() => {
		if (target) {
		 	setSelectedUnit(target.unit || "");
		}
	}, [target]);

	const handleMenuOpen = () => {
		setMenuOpen(!menuOpen);
	};
  
	return (
		<Controller
		  name={`categories[${index}].trash_type`}
		  control={control}
		  defaultValue={target?.trash_type || ""}
		  render={({ field }) => (
			<FormControl isInvalid={error}>
			  {status === "loading" ? (
				<Spinner />
			  ) : (
				<Menu>
				  <MenuButton
					as={Button}
					rightIcon={isOpen ? <ChevronUp /> : <ChevronDown />}
					{...field}
				  >
					{field.value || "Pilih Jenis Sampah"}
				  </MenuButton>
				  <MenuList fontSize={"14px"}>
				  <MenuItem
						key={categories.id}
						onClick={() => {
							console.log("Selected trash_type:", categories?.trash_type); // Check the selected trash_type
							field.onChange(categories?.trash_type);
						}}
					>
						{categories?.trash_type}
					</MenuItem>
				</MenuList>
				</Menu>
			  )}
			  <FormErrorMessage>{error?.message}</FormErrorMessage>
			</FormControl>
		  )}
		/>
	  );
  };