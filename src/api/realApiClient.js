import { apiClient } from './apiClient';

export const apiClient = {
  auth: {
    me: async () => {
      const response = await apiClient.get('/auth/me');
      return response.data.user;
    },
    logout: async (redirectUrl) => {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('token');
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    },
    redirectToLogin: async (returnUrl) => {
      window.location.href = `/login?return=${encodeURIComponent(returnUrl)}`;
    }
  },
  entities: {
    UploadedFile: {
      list: async (sortBy) => {
        const params = sortBy ? { sort: sortBy } : {};
        const response = await apiClient.get('/files', { params });
        return response.data.files.map(file => ({
          id: file._id,
          name: file.originalName,
          file_type: file.fileType,
          size_bytes: file.size,
          is_favorite: file.isFavorite,
          created_date: file.createdAt
        }));
      },
      update: async (fileId, updates) => {
        const response = await apiClient.put(`/files/${fileId}`, updates);
        return {
          id: response.data.file._id,
          name: response.data.file.originalName,
          file_type: response.data.file.fileType,
          size_bytes: response.data.file.size,
          is_favorite: response.data.file.isFavorite,
          created_date: response.data.file.createdAt
        };
      },
      delete: async (fileId) => {
        await apiClient.delete(`/files/${fileId}`);
        return { success: true };
      },
      create: async (fileData) => {
        const formData = new FormData();
        formData.append('file', fileData.file);

        const response = await apiClient.post('/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        return {
          id: response.data.file._id,
          name: response.data.file.originalName,
          file_type: response.data.file.fileType,
          size_bytes: response.data.file.size,
          is_favorite: response.data.file.isFavorite,
          created_date: response.data.file.createdAt
        };
      }
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post('/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        return {
          file_url: `${apiClient.defaults.baseURL}/files/download/${response.data.file.name}`,
          file_name: response.data.file.originalName,
          file_size: response.data.file.size
        };
      }
    }
  }
};