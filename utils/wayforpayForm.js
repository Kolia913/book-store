export function createWayforpayForm(paymentData) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://secure.wayforpay.com/pay";
  form.style.display = "none";
  form.target = "_blank";

  const flatData = {};
  const extractedData = JSON.parse(JSON.stringify(paymentData.paymentData));
  Object.keys(extractedData).forEach((key) => {
    if (Array.isArray(extractedData[key])) {
      extractedData[key].forEach((value, index) => {
        flatData[`${key}[${index}]`] = value;
      });
    } else {
      flatData[key] = extractedData[key];
    }
  });

  Object.keys(flatData).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = flatData[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  console.log("WayForPay form data:", flatData);
  form.submit();
}
