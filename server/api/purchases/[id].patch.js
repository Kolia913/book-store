import { Purchase } from "~/server/database/models/Purchase";

export default defineEventHandler(async (event) => {
  const purchaseId = getRouterParam(event, "id");
  const { status, payment_details = null } = await readBody(event);

  if (!["pending", "completed", "failed", "refunded"].includes(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid payment status",
    });
  }

  try {
    const purchase = await Purchase.findByPk(purchaseId);

    if (!purchase) {
      throw createError({
        statusCode: 404,
        statusMessage: "Purchase not found",
      });
    }

    const updateData = { payment_status: status };
    if (payment_details) {
      updateData.payment_details = payment_details;
    }

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
