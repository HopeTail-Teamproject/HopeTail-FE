import "./footer.css";

function Footer() {
  return (
    <section className="footer">
      <div className="footer-left">
        <span className="logo">HopeTail</span>
        <span className="phone">010-1234-1234</span>
        <span className="email">Hopetail@gmail.com</span>
        <span className="instagram">Hope._.tail</span>
        <span className="location">
          47, Hanyangdaehak 1-gil, Sangnok-gu, Ansan-si, Gyeonggi-do
        </span>
      </div>
      <div className="footer-right">
        <select name="language" id="language">
          <option value="" disabled selected>
            Selct Language
          </option>
          <option value="korean">Korean</option>
          <option value="english">English (United States)</option>
        </select>
      </div>
    </section>
  );
}

export default Footer;
