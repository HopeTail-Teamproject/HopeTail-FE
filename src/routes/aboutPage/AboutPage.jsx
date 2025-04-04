import Logo from "/images/logo.png";
import "./aboutPage.css";

function AboutPage() {
  return (
    <section className="about">
      <div className="top">
        <h1>About Us</h1>
      </div>
      <div className="mid">
        <img src={Logo} alt="logo" />
        <span>Hello, we are Hopetail.</span>
        <span>
          We are working in collaboration with stray dog protection organizations to
          instill hope for a
        </span>
        <span>new family in stray dogs.</span>
        <span>
          Our goal is to provide a fresh start for these dogs and support them in living a
          loving life in
        </span>
        <span>a warm home.</span>
        <span>
          Your donations are used for the rescue and treat ment costs of these dogs.
        </span>
        <span>
          “All the funds” you contribute go directly towards rescuing and helping these
          dogs.
        </span>
      </div>
      <div className="bot">
        <span>Suppport Account: KB 123456-12-123456</span>
        <span>Thank you !!</span>
      </div>
    </section>
  );
}

export default AboutPage;
