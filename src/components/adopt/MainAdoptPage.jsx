import AdoptForm1 from "./step/AdoptForm1";
import "./mainAdoptPage.css";
import StepBar from "./StepBar";

function MainAdoptPage() {
  return (
    <section className="adopt">
      <div className="adopt-title">
        <span>Adopt</span>
      </div>
      <StepBar />
      <div className="adopt-main">
        <AdoptForm1 />
      </div>
    </section>
  );
}

export default MainAdoptPage;
