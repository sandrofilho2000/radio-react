async function api<T = unknown>(url: string): Promise<T | [] | false> {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.log(`Erro HTTP: ${res.status} ${res.statusText}`);
      return [];
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Erro na requisição:', error.message);
    } else {
      console.log('Erro desconhecido na requisição:', error);
    }
    return false;
  }
}

export default api;
