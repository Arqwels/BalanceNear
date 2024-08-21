import style from "./Item.module.scss";
import DeleteIcon from "../SVG/Delete/Delete";

interface ItemProps {
  nickname: string;
  balanceNear: number;
  balanceHot: number;
}

const Item: React.FC<ItemProps> = ({ nickname, balanceNear, balanceHot }) => {
  return (
    <div className={style.item}>
      <div className={`${style.item__wrap} ${style.item__holder}`}>
        <h2 className={style.item__title}>Holder</h2>
        <span className={style.item__holder__nickname}>{nickname}</span>
        <button className={style['item__holder__btn-delete']}>
          <DeleteIcon />
        </button>
      </div>

      <div className={`${style.item__wrap} ${style.item__balance}`}>
        <h2 className={style.item__title}>Balance Near</h2>
        <p><span>{balanceNear.toFixed(4)}</span> NEAR</p>
      </div>

      <div className={`${style.item__wrap} ${style.item__balance}`}>
        <h2 className={style.item__title}>Balance HOT</h2>
        <p><span>{balanceHot.toFixed(6)}</span> HOT</p>
      </div>
    </div>
  )
};

export default Item;