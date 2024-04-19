export default function updateLocalStorage(key: string, newValue: string) {
  const oldValue = localStorage.getItem(key)
  localStorage.setItem(key, newValue)

  const storageEvent = new StorageEvent('storage', {
    key: key,
    oldValue: oldValue,
    newValue: newValue,
    url: window.location.href,
    storageArea: localStorage
  })

  window.dispatchEvent(storageEvent)
}
