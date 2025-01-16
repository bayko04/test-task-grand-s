import { FC } from "react";
import style from "./ProductCard.module.scss";
import FavoriteBtn from "../../shared/ui/FavoriteBtn/FavoriteBtn";
import { IProduct } from "../../shared/types";

interface IProductCardProps extends IProduct {
  toggleFavorite: (productId: number) => void;
  favorites: number[];
}

const ProductCard: FC<IProductCardProps> = ({
  id,
  title,
  image,
  category,
  price,
  toggleFavorite,
  favorites,
}) => {
  return (
    <div className={style.productCard}>
      <div className={style.productCard__img}>
        <img src={image} alt="" />
      </div>
      <div className={style.productCard__content}>
        <h3 className={style.productCard__title}>{title}</h3>
        <p className={style.productCard__category}>{category}</p>
        <p className={style.productCard__price}>{price} $</p>
      </div>

      <FavoriteBtn
        favorite={favorites.includes(id)}
        toggleFavorite={toggleFavorite}
        id={id}
      />
    </div>
  );
};

export default ProductCard;
