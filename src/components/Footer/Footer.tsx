import style from "./Footer.module.scss";

interface FooterProps {
  totalNear: number;
  totalHot: number;
}

const Footer: React.FC<FooterProps> = ({ totalNear, totalHot }) => {
  return (
    <div className={style.footer}>
      <div className={style.footer__item}>
        <h2>Total NEAR</h2>
        <p><span>{totalNear.toFixed(4)}</span> NEAR</p>
      </div>

      <div className={style.footer__item}>
        <h2>Total HOT</h2>
        <p><span>{totalHot.toFixed(6)}</span> HOT</p>
      </div>
    </div>
  )
};

export default Footer;
