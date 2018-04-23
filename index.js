function trimValues(input) {
  if (input && input.constructor === Object) {
    for (let prop in input) {
      if (input[prop] && input[prop].constructor !== String) {
        return trimValues(input[prop]);
      }

      if (input[prop] && input[prop].constructor === String && input[prop].length) {
        input[prop] = input[prop].trim();
      }
    }
  } else if (input && input.constructor === Array && input.length) {
    input.forEach(item => trimValues(item));
  } else if (input && input.constructor === String && input.length) {
    input = input.trim();
  }
}

function expressTrimmer(req, res, next) {
  if (req.body) {
    trimValues(req.body);
  }

  if (req.params) {
    trimValues(req.params);
  }

  if (req.query) {
    trimValues(req.query);
  }

  next();
}

module.exports = expressTrimmer;
