// Mock API Client
// Provides stub implementations for authentication and entity management

const mockUsers = new Map();
const mockFiles = new Map();
let fileCounter = 0;

// Mock authentication data
const currentUser = {
  id: 'user_123',
  email: 'user@example.com',
  name: 'User',
  role: 'user'
};

// Sample mock files
const sampleFiles = [
  {
    id: 'file_1',
    name: 'Report Q1.pdf',
    file_type: 'pdf',
    size_bytes: 2048576,
    is_favorite: false,
    created_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'file_2',
    name: 'Presentation.pptx',
    file_type: 'document',
    size_bytes: 5242880,
    is_favorite: true,
    created_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'file_3',
    name: 'vacation.jpg',
    file_type: 'image',
    size_bytes: 3145728,
    is_favorite: false,
    created_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

sampleFiles.forEach(f => mockFiles.set(f.id, f));

export const apiClient = {
  auth: {
    me: async () => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => resolve(currentUser), 300);
      });
    },
    logout: async (redirectUrl) => {
      // Simulate logout
      return new Promise((resolve) => {
        setTimeout(() => {
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
          resolve();
        }, 300);
      });
    },
    redirectToLogin: async (returnUrl) => {
      // Simulate redirect to login
      return new Promise((resolve) => {
        setTimeout(() => {
          window.location.href = `/login?return=${encodeURIComponent(returnUrl)}`;
          resolve();
        }, 300);
      });
    }
  },
  entities: {
    UploadedFile: {
      list: async (sortBy) => {
        // Simulate API call to fetch files
        return new Promise((resolve) => {
          setTimeout(() => {
            let files = Array.from(mockFiles.values());
            if (sortBy === '-created_date') {
              files.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
            }
            resolve(files);
          }, 300);
        });
      },
      update: async (fileId, updates) => {
        // Simulate API call to update file
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const file = mockFiles.get(fileId);
            if (!file) {
              reject(new Error(`File ${fileId} not found`));
              return;
            }
            const updated = { ...file, ...updates };
            mockFiles.set(fileId, updated);
            resolve(updated);
          }, 300);
        });
      },
      delete: async (fileId) => {
        // Simulate API call to delete file
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!mockFiles.has(fileId)) {
              reject(new Error(`File ${fileId} not found`));
              return;
            }
            mockFiles.delete(fileId);
            resolve({ success: true });
          }, 300);
        });
      },
      create: async (fileData) => {
        // Simulate API call to create file record
        return new Promise((resolve) => {
          setTimeout(() => {
            const id = `file_${++fileCounter}`;
            const newFile = {
              id,
              ...fileData,
              created_date: new Date().toISOString()
            };
            mockFiles.set(id, newFile);
            resolve(newFile);
          }, 300);
        });
      }
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        // Simulate file upload
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            setTimeout(() => {
              resolve({
                file_url: URL.createObjectURL(file),
                file_name: file.name,
                file_size: file.size
              });
            }, 500);
          };
          reader.readAsArrayBuffer(file);
        });
      }
    }
  }
};
