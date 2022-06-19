import { render } from "@testing-library/react";
import Step2 from "./Step2";

test("Renders Step2 Correctly", () => {
  const data = {
    address: "Sothe Africa",
    bedroom: 4,
    bathroom: 2,
    description: "Lucky you to get the optional description here.",
  };
  const setData = jest.fn();
  const setStep3 = jest.fn();
  const { asFragment } = render(
    <Step2 data={data} setData={setData} setStep3={setStep3} />
  );
  expect(asFragment()).toMatchSnapshot();
});
