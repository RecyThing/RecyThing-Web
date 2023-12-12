import { Select } from "@chakra-ui/react";

function capitalizeWords(string) {
	if (typeof string !== 'string' || string === undefined) {
	 	return '';
	}
	
	return string.replace(/\b\w/g, (char) => char.toUpperCase());
}

function ExchangeCategory({ categories, exchangeData, setExchangeData }) {

  return (
    <div className="mt-7 w-full">
      <div>
        <Select
          width={"220px"}
          height={"41px"}
          className="rounded-xl border border-[#828282]"
          onChange={(event) =>
            setExchangeData((prev) => ({
              ...prev,
              category_id: { id: event.target.value },
            }))
          }
          value={exchangeData.category_id?.id || ''}
          colorScheme={"mainGreen"}
        >
          <option value="" disabled>
            Pilih jenis sampah
          </option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category.id}>
                {capitalizeWords(category.trash_type)}
              </option>
            ))}
        </Select>
      </div>
    </div>
  );
}

export default ExchangeCategory;
