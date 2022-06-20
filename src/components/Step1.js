import React, { useState, useRef, useCallback } from "react";

import { Button, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PapaParse from "papaparse";
import PropTypes from "prop-types";

import { ALLOWED_EXTENTIONS } from "../constants";
import { STRINGS } from "../strings";

const styles = makeStyles(() => ({
  button: {
    color: "white",
    borderRadius: 16,
    width: 250,
    margin: "6px 5px",
    padding: "12px 16px",
  },
  error: {
    fontSize: "14px",
    textAlign: "center",
    color: "red",
  },
}));

const Step1 = ({ setData, setStep2, setStep3 }) => {
  let classes = styles();
  const [csvError, setCsvError] = useState("");
  const inputRef = useRef(null);

  const addManually = useCallback(() => {
    setData({});
    setCsvError("");
    setStep3(false);
    setStep2(false);
    setTimeout(() => setStep2(true), 0);
  }, []);

  const uploadCsv = useCallback(() => {
    setData({});
    setStep2(false);
    setStep3(false);
    setCsvError("");
    inputRef.current.click();
  }, [inputRef]);

  const handleFileChange = useCallback((e) => {
    setCsvError("");
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      e.target.value = "";

      const fileExtension = inputFile?.type.split("/")[1];
      if (!ALLOWED_EXTENTIONS.includes(fileExtension)) {
        setCsvError(STRINGS.INPUT_CSV);
        return;
      }

      const reader = new FileReader();

      reader.onload = async ({ target }) => {
        const csv = PapaParse.parse(target.result, { header: false });
        const parsedData = csv?.data;
        if (!parsedData || !parsedData.length) {
          setCsvError(STRINGS.NO_DATA_CSV);
          return;
        }
        const columns = parsedData[0];
        if (columns.length !== 4) {
          setCsvError(STRINGS.CSV_COLUMNS);
          return;
        }
        let [address, bedroom, bathroom, description] = columns;
        bedroom = Number.isNaN(Number(bedroom)) ? 0 : Number(bedroom);
        bathroom = Number.isNaN(Number(bathroom)) ? 0 : Number(bathroom);
        setData({ address, bedroom, bathroom, description });
        setStep2(true);
      };
      reader.readAsText(inputFile);
    }
  }, []);

  return (
    <div>
      <Button
        className={classes.button}
        onClick={addManually}
        color="primary"
        variant={"contained"}
      >
        Add Manually
      </Button>
      <Button
        className={classes.button}
        onClick={uploadCsv}
        color="primary"
        variant={"contained"}
      >
        Upload CSV
      </Button>
      {csvError && (
        <Typography className={classes.error} color="textSecondary">
          {csvError}
        </Typography>
      )}
      <input onChange={handleFileChange} ref={inputRef} type="file" hidden />
    </div>
  );
};

Step1.propTypes = {
  setData: PropTypes.func,
  setStep2: PropTypes.func,
  setStep3: PropTypes.func,
};

export default Step1;
