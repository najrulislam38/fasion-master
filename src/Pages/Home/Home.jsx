import Banner from "../../Components/Banner/Banner";
import BestProduct from "../../Components/Header/BestProduct/BestProduct";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const a = 0;
  if (a > 0) {
    return <Loading />;
  }
  return (
    <div>
      <Banner />
      <BestProduct />
    </div>
  );
};

export default Home;
