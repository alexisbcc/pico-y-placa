const { plateInput, timeInput, dateInput } = require("./src/inputs");
const { circulationPredictor } = require("./src/predictors");

// User Inputs
const plate = "afk-123";
const date = "2021/03/9";
const time = "17:05";

// Inputs validators
const plateValidator = (input) => /^[a-zA-Z]{3}[-\s.][0-9]{3,4}$/gm.test(input);
const dateValidator = (input) =>
  /^[0-9]{4}[/][0-9]{1,2}[/][0-9]{1,2}$/gm.test(input);
const timeValidator = (input) => /^[0-9]{1,2}[:.][0-9]{1,2}$/gm.test(input);

// Input objects instantiation
const plateObject = plateInput(plate, plateValidator);
const dateObject = dateInput(date, dateValidator);
const timeObject = timeInput(time, timeValidator);

const isValidInputPlate = plateObject.isValid;
const isValidInputDate = dateObject.isValid;
const isValidInputTime = timeObject.isValid;

// Input logs
if (!isValidInputPlate) console.log("Invalid plate");
if (!isValidInputDate) console.log("Invalid date");
if (!isValidInputTime) console.log("Invalid time");

// Days and time ranges under regulations
const platesNotCirculateByUTCDay = {
  0: [],
  1: [0, 1, 2, 3],
  2: [2, 3, 4, 5],
  3: [4, 5, 6, 7],
  4: [6, 7, 8, 9],
  5: [0, 1, 8, 9],
  6: [],
};

// Time ranges that are under circulation control
const timeRangesUnderControl = [
  {
    start: "7:00",
    end: "9:30",
  },
  {
    start: "16:00",
    end: "19:30",
  },
];

// Predictors object instantiation
const predictor = circulationPredictor(
  timeRangesUnderControl,
  platesNotCirculateByUTCDay
);

// Log if can drive the specified day and time
if (isValidInputPlate && isValidInputDate && isValidInputTime) {
  // Check for dates and time ranges
  const isInStricDay = predictor.isInRegulatedDay(
    dateObject.getWeekDay(),
    plateObject.getLastDigit()
  );
  const isInStricHours = predictor.isInRegulatedTime(
    timeObject.toDecimalHour()
  );

  if (isInStricHours && isInStricDay) {
    console.log(
      `You CANNOT drive your car with plate: ${plateObject.value}, in ${dateObject.value} at ${timeObject.value}.`
    );
  } else {
    console.log(
      `You CAN drive your car with plate: ${plateObject.value}, in ${dateObject.value} at ${timeObject.value}.`
    );
  }
}
