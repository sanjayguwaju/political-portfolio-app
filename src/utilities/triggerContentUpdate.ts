export const triggerContentUpdate = () => {
  if (typeof window !== 'undefined') {
    // Dispatch a custom event to notify components that content has been updated
    window.dispatchEvent(new CustomEvent('contentUpdated'))
  }
}
