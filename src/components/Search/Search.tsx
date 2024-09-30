import React from "react";
import SearchIcon from "../SVG/Search/Search";
import style from "./Search.module.scss";

interface SearchProps {
  findingWallets: boolean | undefined;
}

const Search: React.FC<SearchProps> = ({ findingWallets }) => {
  return (
    <div className={style.search}>
      <input 
        type="text" 
        className={style.search__input} 
        disabled={findingWallets === false} // Отключение ввода, если данные локальные
        placeholder={findingWallets === false ? "Сейчас проблемы с сервером" : "Поиск..."}
      />

      <button 
        className={`${style.search__icon} ${findingWallets === false ? style['search__icon--disabled'] : ''}`}
        disabled={findingWallets === false}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
