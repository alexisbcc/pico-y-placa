const {
  circulationPredictor,
  TimeRangesToDecimalHours,
} = require("../src/predictors");

describe("Validation of ranges conversion", () => {
  test("Should generate time ranges in decimal hours", () => {
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
    expect(TimeRangesToDecimalHours(ranges)).toEqual([
      {
        start: 5,
        end: 8.4,
      },
      {
        start: 12.3,
        end: 18.4,
      },
    ]);
  });
});

describe("Validation of predictor", () => {
  let predictorObj;
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
  });

  test("Should check if is inside time range", () => {
    const time = 5.1;

    expect(predictorObj.isInRegulatedTime(time)).toBe(true);
  });

  test("Should check if is not inside time range", () => {
    const time = 4.1;

    expect(predictorObj.isInRegulatedTime(time)).toBe(false);
  });

  test("Should check if is not in circulation day", () => {
    const plateLastDigit = 5;
    const utcDay = 0;
    expect(predictorObj.isInRegulatedDay(utcDay, plateLastDigit)).toBe(false);
  });

  test("Should check if is in circulation day", () => {
    const plateLastDigit = 5;
    const utcDay = 3;
    expect(predictorObj.isInRegulatedDay(utcDay, plateLastDigit)).toBe(true);
  });

  test("Should check if is in circulation day", () => {
    const plateLastDigit = 5;
    const utcDay = 3;
    expect(predictorObj.isInRegulatedDay(utcDay, plateLastDigit)).toBe(true);
  });
});
