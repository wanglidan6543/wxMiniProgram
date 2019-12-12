function amountToString(amount) {
  if (typeof(amount) !== "number") {
    amount = Number(amount);
  }

  if (amount.toString().indexOf('.') !== -1) {
    amount = amount.toFixed(2);
  }

  let amountStr = '';
  amount = amount.toString();

  let count = 0;
  let index = amount.indexOf('.');
  if (index === -1) {
    for (let i = amount.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        amountStr = amount.charAt(i) + ',' + amountStr;
      } else {
        amountStr = amount.charAt(i) + amountStr;
      }
      count++;
    }
    amountStr += '.00';
  } else { 
    amountStr = amount.substring(index);
    for (let i = amount.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        amountStr = amount.charAt(i) + ',' + amountStr;
      } else {
        amountStr = amount.charAt(i) + amountStr;
      }
      count++;
    }
  }
  return amountStr;
}

function amountStrToNumber(amountStr) {
  let result = amountStr.replace(new RegExp(',', 'g'), '');
  let amount = Number(result);
  if (isNaN(amount)) {
    amount = 0;
  }
  return amount;
}

module.exports = { amountToString, amountStrToNumber};