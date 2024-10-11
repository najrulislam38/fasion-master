import { Link } from "react-router-dom";
import Container from "../Container/Container";
import "./Banner.css";

const Banner = () => {
  return (
    <div className=" banner ">
      <Container>
        <div className="h-screen flex  items-center">
          <div>
            <span className="text-secondary uppercase tracking-widest font-medium md:text-lg">
              {" "}
              up to 50% Off
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-6xl tracking-widest leading-10 mt-2 mb-2 md:mb-7">
              New Collection
            </h1>
            <p className="text-sm md:text-base text-gray-500 tracking-wide mb-10 text-justify max-w-xl">
              Look at the sunset, life is amazing, life is beautiful, life is
              what you make it
            </p>
            <Link to={"products"}>
              <button className="py-3 px-12 bg-black text-white hover:bg-secondary duration-200">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
