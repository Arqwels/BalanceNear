import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footer__item}>
        <h2>Total NEAR</h2>
        <p><span>12.3412</span> NEAR</p>
      </div>

      <div className={style.footer__item}>
        <h2>Total HOT</h2>
        <p><span>132.431234</span> HOT</p>
      </div>
    </div>
  )
};

export default Footer;