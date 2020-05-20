export default function () {
  return {
    user: JSON.parse(window.localStorage.getItem('data_clinic')) || {},
    token: window.localStorage.getItem('token_clinic') || ''
  }
}
