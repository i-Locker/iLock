import Header from "../components/Header";
import Nav from "../components/Nav";
import NavTest from "../components/Nav_Test";
import Market from "../components/Market";
import Footer from "../components/Footer";

export default function MarketMain() {
  return (
    <div className="text-black">
      <Header>
        <title>Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Header>
      <NavTest />
      <Market />
      <Footer />
    </div>
  );
}
