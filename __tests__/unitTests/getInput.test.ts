let stdin = require("mock-stdin").stdin();
const mockedData = require("../../__mocks__/inputString.json");
import { getInputString } from "../../src/stringSanitizer/getInput";

describe("getInput", () => {
	beforeEach(() => {
		stdin = require("mock-stdin").stdin();
	});

	it("returns correct simple data input", async () => {
		
		process.nextTick(() => {
			stdin.send(`${mockedData.simpleData}\r`);
		});
		process.nextTick(() => {
			stdin.end();
		});
		
		const getInputStringObject = new getInputString();
		const result = await getInputStringObject.inputString();

		expect(result).toBe(mockedData.simpleData);
	});
});