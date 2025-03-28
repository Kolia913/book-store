import { Purchase } from "~/server/database/models/Purchase";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const merchantSignature = body.merchantSignature;
  const calculatedSignature = createWayforpaySignature(body);

  if (merchantSignature !== calculatedSignature) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid signature",
    });
  }

  const purchase = await Purchase.findOne({
    where: {
      id: body.orderReference,
    },
  });

  if (!purchase) {
    throw createError({
      statusCode: 404,
      statusMessage: "Purchase not found",
    });
  }

  let updateData = {
    payment_status: "failed",
    payment_details: JSON.stringify(body),
    is_processed: false,
  };

  switch (body.transactionStatus) {
    case "Approved":
      updateData.payment_status = "completed";
      updateData.is_processed = true;
      break;
    case "Refunded":
      updateData.payment_status = "refunded";
      break;
    case "Pending":
      updateData.payment_status = "pending";
      break;
    case "Expired":
      updateData.payment_status = "failed";
      break;
  }

  await purchase.update(updateData);

  if (updateData.payment_status === "completed") {
    await sendPurchaseConfirmation(purchase);
  }

  return {
    orderReference: body.orderReference,
    status: "accept",
    time: Math.floor(Date.now() / 1000),
  };
});

function createWayforpaySignature(body) {
  const secretKey = useRuntimeConfig().wayforpaySecretKey;
  const signatureString = [
    body.merchantAccount,
    body.orderReference,
    body.amount,
    body.currency,
    body.authCode,
    body.cardPan,
    body.transactionStatus,
    body.reasonCode,
  ].join(";");

  return crypto
    .createHmac("md5", secretKey)
    .update(signatureString)
    .digest("hex");
}
