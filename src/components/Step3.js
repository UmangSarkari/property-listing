import React, { useCallback, useState, useMemo } from "react";

import { Button, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useDropzone } from "react-dropzone";
import ImagePreview from "../molecules/ImagePreview";
import PropTypes from "prop-types";

import { STRINGS } from "../strings";

const styles = makeStyles(() => ({
  submitButton: {
    color: "white",
    borderRadius: 8,
    fontSize: 8,
    width: 100,
    margin: "3px 3px",
    padding: "6px 8px",
  },
  button: {
    color: "white",
    borderRadius: 16,
    width: 250,
    margin: "16px 5px",
    padding: "12px 16px",
  },
  error: {
    fontSize: "14px",
    textAlign: "center",
    color: "red",
  },
  step3: {
    marginTop: 20,
    borderTop: "1px dashed",
  },
  dragDrop: {
    padding: 20,
    border: "3px blue dashed",
    maxWidth: 400,
    borderRadius: 20,
  },
  submit: {
    marginTop: 20,
    flexDirection: "row",
  },
}));

const Step3 = ({ data }) => {
  let classes = styles();
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: Date.now(), src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
      "image/jpg": [".png", ".jpg", ".jpeg"],
    },
  });
  const showDragDrop = useMemo(() => images.length < 4, [images]);

  const onSubmit = useCallback(() => {
    if (!images.length) {
      setError(STRINGS.SELECT_IMAGE);
      return;
    }
    Object.keys(data).map((key) =>
      console.log(`${key.toUpperCase()} ----> `, data?.[key])
    );
    images.map((image, index) =>
      console.log("Image #", index + 1, " ---->", image.src)
    );
  }, [images, data]);

  const onFeatured = useCallback(
    (e, id) => {
      if (featured === id) {
        setFeatured(null);
      } else {
        setFeatured(id);
      }
    },
    [featured]
  );

  return (
    <div id="step3" className={classes.step3}>
      <ImagePreview
        images={images}
        onFeatured={onFeatured}
        featured={featured}
      />
      {showDragDrop && (
        <div {...getRootProps()} className={classes.dragDrop}>
          <input {...getInputProps()} />
          <p>{STRINGS.DRAG_DROP}</p>
          <Button
            className={classes.submitButton}
            color="primary"
            variant={"contained"}
          >
            Click to Select
          </Button>
        </div>
      )}
      {error && (
        <Typography variant="h6" className={classes.error}>
          {error}
        </Typography>
      )}
      <Button
        className={classes.button}
        color="primary"
        variant={"contained"}
        onClick={onSubmit}
        disabled={!images.length}
      >
        Submit
      </Button>
    </div>
  );
};

Step3.propTypes = {
  data: PropTypes.object,
};

export default Step3;
