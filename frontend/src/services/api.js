const API_BASE = import.meta.env.VITE_API_BASE_URL || '/alelm/qamar/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export function fetchWords(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });

  return request(`/words/?${query.toString()}`);
}

export function saveSuggestion(payload) {
  return request('/suggestions/', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}