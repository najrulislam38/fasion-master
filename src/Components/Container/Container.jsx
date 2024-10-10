import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className="container mx-auto px-5 md:px-10">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
