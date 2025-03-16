import { defineStore } from 'pinia';
import { ref } from 'vue';
import useAdminRequest from '../core/composables/useAdminRequest';

export default defineStore('filemanager', () => {
  const adminRequest = useAdminRequest();
  const disk = ref('');

  async function getAllFiles() {
    try {
      const result = await adminRequest.get({ url: '/file-manager/full-content' });
      return result.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function getFilemanagerTree() {
    try {
      const result = await adminRequest.get({ url: '/file-manager/tree' });
      disk.value = 'public';
      return result.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async function uploadFile({ disk, path, overwrite, files }) {
    try {
      const data = new FormData();
      files.map((item) => {
        data.append('files[]', item);
      });
      data.append('disk', disk);
      data.append('overwrite', overwrite);
      data.append('path', path);
      // console.log('payload - ', payload);
      const result = await adminRequest.post({
        url: '/file-manager/upload',
        data,
        options: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      });
      return result.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async function renameFile(payload) {
    console.log('payload - ', payload);
    try {
      const result = await adminRequest.post({
        url: '/file-manager/rename',
        data: payload,
        options: {
          headers: {
            'content-type': 'application/json',
          },
        },
      });
      return result.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async function createFolder(payload) {
    try {
      const result = await adminRequest.post({
        url: '/file-manager/create-directory',
        data: payload,
      });
      return result.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  async function deleteFile(payload) {
    try {
      const result = await adminRequest.post({
        url: '/file-manager/delete',
        data: payload,
      });
      return result.data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return {
    disk,
    getAllFiles,
    getFilemanagerTree,
    uploadFile,
    renameFile,
    createFolder,
    deleteFile,
  };
});
