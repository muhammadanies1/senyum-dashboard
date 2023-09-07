import {render} from "@testing-library/react";

import Button from "./index";

describe("ComponentButton", () => {
	it("render button corrently", () => {
		const {getByText} = render(<Button variant="primary">Primary</Button>);

		// Check if the child element is present in the rendered output
		const testButtonComponent = getByText("Primary");
		expect(testButtonComponent).toBeInTheDocument();
	});
});
