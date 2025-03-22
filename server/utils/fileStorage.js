import consola from "consola";
import fs from "fs/promises";
import path from "path";

/**
 * Determines the correct upload directory based on the environment.
 * - In development, it writes to `public/uploads/` in the project root.
 * - In production, it writes to `.output/public/uploads/`.
 */
const getUploadDir = () => {
  return process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), ".output/public/uploads")
    : path.join(process.cwd(), "public/uploads");
};

/**
 * Stores a file in the appropriate `uploads/` directory.
 * @param {Object} file - The file object (from multipart form).
 * @returns {Promise<Object>} - File path.
 */
export async function addFile(file) {
  const dateNow = new Date();
  try {
    const uploadDir = getUploadDir();
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExt = file.filename.split(".").at(-1);
    const fileName = `${file.filename}_${dateNow.toISOString()}.${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, file.data);

    return { path: `/uploads/${fileName}` };
  } catch (error) {
    throw new Error(`Error adding file: ${error.message}`);
  }
}

/**
 * Stores multiple files in the appropriate `uploads/` directory.
 * @param {Array} files - The file objects (from multipart form).
 * @returns {Promise<Object>} - File paths.
 */
export async function bulkAddFiles(files) {
  try {
    const paths = await Promise.all(files.map((file) => addFile(file)));
    return { paths: paths.map((item) => item.path) };
  } catch (error) {
    throw new Error(`Error adding files: ${error.message}`);
  }
}

/**
 * Deletes a file from the appropriate `uploads/` directory.
 * @param {string} imagePath - The path of the file to delete.
 * @returns {Promise<Object>} - Success message and file path.
 */
export async function removeFile(imagePath) {
  try {
    const filePath = path.join(getUploadDir(), path.basename(imagePath));
    await fs.unlink(filePath);
    return { path: imagePath };
  } catch (error) {
    if (error.code === "ENOENT") {
      consola.error(`File: "${imagePath}" not found. Skipping deletion.`);
    } else {
      throw new Error(`Error removing file: ${error.message}`);
    }
  }
}

/**
 * Deletes multiple files from the appropriate `uploads/` directory.
 * @param {Array} paths - The paths of the files to delete.
 * @returns {Promise<Object>} - Success message and file paths.
 */
export async function bulkRemoveFiles(paths) {
  try {
    const removedPaths = await Promise.all(
      paths.map((path) => removeFile(path))
    );
    return { paths: removedPaths.filter(Boolean).map((item) => item.path) };
  } catch (error) {
    throw new Error(`Error removing files: ${error.message}`);
  }
}

/**
 * Replaces files in the appropriate `uploads/` directory.
 * @param {Array} oldFilesPaths - The paths of the files to delete.
 * @param {Array} newFiles - The new files to add.
 * @returns {Promise<Object>} - New file paths.
 */
export async function replaceFiles(oldFilesPaths, newFiles) {
  try {
    await bulkRemoveFiles(oldFilesPaths);
    const newFilesPaths = await bulkAddFiles(newFiles);
    return { paths: newFilesPaths.paths };
  } catch (error) {
    throw new Error(`Error replacing files: ${error.message}`);
  }
}
