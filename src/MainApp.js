import React, { useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

const styles = makeStyles(() => ({
  container: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 50,
    paddingBottom: 50,
  },
  listing: {
    width: "100%",
    fontSize: "20px",
    textAlign: "center",
    fontWeight: 700,
    color: "red",
  },
}));

const MainApp = () => {
  let classes = styles();
  const [data, setData] = useState({});
  const [showStep2, setStep2] = useState(false);
  const [showStep3, setStep3] = useState(false);

  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column ${classes.container}`}
    >
      <div className={classes.listing}>List your Property here</div>
      <Step1 setData={setData} setStep2={setStep2} setStep3={setStep3} />
      {showStep2 && <Step2 data={data} setData={setData} setStep3={setStep3} />}
      {showStep3 && <Step3 data={data} />}
    </div>
  );
};

export default MainApp;
