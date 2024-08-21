import style from "./Item.module.scss";
import DeleteIcon from "../SVG/Delete/Delete";

const Item = () => {
  return (
    <div className={style.item}>
      <div className={`${style.item__wrap} ${style.item__holder}`}>
        <h2 className={style.item__title}>Holder</h2>
        <span className={style.item__holder__nickname}>vector79.near</span>
        <button className={style['item__holder__btn-delete']}>
          <DeleteIcon />
        </button>
      </div>

      <div className={`${style.item__wrap} ${style.item__balance}`}>
        <h2 className={style.item__title}>Balance Near</h2>
        <p><span>1.3819</span> NEAR</p>
      </div>

      <div className={`${style.item__wrap} ${style.item__balance}`}>
        <h2 className={style.item__title}>Balance HOT</h2>
        <p><span>29.381912</span> HOT</p>
      </div>
    </div>
  )
};

export default Item;