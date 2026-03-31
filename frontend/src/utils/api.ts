import { ApiResponse, Document, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.authnexus.com';

async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('authToken');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || 'Something went wrong' 
      };
    }

    return { success: true, data: data as T };
  } catch (error) {
    return { 
      success: false, 
      error: 'Network error or server unavailable' 
    };
  }
}

// User APIs
export async function createOrUpdateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
  return fetchWithAuth<User>('/api/profile', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function getUserProfile(): Promise<ApiResponse<User>> {
  return fetchWithAuth<User>('/api/profile');
}

// Document APIs
export async function uploadDocument(
  file: File, 
  documentType: string
): Promise<ApiResponse<Document>> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);

  return fetchWithAuth<Document>('/api/upload', {
    method: 'POST',
    headers: {}, // Let browser set content-type with boundary
    body: formData,
  });
}

export async function getDocuments(): Promise<ApiResponse<Document[]>> {
  return fetchWithAuth<Document[]>('/api/status');
}

export async function getDocumentTxHash(documentId: string): Promise<ApiResponse<{ txHash: string }>> {
  return fetchWithAuth<{ txHash: string }>(`/api/txHash/${documentId}`);
}

// Mock implementation for demo purposes
export const mockApi = {
  getDocuments: async (): Promise<ApiResponse<Document[]>> => {
    return {
      success: true,
      data: [
        {
          id: '1',
          userId: 'user1',
          name: 'passport.pdf',
          type: 'Government ID',
          status: 'Verified',
          confidenceScore: 0.98,
          uploadedAt: new Date(Date.now() - 86400000).toISOString(),
          txHash: '0x1a2b3c4d5e6f7g8h9i0j',
          verifiedAt: new Date(Date.now() - 43200000).toISOString(),
        },
        {
          id: '2',
          userId: 'user1',
          name: 'driver_license.jpg',
          type: 'Government ID',
          status: 'Pending',
          uploadedAt: new Date().toISOString(),
        },
        {
          id: '3',
          userId: 'user1',
          name: 'certificate.pdf',
          type: 'Certificate',
          status: 'Failed',
          confidenceScore: 0.32,
          uploadedAt: new Date(Date.now() - 172800000).toISOString(),
          verifiedAt: new Date(Date.now() - 168400000).toISOString(),
        }
      ]
    };
  },
  getUserProfile: async (): Promise<ApiResponse<User>> => {
    return {
      success: true,
      data: {
        id: 'user1',
        email: 'user@example.com',
        fullName: 'John Doe',
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
      }
    };
  }
};