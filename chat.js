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

    // 1. Display user's question in the chat box
    const userMessageHtml = `
        <div style="background-color: #e0e0e0; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; margin-left: auto; text-align: right; color: #333; font-family: sans-serif;">
            ${query}
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMessageHtml);
    inputEl.value = ''; // Clear input field
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to bottom

    // 2. Add a realistic "Analyzing..." placeholder to make it look like a real AI thinking
    const loadingId = 'loading-' + Date.now();
    const loadingHtml = `
        <div id="${loadingId}" style="background-color: #e8f5e9; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; color: #1b5e20; font-style: italic; font-family: sans-serif;">
            🤖 Agro-AI is analyzing crop data...
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', loadingHtml);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Set up the intelligent local responses
    let reply = "नमस्कार! Dhandai Agro Service मधे आपले स्वागत आहे. For specific product availability, seeds, or fertilizer recommendations at our Arvi or Borkund branches, please visit our store or call our expert hotline.";
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('नमस्कार') || lowerQuery.includes('राम राम')) {
        reply = "राम राम! Dhandai Agro Service AI Assistant मधे आपले स्वागत आहे. How can I help you protect your crops or boost your yield today? (आपण मराठी किंवा English मध्ये विचारू शकता!)";
    } 
    else if (lowerQuery.includes('cotton') || lowerQuery.includes('कपाशी') || lowerQuery.includes('कापूस')) {
        reply = "कपाशी पिकासाठी (Cotton Crop): We highly recommend premium BG-II Bt seeds. To protect against pink bollworm (बोंडअळी), ensure timely application of neem-based pesticides and balanced NPK dosing. Visit Dhandai Agro for the best local protective solutions!";
    } 
    else if (lowerQuery.includes('soybean') || lowerQuery.includes('सोयाबीन')) {
        reply = "सोयाबीन पिकासाठी (Soybean Crop): Ensure deep sowing and seed treatment (बीजप्रक्रिया) using Rhizobium culture for excellent root development. Don't forget to apply Sulphur (खत) during land preparation to increase oil content and grain weight!";
    } 
    else if (lowerQuery.includes('fertilizer') || lowerQuery.includes('खत') || lowerQuery.includes('खते')) {
        reply = "We stock top-quality fertilizers: Urea, DAP (18:46:0), MOP, and premium Organic Compost (सेंद्रिय खत). For Arvi and Borkund soil profiles, a balanced micro-nutrient spray during the vegetative stage will increase your yield by 20%!";
    } 
    else if (lowerQuery.includes('pest') || lowerQuery.includes('किड') || lowerQuery.includes('औषध')) {
        reply = "Crop protection is our specialty! Dhandai Agro Service offers targeted systemic insecticides and eco-friendly fungicides to control whitefly, aphids, and fungal blasts. Bring a leaf sample to our store for a free diagnosis!";
    }
    else if (lowerQuery.includes('where') || lowerQuery.includes('shop') || lowerQuery.includes('पत्ता') || lowerQuery.includes('address') || lowerQuery.includes('arvi') || lowerQuery.includes('borkund')) {
        reply = "Dhandai Agro Service is located to serve you best! Our main branches are in Arvi and Borkund. We are open from 9:00 AM to 8:00 PM to provide seeds, fertilizers, and expert advice directly to our farming family.";
    }

    // 4. Wait exactly 600 milliseconds (just over half a second) to create the typing illusion, then swap out the placeholder for the real answer!
    setTimeout(() => {
        if (document.getElementById(loadingId)) {
            document.getElementById(loadingId).remove();
        }
        const aiMessageHtml = `
            <div style="background-color: #e8f5e9; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; color: #1b5e20; font-family: sans-serif; line-height: 1.4;">
                ${reply}
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', aiMessageHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
}
    
