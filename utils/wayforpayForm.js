export function createWayforpayForm(paymentData) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://secure.wayforpay.com/pay";
  form.style.display = "none";
  form.target = "_blank";

  const flatData = {};
  Object.keys(paymentData).forEach((key) => {
    if (Array.isArray(paymentData[key])) {
      paymentData[key].forEach((value, index) => {
        flatData[`${key}[${index}]`] = value;
      });
    } else {
      flatData[key] = paymentData[key];
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
