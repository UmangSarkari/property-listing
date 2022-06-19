import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

const styles = makeStyles(() => ({
  img: {
    height: "100%",
    width: 200,
    padding: 5,
    objectFit: "cover",
  },
}));

const Image = ({ image }) => {
  const classes = styles();
  return (
    <img alt={`img - ${image.id}`} src={image.src} className={classes.img} />
  );
};

Image.propTypes = {
  image: PropTypes.object,
};

export default Image;
