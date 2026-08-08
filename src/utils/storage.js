export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage item:", error);
  }
}

export function getItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    return defaultValue;
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage item:", error);
  }
}

export function setSessionItem(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting sessionStorage item:", error);
  }
}

export function getSessionItem(key, defaultValue = null) {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error getting sessionStorage item:", error);
    return defaultValue;
  }
}

export function clearStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

export function setToken(token, refreshToken) {
  setItem("token", token);
  if (refreshToken) {
    setItem("refreshToken", refreshToken);
  }
}

export function getToken() {
  return getItem("token");
}

export function getRefreshToken() {
  return getItem("refreshToken");
}

export function removeToken() {
  removeItem("token");
  removeItem("refreshToken");
}
