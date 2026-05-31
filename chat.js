document.getElementById('send-chat-btn').addEventListener('click', sendChatMessage);
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

function sendChatMessage() {
    const inputEl = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const query = inputEl.value.trim();

    if (!query) return;

    // 1. Display user's question
    const userMessageHtml = `
        <div style="background-color: #e0e0e0; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; margin-left: auto; text-align: right; color: #333; font-family: sans-serif;">
            ${query}
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMessageHtml);
    inputEl.value = ''; 
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Local Agro Intelligent Matrix (Keyword Matching System)
    let reply = "Thank you for reaching out to Dhandai Agro Service! For detailed product availability and pricing at our Arvi or Borkund branches, please contact us directly or visit our main outlet.";
    const lowerQuery = query.toLowerCase();

    // Marathi and English Smart Keyword Responses
    if (lowerQuery.includes('cotton') || lowerQuery.includes('कपाशी') || lowerQuery.includes('कापूस')) {
        reply = "For the upcoming cotton season, we highly recommend premium BG-II Bt Cotton seeds. Pair them with balanced NPK fertilizers and organic neem cake soil solutions available at Dhandai Agro for maximum yield!";
    } else if (lowerQuery.includes('soybean') || lowerQuery.includes('सोयाबीन')) {
        reply = "Soybean crops thrive with early root development. We recommend using specialized liquid bio-fertilizers (Rhizobium) and premium sulphur treatments available at our shop to boost oil content.";
    } else if (lowerQuery.includes('fertilizer') || lowerQuery.includes('खत') || lowerQuery.includes('खते')) {
        reply = "Dhandai Agro Service stocks premium organic compost, single super phosphate (SSP), and advanced water-soluble fertilizers. Visit us to get a customized fertilizer card for your soil type!";
    } else if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('नमस्कार')) {
        reply = "Namaskar! Welcome to Dhandai Agro Service's AI Assistant. How can I help you optimize your crop yield today?";
    } else if (lowerQuery.includes('where') || lowerQuery.includes('shop') || lowerQuery.includes('पत्ता') || lowerQuery.includes('address')) {
        reply = "Dhandai Agro Service proudly serves farmers across Arvi, Borkund, and Akola regions. Please check our Contact section below for exact maps and phone numbers!";
    }

    // 3. Simulate a quick 400ms professional typing delay
    setTimeout(() => {
        const aiMessageHtml = `
            <div style="background-color: #e8f5e9; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; color: #1b5e20; font-family: sans-serif;">
                ${reply}
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', aiMessageHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 400);
}
