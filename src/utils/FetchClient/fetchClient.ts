const BASE_URL = 'localStorage';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data?: any,
): Promise<T> {
  const storageKey = url.replace('/', '');

  if (method === 'GET') {
    const dataFromLocalStorage = localStorage.getItem(storageKey);
    await wait(100);
    if (dataFromLocalStorage) {
      return JSON.parse(dataFromLocalStorage) as T;
    }
    return [] as T;
  }

  if (method === 'POST' || method === 'PATCH') {
    let existingData: any[] = [];
    const dataFromLocalStorage = localStorage.getItem(storageKey);
    if (dataFromLocalStorage) {
      existingData = JSON.parse(dataFromLocalStorage);
    }

    if (method === 'POST') {
      existingData.push(data);
    } else if (method === 'PATCH') {
      existingData = existingData.map(item => item.id === data.id ? data : item);
    }

    localStorage.setItem(storageKey, JSON.stringify(existingData));
    await wait(100);
    return data as T;
  }

  if (method === 'DELETE') {
    const existingData = localStorage.getItem(storageKey);
    let newData: any[] = [];
    if (existingData) {
      newData = JSON.parse(existingData);
      newData = newData.filter(item => item.id !== data);
      localStorage.setItem(storageKey, JSON.stringify(newData));
    }
    await wait(100);
    return {} as T;
  }

  throw new Error(`Unsupported method: ${method}`);
}

export const fetchLocalStorageClient = {
  get: async <T>(url: string): Promise<T> => request<T>(url, 'GET'),
  post: async <T>(url: string, data: any): Promise<T> => request<T>(url, 'POST', data),
  patch: async <T>(url: string, data: any): Promise<T> => request<T>(url, 'PATCH', data),
  delete: async <T>(url: string, data: any): Promise<T> => request<T>(url, 'DELETE', data),
};
