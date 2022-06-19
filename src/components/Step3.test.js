import { render } from "@testing-library/react";
import Step3 from "./Step3";

test("Renders Step2 Correctly", () => {
  const data = {
    address: "Sothe Africa",
    bedroom: 4,
    bathroom: 2,
    description: "Lucky you to get the optional description here.",
  };
  const { asFragment } = render(<Step3 data={data} />);
  expect(asFragment()).toMatchSnapshot();
});
