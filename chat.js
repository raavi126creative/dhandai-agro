document.getElementById('send-chat-btn').addEventListener('click', sendChatMessage);
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { sendChatMessage(); }
});

async function sendChatMessage() {
    const inputEl = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const query = inputEl.value.trim();

    if (!query) return;

    // 1. Render User Message Bubble
    const userMessageHtml = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: 12px;">
            <div style="background-color: #007bff; color: white; padding: 10px 14px; border-radius: 16px 16px 4px 16px; max-width: 75%; font-family: sans-serif; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                ${query}
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMessageHtml);
    inputEl.value = ''; 
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Render Thinking Placeholder
    const loadingId = 'loading-' + Date.now();
    const loadingHtml = `
        <div id="${loadingId}" style="display: flex; justify-content: flex-start; margin-bottom: 12px;">
            <div style="background-color: #f1f3f4; color: #5f6368; padding: 10px 14px; border-radius: 16px 16px 16px 4px; max-width: 75%; font-family: sans-serif; font-size: 13px; font-style: italic;">
                🌱 Agro-AI is thinking...
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', loadingHtml);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        // 3. Connect to your Live Render Cloud Backend
        // Paste your exact link below inside the quotes, keeping the '/api/chat' at the end!
        const response = await fetch('https://dhandai-agro-1.onrender.com/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: query })
        });
        
        const data = await response.json();
        
        // Remove loading text
        if (document.getElementById(loadingId)) { document.getElementById(loadingId).remove(); }

        // 4. Print the Real Open-Ended Response from Gemini
        const aiMessageHtml = `
            <div style="display: flex; justify-content: flex-start; margin-bottom: 12px;">
                <div style="background-color: #e8f5e9; color: #1b5e20; padding: 10px 14px; border-radius: 16px 16px 16px 4px; max-width: 75%; font-family: sans-serif; font-size: 14px; line-height: 1.5; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    ${data.reply}
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', aiMessageHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

    } catch (error) {
        if (document.getElementById(loadingId)) { document.getElementById(loadingId).remove(); }
        console.error("Connection failed:", error);
    }
        }
                
