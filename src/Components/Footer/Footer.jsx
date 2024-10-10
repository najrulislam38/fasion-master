import React from "react";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 border-gray-300">
      <Container>
        <div className="text-sm text-center ">
          <small className="text-sm text-gray-600">
            Copyright © {new Date().getFullYear()} - All right reserved by
            <span className="font-medium uppercase text-primary">
              {" "}
              fashion master
            </span>
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
