import style from "./Item.module.scss";
import DeleteIcon from "../SVG/Delete/Delete";
import { useDeleteAddressMutation } from "../../store/api/adressApi";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ItemProps {
  nickname: string;
  balanceNear: number;
  balanceHot: number;
  findingWallets: boolean | undefined;
}

const Item: React.FC<ItemProps> = ({ nickname, balanceNear, balanceHot, findingWallets }) => {  
  // Хук для удаления адреса
  const [deleteAddress] = useDeleteAddressMutation();

  // Функция удаления адреса с подтверждением
  const handleDelete = async () => {
    const confirmed = window.confirm(`Вы уверены, что хотите удалить адрес ${nickname}?`);
    if (confirmed) {
      try {
        await deleteAddress(nickname).unwrap(); // Используем nickname для удаления
        alert('Адрес успешно удален');
      } catch (error: unknown) {
        // Проверяем тип ошибки
        if (isFetchBaseQueryError(error)) {
          console.error('Ошибка при удалении адреса:', error);
          if (error.data) {
            console.log('Данные ошибки:', error.data);
          }
        } else {
          console.error('Неизвестная ошибка:', error);
        }
        alert('Не удалось удалить адрес');
      }
    }
  };

  // Функция проверки, является ли ошибка FetchBaseQueryError
  const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === 'object' && error !== null && 'status' in error;
  };

  return (
    <div className={style.item}>
      <div className={`${style.item__wrap} ${style.item__holder}`}>
        <h2 className={style.item__title}>Holder</h2>
        <span className={style.item__holder__nickname}>{nickname}</span>
        {findingWallets ? (
          <button className={style['item__holder__btn-delete']} onClick={handleDelete}>
            <DeleteIcon />
          </button>
        ) : (
          <div></div>
        )}
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
