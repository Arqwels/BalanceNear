import style from "./Item.module.scss";
import DeleteIcon from "../SVG/Delete/Delete";
import { useDeleteAddressMutation } from "../../store/api/adressApi";

interface ItemProps {
  nickname: string;
  balanceNear: number;
  balanceHot: number;
}

const Item: React.FC<ItemProps> = ({ nickname, balanceNear, balanceHot }) => {  
  // Хук для удаления адреса
  const [deleteAddress] = useDeleteAddressMutation();

  // Функция удаления адреса с подтверждением
  const handleDelete = async () => {
    const confirmed = window.confirm(`Вы уверены, что хотите удалить адрес ${nickname}?`);
    if (confirmed) {
      try {
        await deleteAddress(nickname).unwrap(); // Используем nickname для удаления
        alert('Адрес успешно удален');
      } catch (error) {
        console.error('Ошибка при удалении адреса:', error);
        if ('data' in error) {
          console.log('Данные ошибки:', error.data);
        }
        alert('Не удалось удалить адрес');
      }
    }
  };



  return (
    <div className={style.item}>
      <div className={`${style.item__wrap} ${style.item__holder}`}>
        <h2 className={style.item__title}>Holder</h2>
        <span className={style.item__holder__nickname}>{nickname}</span>
        <button className={style['item__holder__btn-delete']} onClick={handleDelete}>
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