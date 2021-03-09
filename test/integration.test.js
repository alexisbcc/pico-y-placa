const { plateInput, timeInput, dateInput } = require("../src/inputs");
const { circulationPredictor } = require("../src/predictors");

describe("Integration with predictors and inputs", () => {
  let plateValidator, dateValidator, timeValidator;
  beforeEach(() => {
    const platesNotCirculateByUTCDay = {
      0: [],
      1: [0, 1, 2, 3],
      2: [2, 3, 4, 5],
      3: [4, 5, 6, 7],
      4: [6, 7, 8, 9],
      5: [0, 1, 8, 9],
      6: [],
    };
    const ranges = [
      {
        start: "5:00",
        end: "8:24",
      },
      {
        start: "12:18",
        end: "18:24",
      },
    ];
    predictorObj = circulationPredictor(ranges, platesNotCirculateByUTCDay);
    plateValidator = (input) => /^[a-zA-Z]{3}[-\s.][0-9]{3,4}$/gm.test(input);
    dateValidator = (input) =>
      /^[0-9]{4}[/.][0-9]{1,2}[/.][0-9]{1,2}$/gm.test(input);
    timeValidator = (input) => /^[0-9]{1,2}[:.][0-9]{1,2}$/gm.test(input);
  });
  test("Should check if is in time range and in day with circulation restrictions", () => {
    const plate = "afk-4545";
    const time = "15:0";
    const date = "2021/3/2";

    plateObject = plateInput(plate, plateValidator);
    dateObject = dateInput(date, dateValidator);
    timeObject = timeInput(time, timeValidator);

    const lastDigit = plateObject.getLastDigit();
    const utcDay = dateObject.getWeekDay();
    const decimalHour = timeObject.toDecimalHour();

    expect(predictorObj.isInRegulatedTime(decimalHour)).toBe(true);
    expect(predictorObj.isInRegulatedDay(utcDay, lastDigit)).toBe(true);
  });
});
