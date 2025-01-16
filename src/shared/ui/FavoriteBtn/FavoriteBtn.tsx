import style from "./FavoriteBtn.module.scss";
import heartImg from "../../assets/heart.svg";
import heartRedImg from "../../assets/heart-_1_.svg";
import { FC } from "react";

interface IFavoriteProps {
  id: number;
  toggleFavorite: (id: number) => void;
  favorite: boolean;
}

const FavoriteBtn: FC<IFavoriteProps> = ({ id, toggleFavorite, favorite }) => {
  const handleClick = () => {
    toggleFavorite(id);
  };

  return (
    <div onClick={handleClick} className={style.favoriteBtn}>
      {favorite ? (
        <img src={heartRedImg} alt="" />
      ) : (
        <img src={heartImg} alt="" />
      )}
    </div>
  );
};

export default FavoriteBtn;
