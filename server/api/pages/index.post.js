// import { Page } from "@/models";
// import Joi from "joi";

// const schema = Joi.object({
//   key: Joi.string().required(),
//   admin_title: Joi.string().required(),
//   title: Joi.string().required(),
//   content: Joi.string().required(),
// });

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event);

//   const { error } = schema.validate(body);
//   if (error) {
//     return { error: error.details[0].message };
//   }

//   let content;
//   try {
//     content = JSON.parse(body.content);
//   } catch (e) {
//     return { error: "Invalid JSON structure" };
//   }

//   await processImages(content);

//   const page = await Page.create({
//     key: body.key,
//     admin_title: body.admin_title,
//     title: body.title,
//     content: JSON.stringify(content),
//   });

//   return { message: "Page saved successfully", page };
// });

// async function processImages(data) {
//   for (const key in data) {
//     if (typeof data[key] === "object" && data[key] !== null) {
//       if (data[key].type === "image" && data[key].file) {
//         const fileUrl = await replaceFiles([data[key].value], [data[key].file]);
//         data[key].value = fileUrl;
//         delete data[key].file;
//       } else {
//         await processImages(data[key]);
//       }
//     }
//   }
// }
