import crypto from "crypto";

export const createWayforpaySignature = (data, fields) => {
  const secretKey = process.env.WAYFORPAY_SECRET_KEY;
  const signatureString = fields.map((field) => data[field]).join(";");
  return crypto
    .createHmac("md5", secretKey)
    .update(signatureString)
    .digest("hex");
};

export const makeWayforpayRequest = async (requestData) => {
  const apiUrl = "https://api.wayforpay.com/api";

  let signatureFields;
  switch (requestData.transactionType) {
    case "CHECK_STATUS":
      signatureFields = ["merchantAccount", "orderReference"];
      break;
    default:
      signatureFields = ["merchantAccount", "orderReference"];
  }

  const merchantSignature = createWayforpaySignature(
    requestData,
    signatureFields
  );

  const requestBody = {
    ...requestData,
    merchantSignature,
    apiVersion: 1,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Wayforpay request failed: ${response.statusText}`);
  }

  const responseData = await response.json();

  const expectedSignatureFields = [
    "merchantAccount",
    "orderReference",
    "amount",
    "currency",
    "authCode",
    "cardPan",
    "transactionStatus",
    "reasonCode",
  ];

  const expectedSignature = createWayforpaySignature(
    responseData,
    expectedSignatureFields
  );
  if (responseData.merchantSignature !== expectedSignature) {
    throw new Error("Invalid response signature from Wayforpay");
  }

  return responseData;
};
