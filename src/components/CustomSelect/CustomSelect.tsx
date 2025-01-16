import { useEffect, useState } from "react";
import style from "./CustomSelect.module.scss";
import { IProduct } from "../../shared/types";

interface CustomSelectProps {
  data: IProduct[];
  handleChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ data, handleChange }) => {
  const [uniqueData, setUniqueData] = useState<string[]>([]);
  const [optionValue, setOptionValue] = useState<string>("");

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(data.map((item: IProduct) => item.category))
    );
    setUniqueData(uniqueCategories);
  }, [data]);

  useEffect(() => {
    handleChange(optionValue);
  }, [optionValue, handleChange]);

  return (
    <form className={style.customSelect}>
      <div>
        <label htmlFor="categorySelect">Category filter</label>
        <select
          onChange={(e) => setOptionValue(e.target.value)}
          value={optionValue}
          name="category"
          id="categorySelect"
        >
          <option value="">Выберите значение</option>
          {uniqueData.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CustomSelect;
