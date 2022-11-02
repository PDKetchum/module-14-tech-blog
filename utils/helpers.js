module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // Formats the UTC date to string human readable version
  format_date: (date) => {
    return `${new Date(date).toDateString()}`;
  },
};
