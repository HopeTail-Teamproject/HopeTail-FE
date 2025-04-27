import default_img from "/images/default_img.png";
import "./chatPetInfo.css";

function ChatPetInfo() {
  return (
    <section className="chatPetInfo">
      <div className="top">
        <img src={default_img} alt="pet_main_img" />
      </div>
      <div className="main">
        <h1 className="name">Dog_name</h1>
        <span>Gender: Female or male</span>
        <span>Age: 2 years and 3 months</span>
        <span>Species: species</span>
        <span>Loaction: 47, Hanyangdaehak 1-gil, Sangnok-gu, Ansan-si, Gyeonggi-do</span>
        <span>Vaccinated: yy/mm/dd</span>
        <span>House-Trained: Yes or No</span>
        <span>Neutrated : Yes or No</span>
      </div>
    </section>
  );
}

export default ChatPetInfo;
