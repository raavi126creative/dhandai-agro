// Wait for the DOM to fully load before finding elements
document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const messagesContainer = document.getElementById("chat-messages");

    if (!chatForm || !userInput || !messagesContainer) {
        console.error("Critical UI Elements are missing from index.html");
        return;
    }

    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const query = userInput.value.trim();
        if (!query) return;

        // 1. Append User Message visually
        appendMessage(query, "user");
        userInput.value = "";

        // 2. Inject a temporary visual loading indicator
        const loadingId = "loader-" + Date.now();
        const loadingHtml = `
            <div id="${loadingId}" style="display: flex; justify-content: flex-start; margin-bottom: 12px;">
                <div style="background-color: #f1f3f4; color: #5f6368; padding: 10px 14px; border-radius: 16px;">
                    विचार करत आहे...
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', loadingHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // 3. Connect to your Live Render Cloud Backend
            const response = await fetch('https://dhandai-agro-1.onrender.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query })
            });

            const data = await response.json();

            // Remove loading text
            const loaderElement = document.getElementById(loadingId);
            if (loaderElement) loaderElement.remove();

            // 4. Print the Real Open-Ended Response from Gemini using the matching key
            if (data && data.response) {
                appendMessage(data.response, "bot");
            } else {
                appendMessage("त्रुटी: सर्व्हरकडून चुकीचा डेटा आला आहे.", "bot");
            }

        } catch (error) {
            const loaderElement = document.getElementById(loadingId);
            if (loaderElement) loaderElement.remove();
            
            console.error("Connection failed:", error);
            appendMessage("सर्व्हरशी संपर्क होऊ शकला नाही. कृपया पुन्हा प्रयत्न करा.", "bot");
        }
    });

    function appendMessage(text, sender) {
        const isUser = sender === "user";
        const alignment = isUser ? "flex-end" : "flex-start";
        const bgColor = isUser ? "#1b5e20" : "#e8f5e9";
        const textColor = isUser ? "#ffffff" : "#1b5e20";

        const messageHtml = `
            <div style="display: flex; justify-content: ${alignment}; margin-bottom: 12px;">
                <div style="background-color: ${bgColor}; color: ${textColor}; padding: 10px 14px; border-radius: 16px; max-width: 80%; white-space: pre-wrap;">
                    ${text}
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
                              
