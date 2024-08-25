document.getElementById('url-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const originalUrl = document.getElementById('original-url').value;
    
    const response = await fetch('http://localhost:5000/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ originalUrl })
    });
  
    const result = await response.json();
    const shortUrlElement = document.getElementById('short-url');
    shortUrlElement.href = `http://localhost:5000/${result.shortUrl}`;
    shortUrlElement.innerText = `http://localhost:5000/${result.shortUrl}`;
    document.getElementById('result').classList.remove('hidden');
  });
  