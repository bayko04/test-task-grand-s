import { useEffect, useState } from "react";
import style from "./HomePage.module.scss";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import FavoriteFilter from "../../components/FavoriteFilter/FavoriteFilter";
import { IProduct } from "../../shared/types";

const HomePage: React.FC = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [mutatedData, setMutatedData] = useState<IProduct[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<IProduct[]>(
          "https://fakestoreapi.com/products"
        );
        setData(response.data);
        setMutatedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...data];

      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter((item) =>
          item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      if (showFavorites) {
        filtered = filtered.filter((item) => favorites.includes(item.id));
      }

      setMutatedData(filtered);
    };

    applyFilters();
  }, [searchTerm, selectedCategory, showFavorites, data, favorites]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites") || "[]";
    setFavorites(JSON.parse(storedFavorites));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  return (
    <div className={style.homePage}>
      <div className="container">
        <div className={style.homePage__dashboard}>
          <h1 className={style.homePage__title}>Products</h1>

          <div className={style.homePage__options}>
            <CustomSearch
              handleChange={(value: string) => setSearchTerm(value)}
            />
            <CustomSelect
              handleChange={(value: string) => setSelectedCategory(value)}
              data={data}
            />
            <FavoriteFilter
              handleChange={(value: boolean) => setShowFavorites(value)}
            />
          </div>

          <div className={style.homePage__row}>
            {mutatedData.map((item) => (
              <ProductCard
                key={item.id}
                toggleFavorite={toggleFavorite}
                title={item.title}
                price={item.price}
                image={item.image}
                category={item.category}
                id={item.id}
                favorites={favorites}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
