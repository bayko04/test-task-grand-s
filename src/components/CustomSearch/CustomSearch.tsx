import { FC, useEffect, useState } from "react";
import style from "./CustomSearch.module.scss";

interface CustomSearchProps {
  handleChange: (inputValue: string) => void;
}

const CustomSearch: FC<CustomSearchProps> = ({ handleChange }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    handleChange(inputValue);
  }, [inputValue]);

  return (
    <form className={style.customSearch}>
      <label htmlFor="">Search</label>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      />
    </form>
  );
};

export default CustomSearch;
