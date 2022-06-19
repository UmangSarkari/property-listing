import { render } from "@testing-library/react";
import Step1 from "./Step1";

test("Renders Step1 Correctly", () => {
  const setData = jest.fn();
  const setStep2 = jest.fn();
  const setStep3 = jest.fn();
  const { asFragment } = render(
    <Step1 setData={setData} setStep2={setStep2} setStep3={setStep3} />
  );
  expect(asFragment()).toMatchSnapshot();
});
