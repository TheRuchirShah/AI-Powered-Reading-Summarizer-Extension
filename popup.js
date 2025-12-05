document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getTextContent
  }, async (results) => {
    const text = results[0].result;

    const summary = await fetchAISummary(text);
    document.getElementById('summary').innerText = summary;
  });
});

// Extract main text from the page
function getTextContent() {
  const main = document.querySelector('main') || document.body;
  return main.innerText;
}

// Fetch summary from AI API (replace with your Gemini/OpenAI API key)
async function fetchAISummary(text) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful summarizer." },
        { role: "user", content: "Summarize the following article in 3 bullet points:\n\n" + text }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}
