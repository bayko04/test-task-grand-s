import style from "./FavoriteFilter.module.scss";
import heartImg from "../../shared/assets/heart.svg";
import heartRedImg from "../../shared/assets/heart-_1_.svg";
import { FC, useState } from "react";

interface CustomFavoriteProps {
  handleChange: (state: boolean) => void;
}

const FavoriteFilter: FC<CustomFavoriteProps> = ({ handleChange }) => {
  const [state, setState] = useState(true);

  const handleClick = () => {
    setState((prev) => !prev);
    handleChange(state);
  };

  return (
    <div onClick={handleClick} className={style.favoriteFilter}>
      <label htmlFor="">Favorite filter</label>
      <div className={style.favoriteFilter__img}>
        {state ? (
          <img src={heartImg} alt="" />
        ) : (
          <img src={heartRedImg} alt="" />
        )}
      </div>
    </div>
  );
};

export default FavoriteFilter;
