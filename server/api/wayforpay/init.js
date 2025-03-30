import crypto from "crypto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (
      !body?.orderReference ||
      !body?.amount ||
      !Array.isArray(body?.cartItems) ||
      !body?.clientFirstName ||
      !body?.clientLastName ||
      !body?.clientPhone
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Missing or invalid order data",
      });
    }

    const {
      orderReference,
      amount,
      cartItems,
      clientFirstName,
      clientLastName,
      clientPhone,
    } = body;

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

    const paymentDate = Math.floor(Date.now() / 1000);
    const domainName = "obert.com.ua";

    const signatureString = [
      requiredConfig.merchantAccount,
      domainName,
      orderReference,
      paymentDate,
      amount,
      "UAH",
      ...productNames,
      ...productCounts,
      ...productPrices,
    ].join(";");

    function generateHmacMd5(string, key) {
      return crypto.createHmac("md5", key).update(string).digest("hex");
    }

    const merchantSignature = generateHmacMd5(
      signatureString,
      requiredConfig.secretKey
    );

    return {
      widgetData: {
        merchantAccount: requiredConfig.merchantAccount,
        merchantDomainName: domainName,
        authorizationType: "SimpleSignature",
        merchantSignature,
        orderReference,
        orderDate: paymentDate,
        amount,
        currency: "UAH",
        productName: productNames,
        productPrice: productPrices,
        productCount: productCounts,
        clientFirstName,
        clientLastName,
        clientPhone,
        serviceUrl: requiredConfig.serviceUrl,
        language: "UA",
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
