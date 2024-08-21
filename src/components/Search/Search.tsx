import SearchIcon from "../SVG/Search/Search";
import style from "./Search.module.scss";

const Search = () => {
  return (
    <div className={style.search}>
      <input type="text" className={style.search__input} />

      <button className={style.search__icon}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
