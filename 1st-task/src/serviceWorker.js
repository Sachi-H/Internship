// serviceWorker.js

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      navigator.serviceWorker.register(swUrl)
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Error registering the Service Worker:', error);
        });
    });
  }
  