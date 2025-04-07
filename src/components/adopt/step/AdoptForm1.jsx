import "./adoptForm1.css";

function AdoptForm1() {
  return (
    <div className="adopt-form1">
      <div className="form1-main">
        <div className="main-left">
          <span>
            Please add 4 photos of your home and any outside space as it helps the pet’s
            current owner to visualize the home you are offering.
          </span>
          <span>(A minimum of 2 photos are required but uploading 4 is better!)</span>
        </div>
        <div className="main-right">
          <span>The image format should be (.jpg, .png, .jpeg).</span>
          <span>
            The image measurements must be square in shape, with dimensions of 600 X 600
            pixels.
          </span>
          <span>The maximum &minimum image size is 1024 and 240 KB.</span>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm1;
