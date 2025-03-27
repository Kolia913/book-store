import crypto from "crypto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (
      !body?.orderReference ||
      !body?.amount ||
      !Array.isArray(body?.cartItems)
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Missing or invalid order data",
      });
    }

    const { orderReference, amount, cartItems } = body;

    for (const item of cartItems) {
      if (!item?.title || !item?.quantity || item?.cost === undefined) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "Invalid cart items format",
        });
      }
    }

    const runtimeConfig = useRuntimeConfig();

    const requiredConfig = {
      merchantAccount: runtimeConfig.wayforpayMerchantLogin,
      secretKey: runtimeConfig.wayforpaySecretKey,
      serviceUrl: runtimeConfig.wayforpayCallbackUrl,
    };

    for (const [key, value] of Object.entries(requiredConfig)) {
      if (!value) {
        throw createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
          message: `Missing configuration: ${key}`,
        });
      }
    }

    const productNames = cartItems.map((item) => item.title);
    const productCounts = cartItems.map((item) => item.quantity);
    const productPrices = cartItems.map((item) => item.cost);

    const signatureString = [
      requiredConfig.merchantAccount,
      "https://obert.com.ua/",
      orderReference,
      Math.floor(Date.now() / 1000),
      amount,
      "UAH",
      ...productNames,
      ...productCounts,
      ...productPrices,
    ].join(";");
    console.log("WayForPay Signature String:", signatureString);

    const merchantSignature = crypto
      .createHmac("md5", requiredConfig.secretKey)
      .update(signatureString)
      .digest("hex");

    console.log("WayForPay Merchant Signature:", merchantSignature);

    return {
      paymentData: {
        merchantAccount: requiredConfig.merchantAccount,
        merchantDomainName: "https://obert.com.ua/",
        merchantAuthType: "SimpleSignature",
        orderReference,
        orderDate: Math.floor(Date.now() / 1000),
        amount: amount,
        currency: "UAH",
        productName: productNames,
        productCount: productCounts,
        productPrice: productPrices,
        merchantSignature,
        serviceUrl: requiredConfig.serviceUrl,
      },
    };
  } catch (error) {
    console.error("[Wayforpay Error]", error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Payment processing failed",
    });
  }
});
