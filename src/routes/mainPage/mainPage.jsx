import "./mainPage.css";
import Logo from "/images/logo.png";

function MainPage() {
  return (
    <>
      <section className="mainPage">
        <img src={Logo} alt="logo" />
        <div className="box"></div>
      </section>
    </>
  );
}

export default MainPage;
