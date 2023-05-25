const getDecimalSeparator = (el) => {
  let dec = el.getAttribute("decimal");
  if (dec === "" || !dec) return ".";
  return dec;
};

const getNumberSeparator = (el) => {
  if (el.getAttribute("decimal") === ",") return ".";
  return ",";
};

const els = document.querySelectorAll("[dynamic-counter]");
let testStrings = [];
els.forEach((el) => {
  testStrings.push({
    id: 1,
    el: el,
    text: el.innerText,
    prefix: null,
    suffix: null,
    number: null,
    decimal: getDecimalSeparator(el),
    separator: getNumberSeparator(el)
  });
});
const regex = /^(?<prefix>[^\d]*)(?<number>[0-9]+(?:[,.][0-9]+)?)(?<suffix>[^\d]*)$/;
var updatedArray = testStrings.filter((str) => {
  const match = regex.exec(str.text);
  if (match) {
    str.prefix = match?.groups?.prefix;
    str.number = parseFloat(match?.groups?.number);
    str.suffix = match?.groups?.suffix;
    return true; // Include the element in the updated array
  } else {
    return false; // Exclude the element from the updated array
  }
});
testStrings = updatedArray;
const counterMetrics = testStrings.map(
  ({ el, text, format, separator, prefix, suffix, number, decimal }) => {
    let decimalPlaces;
    if (number % 1 !== 0) {
      decimalPlaces = number.toString().split(".")[1].length;
    } else {
      decimalPlaces = 0;
    }
    const obj = {
      target: el,
      startVal: 0,
      endVal: number,
      duration: 3,
      decimalPlaces,
      prefix,
      suffix,
      separator,
      // useGrouping: false,
      decimal
    };

    return obj;
  }
);

const metrics = counterMetrics;

function createCountUpInstance({ target, ...options }) {
  return new countUp.CountUp(target, options.endVal, {
    enableScrollSpy: true,
    scrollSpyOnce: true,
    ...options
  });
}

metrics.forEach((metric) => {
  createCountUpInstance(metric);
});
//code for dynamic counter ends here
