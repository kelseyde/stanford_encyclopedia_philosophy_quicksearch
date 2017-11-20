var autocomplete = function(input, options) {
  var inputFoundAtStart = [];
  var inputFoundInMiddle = [];
  for (var i = 0; i < options.length; i++) {
    if (input === options[i].slice(0, input.length)) {
      inputFoundAtStart.push(options[i]);
    } else if (options[i].includes(input)) {
      inputFoundInMiddle.push(options(i));
    }
  }
  var results = inputFoundAtStart.concat(inputFoundInMiddle);
  return results;
}
