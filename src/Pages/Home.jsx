import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./../Components/Header";
import Hero from "./../Components/Hero";
import Testimonial from "./../Components/Testimonial";
import Hamburger from "./../Components/Hamburger";
import { useUser } from "../userContext";

const Home = () => {
  const [showHamburger, setShowHamburger] = React.useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#002233]">
      <Hamburger
        isOpen={showHamburger}
        onClose={() => setShowHamburger(false)}
      />
      <div
        className={`transition-all duration-300 ${
          showHamburger ? "ml-[25%]" : "ml-0"
        }`}
      >
        <Header
          showHamburger={showHamburger}
          setShowHamburger={setShowHamburger}
        />
        <Hero />
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;
