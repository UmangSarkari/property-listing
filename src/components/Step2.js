import React, { useState, useCallback, useMemo } from "react";
import {
  Button,
  FormControl,
  Typography,
  FormLabel,
  OutlinedInput,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";

import { STRINGS } from "../strings";

const styles = makeStyles((theme) => ({
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
  input: {
    borderRadius: 14,
    maxWidth: 400,
    fontWeight: 500,
  },
  label: {
    margin: "6px 10px",
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "500",
    color: "black",
  },
  step2: {
    marginTop: 20,
  },
  submit: {
    marginTop: 20,
    flexDirection: "row",
  },
}));

const FormField = ({ label, error, children }) => {
  let classes = styles();
  return (
    <FormControl fullWidth>
      <FormLabel>
        <Typography className={classes.label}>{label}</Typography>
        {children}
        {error && (
          <Typography variant="h6" className={classes.error}>
            {error}
          </Typography>
        )}
      </FormLabel>
    </FormControl>
  );
};

const Step2 = ({ data = {}, setData, setStep3 }) => {
  const [error, setError] = useState({});
  let classes = styles();

  const checkValidations = useCallback((data) => {
    let errors = {};
    if (!data?.address) {
      errors["address"] = STRINGS.ADDRESS_REQUIRED;
    } else {
      delete errors["address"];
    }
    if (!data?.bedroom || data.bedroom > 10) {
      errors["bedroom"] = STRINGS.BEDROOM_VALIDATION;
    } else {
      delete errors["bedroom"];
    }
    if (!data?.bathroom || data.bathroom > 5) {
      errors["bathroom"] = STRINGS.BATHROOM_VALIDATION;
    } else {
      delete errors["bathroom"];
    }
    if (Object.keys(errors).length) {
      setError(errors);
    } else {
      return true;
    }
  }, []);

  const submit = useCallback(() => {
    if (checkValidations(data)) {
      setStep3(true);
    }
  }, [data, setStep3]);

  const handleData = useCallback((value, key) => {
    setData((prevState) => ({
      ...prevState,
      [key]: ["bedroom", "bathroom"].includes(key) ? Number(value) : value,
    }));
  }, []);

  const isSubmitDisabled = useMemo(
    () => !data?.address || !data?.bedroom || !data?.bathroom,
    [data]
  );

  return (
    <div id="step2" className={classes.step2}>
      <FormField label={STRINGS.ADDRESS} error={error?.address}>
        <OutlinedInput
          id="address"
          type="text"
          onChange={(e) => handleData(e.target.value, "address")}
          fullWidth
          className={`${classes.input}`}
          value={data?.address}
          //   error={error?.address}
          placeholder={STRINGS.ENTER_ADDRESS}
        />
      </FormField>
      <FormField label={STRINGS.BEDROOM} error={error?.bedroom}>
        <OutlinedInput
          id="bedroom"
          type="number"
          onChange={(e) => handleData(e.target.value, "bedroom")}
          fullWidth
          className={`${classes.input}`}
          value={data?.bedroom}
          //   error={error?.bedroom}
          placeholder={STRINGS.ENTER_BEDROOMS}
        />
      </FormField>
      <FormField label={STRINGS.BATHROOM} error={error?.bathroom}>
        <OutlinedInput
          id="bathroom"
          type="number"
          onChange={(e) => handleData(e.target.value, "bathroom")}
          fullWidth
          className={`${classes.input}`}
          value={data?.bathroom}
          //   error={error?.bathroom}
          placeholder={STRINGS.ENTER_BATHROOM}
        />
      </FormField>
      <FormField label={STRINGS.DESCRIPTION} error={error?.description}>
        <OutlinedInput
          id="description"
          type="text"
          onChange={(e) => handleData(e.target.value, "description")}
          fullWidth
          className={`${classes.input}`}
          value={data?.description}
          error={error?.description}
          placeholder={STRINGS.ENTER_DESCRIPTION}
          multiline
        />
      </FormField>
      <Button
        className={`${classes.button} ${classes.submit}`}
        onClick={submit}
        color="primary"
        variant={"contained"}
        disabled={isSubmitDisabled}
      >
        Submit
      </Button>
    </div>
  );
};

Step2.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  setStep3: PropTypes.func,
};

export default Step2;
