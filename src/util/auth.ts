export function getToken() {
  return localStorage.getItem('token') || ''
}

export function resetToken() {
  localStorage.removeItem('token')
}
