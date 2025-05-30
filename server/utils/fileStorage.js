import consola from "consola";
import fs from "fs/promises";
import path from "path";

/**
 * Stores a file in the `public/uploads/` directory.
 * @param {Object} file - The file object (from multipart form).
 * @returns {Promise<Object>} - File path.
 */
export async function addFile(file) {
  const dateNow = new Date();
  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(
      uploadDir,
      `${file.filename}_${dateNow.toISOString()}.${file.filename
        .split(".")
        .at(-1)}`
    );
    await fs.writeFile(filePath, file.data);

    return {
      path: `/uploads/${file.filename}_${dateNow.toISOString()}.${file.filename
        .split(".")
        .at(-1)}`,
    };
  } catch (error) {
    throw new Error(`Error adding file: ${error.message}`);
  }
}

/**
 * Stores a files in the `public/uploads/` directory.
 * @param {Array} files - The file object (from multipart form).
 * @returns {Promise<Object>} - File paths.
 */
export async function bulkAddFiles(files) {
  try {
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(addFile(file));
    }
    const paths = await Promise.all(fileUploadPromises);
    return {
      paths: paths.map((item) => item.path),
    };
  } catch (error) {
    throw new Error(`Error adding files: ${error.message}`);
  }
}

/**
 * Deletes a file from `public/uploads/`.
 * @param {string} path - The path of the file to delete.
 * @returns {Promise<Object>} - Success message and file path.
 */
export async function removeFile(imagePath) {
  try {
    const filePath = path.join(process.cwd(), "public", imagePath);
    await fs.unlink(filePath);
    return {
      path: imagePath,
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      consola.error(
        `File: "/public${imagePath}" not found. Deletion skipped for this file`
      );
    } else {
      throw new Error(`Error removing file: ${error.message}`);
    }
  }
}

/**
 * Deletes files from `public/uploads/`.
 * @param {Array} paths - The paths of the files to delete.
 * @returns {Promise<Object>} - Success message and file path.
 */
export async function bulkRemoveFiles(paths) {
  try {
    const fileRemovePromises = [];
    for (const path of paths) {
      fileRemovePromises.push(removeFile(path));
    }
    const removedPaths = await Promise.all(fileRemovePromises);
    return {
      paths: removedPaths.filter((item) => !!item).map((item) => item.path),
    };
  } catch (error) {
    throw new Error(`Error removing files: ${error.message}`);
  }
}

/**
 * Replaces files `public/uploads/`.
 * @param {Array} oldFilesPaths - The paths of the files to delete.
 * @param {Array} newFiles - The paths of add.
 * @returns {Promise<Object>} - New files paths.
 */
export async function replaceFiles(oldFilesPaths, newFiles) {
  try {
    await bulkRemoveFiles(oldFilesPaths);
    const newFilesPaths = await bulkAddFiles(newFiles);
    return {
      paths: newFilesPaths.paths,
    };
  } catch (error) {
    throw new Error(`Error replacing files: ${error.message}`);
  }
}
