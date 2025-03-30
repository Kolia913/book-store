import { Purchase } from "~/server/database/models/Purchase";

export default defineEventHandler(async (event) => {
  const { orderReference, status } = await readBody(event);

  if (!orderReference) {
    throw createError({
      statusCode: 400,
      statusMessage: "orderReference is required",
    });
  }

  if (!["pending", "completed", "failed", "refunded"].includes(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid payment status",
    });
  }

  try {
    const purchase = await Purchase.findOne({
      where: { wayforpay_reference: orderReference },
    });

    if (!purchase) {
      throw createError({
        statusCode: 404,
        statusMessage: "Purchase not found for the given orderReference",
      });
    }

    const updateData = { payment_status: status };

    await purchase.update(updateData);

    return {
      success: true,
      purchase,
    };
  } catch (error) {
    console.error("Failed to update payment status:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update payment status",
      data: error.message,
    });
  }
});
