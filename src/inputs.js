// Methods
const getPlateLastDigit = (state) => ({
  getLastDigit: () =>
    state.isValid ? parseInt(state.value.charAt(state.value.length - 1)) : -1,
});

const convertToDecimalHour = (state) => ({
  toDecimalHour: () => {
    const time = state.value.split(":");
    return state.isValid
      ? parseInt(time[0], 10) + parseInt(time[1], 10) / 60
      : -1;
  },
});

const getDayOfWeek = (state) => ({
  getWeekDay: () => {
    const [year, month, day] = state.value
      .split("/")
      .map((val) => parseInt(val, 10));
    const date = new Date(year, month - 1, day);
    return state.isValid ? date.getUTCDay() : -1;
  },
});

// User input
const userInput = (value, validator) => ({
  value,
  isValid: validator(value),
});

// Plate input factory
const plateInput = (value, validator) => {
  const state = userInput(value, validator);

  return { ...state, ...getPlateLastDigit(state) };
};

// Time input factory
const timeInput = (value, validator) => {
  const state = userInput(value, validator);

  return { ...state, ...convertToDecimalHour(state) };
};

// Date input factory
const dateInput = (value, validator) => {
  const state = userInput(value, validator);

  return { ...state, ...getDayOfWeek(state) };
};

module.exports.plateInput = plateInput;
module.exports.timeInput = timeInput;
module.exports.dateInput = dateInput;
