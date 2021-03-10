const { plateInput, timeInput, dateInput } = require("../src/inputs");

describe("Validation of plate input", () => {
  let validator;
  beforeEach(() => {
    validator = (input) => /^[a-zA-Z]{3}[-\s.][0-9]{3,4}$/gm.test(input);
  });

  test("Should validate plate", () => {
    const plate = "afk-445";
    expect(plateInput(plate, validator).isValid).toBe(true);
  });

  test("Should not validate plate", () => {
    const plate = "af5k-445";
    expect(plateInput(plate, validator).isValid).toBe(false);
  });

  test("Should validate plate", () => {
    const plate = "afk-4545";
    expect(plateInput(plate, validator).isValid).toBe(true);
  });

  test("Should return a valid last digit plate", () => {
    const plate = "afk-445";
    expect(plateInput(plate, validator).getLastDigit()).toBe(5);
  });

  test("Should return a -1 last digit plate", () => {
    const plate = "afk-44h";
    expect(plateInput(plate, validator).getLastDigit()).toBe(-1);
  });

  test("Should return a valid last digit plate", () => {
    const plate = "afk-440";
    expect(plateInput(plate, validator).getLastDigit()).toBe(0);
  });
});

describe("Validation of time input", () => {
  let validator;
  beforeEach(() => {
    validator = (input) => /^[0-9]{1,2}[:.][0-9]{1,2}$/gm.test(input);
  });

  test("Should validate time input", () => {
    const time = "6:20";
    expect(timeInput(time, validator).isValid).toBe(true);
  });

  test("Should validate time input", () => {
    const time = "16:00";
    expect(timeInput(time, validator).isValid).toBe(true);
  });

  test("Should not validate time input", () => {
    const time = "16:d";
    expect(timeInput(time, validator).isValid).toBe(false);
  });

  test("Should convert time input to decimal hour", () => {
    const time = "16:6";
    expect(timeInput(time, validator).toDecimalHour()).toBe(16.1);
  });

  test("Should convert time input to decimal hour", () => {
    const time = "0:0";
    expect(timeInput(time, validator).toDecimalHour()).toBe(0);
  });

  test("Should convert time input to decimal hour -1", () => {
    const time = "j6:6l";
    expect(timeInput(time, validator).toDecimalHour()).toBe(-1);
  });
});

describe("Validation of date input", () => {
  let validator;
  beforeEach(() => {
    validator = (input) => {
      let isValidDate;
      if (/^[0-9]{4}[/][0-9]{1,2}[/][0-9]{1,2}$/gm.test(input)) {
        const [year, month, day] = input.split("/");
        const date = new Date(`${year}-${month}-${day} 00:00`);
        isValidDate = Boolean(+date) && date.getDate() == day;
      } else {
        isValidDate = false;
      }
      return isValidDate;
    };
  });

  test("Should validate time input", () => {
    const date = "2021/3/9";
    expect(dateInput(date, validator).isValid).toBe(true);
  });

  test("Should validate time input", () => {
    const date = "2021/3/01";
    expect(dateInput(date, validator).isValid).toBe(true);
  });

  test("Should not validate time input", () => {
    const date = "2021/3/129";
    expect(dateInput(date, validator).isValid).toBe(false);
  });

  test("Should not validate time input", () => {
    const date = "21/3/129";
    expect(dateInput(date, validator).isValid).toBe(false);
  });

  test("Should not validate time input", () => {
    const date = "2021-35/129";
    expect(dateInput(date, validator).isValid).toBe(false);
  });

  test("Should return week day", () => {
    const date = "2021/3/19";
    expect(dateInput(date, validator).getWeekDay()).toBe(5);
  });

  test("Should return week day", () => {
    const date = "2021/3/09";
    expect(dateInput(date, validator).getWeekDay()).toBe(2);
  });
});
