import useAuthStore from '@/stores/authStore';

type Response = {
  success: boolean;
  error: string;
  data: unknown;
};

interface RequestOption extends RequestInit {
  params?: Record<string, string>;
}

export default async function fetchAPI(endpoint: string, options: RequestOption): Promise<Response> {
  const token = useAuthStore.getState().authToken;

  if (!token) {
    useAuthStore.getState().clear();
    throw new Error('No token found');
  }

  const headers = {
    'auth-token': token,
  };

  const fetchOptions = {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  };

  const baseUrl = process.env.REACT_APP_API_ROOT;
  const params = options.params ? `?${new URLSearchParams(options.params).toString()}` : '';
  const url = baseUrl + endpoint + params;

  const res = await fetch(url, fetchOptions);
  const data = await res.json();

  if (!res.ok || !data.success) {
    if (data.error?.toString() === 'LoginExpired') {
      useAuthStore.getState().clear();
    }
    throw new Error(data.error);
  }

  return data;
}
