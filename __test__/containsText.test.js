import { containsText } from "../src/client/js/textChecker"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the containsText functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Enters the text 'This is text' and expects the return value of true", () => {
           expect(containsText("This is text")).toBeTruthy();
    });

    test("Enters the text '' and expects the return value of false", () => {
        expect(containsText("")).toBeFalsy();
    });

});