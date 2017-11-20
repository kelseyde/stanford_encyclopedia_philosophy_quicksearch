var autocomplete = function(input, options) {
  var inputFoundAtStart = [];
  var inputFoundInMiddle = [];
  for (var i = 0; i < options.length; i++) {
    if (options[i].title.toLowerCase().startsWith(input.toLowerCase())) {
      inputFoundAtStart.push(options[i]);
    } else if (options[i].title.toLowerCase().includes(input.toLowerCase())) {
      inputFoundInMiddle.push(options[i]);
    }
  }
  var results = inputFoundAtStart.concat(inputFoundInMiddle);
  return results;
}

module.exports = autocomplete;
