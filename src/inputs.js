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
    const [year, month, day] = state.value.split("/");
    const date = new Date(year, month - 1, day);
    return state.isValid ? date.getUTCDay() : -1;
  },
});

// Plate input factory
const plateInput = (value, validator) => {
  let state = {
    value,
    isValid: validator(value),
  };

  return { ...state, ...getPlateLastDigit(state) };
};

// Time input factory
const timeInput = (value, validator) => {
  let state = {
    value,
    isValid: validator(value),
  };

  return { ...state, ...convertToDecimalHour(state) };
};

// Date input factory
const dateInput = (value, validator) => {
  let state = {
    value,
    isValid: validator(value),
  };

  return { ...state, ...getDayOfWeek(state) };
};

module.exports.plateInput = plateInput;
module.exports.timeInput = timeInput;
module.exports.dateInput = dateInput;
