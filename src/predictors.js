// Methods
const checkIsInTimeRange = (state) => ({
  isInRegulatedTime: (requestedHour) => {
    return state.timeRanges
      .map(
        (range) => requestedHour <= range.end && requestedHour >= range.start
      )
      .reduce((acc, current) => acc || current);
  },
});

const checkIsInRegulatedDay = (state) => ({
  isInRegulatedDay: (UTCDay, plateLastDigit) =>
    state.platesNotCirculateByUTCDay[UTCDay].includes(plateLastDigit),
});

const TimeRangesToDecimalHours = (timeranges) => {
  return timeranges.map((range) => {
    return Object.keys(range).reduce((acc, item) => {
      const [hours, minutes] = range[item].split(":");
      return {
        ...acc,
        [item]: parseInt(hours, 10) + parseInt(minutes, 10) / 60,
      };
    }, {});
  });
};

// predictor
const circulationPredictor = (
  timeRangesUnderControl,
  platesNotCirculateByUTCDay
) => {
    const state = {
      timeRanges: TimeRangesToDecimalHours(timeRangesUnderControl),
      platesNotCirculateByUTCDay,
    };
    return {
      ...checkIsInTimeRange(state),
      ...checkIsInRegulatedDay(state),
    };
};

module.exports.TimeRangesToDecimalHours = TimeRangesToDecimalHours;
module.exports.circulationPredictor = circulationPredictor;
