import { useCallback, Fragment } from "react";
import { Checkbox } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Image from "../atoms/Image";
import PropTypes from "prop-types";

const styles = makeStyles(() => ({
  list: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: 450,
    margin: 10,
    flexDirection: "column",
  },
}));

const ImagePreview = ({ images, onFeatured, featured }) => {
  let classes = styles();
  const renderImage = useCallback(
    (image) => {
      return (
        <Fragment key={`${image.id}-image`}>
          <Image image={image} />
          <Checkbox
            checked={featured === image.id}
            onChange={(e) => onFeatured(e, image.id)}
          />
        </Fragment>
      );
    },
    [onFeatured]
  );

  return <section className={classes.list}>{images.map(renderImage)}</section>;
};

ImagePreview.propTypes = {
  images: PropTypes.array,
  onFeatured: PropTypes.func,
  featured: PropTypes.number,
};

export default ImagePreview;
