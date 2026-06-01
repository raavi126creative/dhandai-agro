document.getElementById('send-chat-btn').addEventListener('click', sendChatMessage);
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Helper function to allow users to click quick suggestion buttons
function quickSend(text) {
    document.getElementById('chat-input').value = text;
    sendChatMessage();
}

function sendChatMessage() {
    const inputEl = document.getElementById('chat-input');
    const messagesContainer = document.getElementById('chat-messages');
    const query = inputEl.value.trim();

    if (!query) return;

    // 1. Display user's question in a crisp, modern right-aligned bubble
    const userMessageHtml = `
        <div style="display: flex; justify-content: flex-end; margin-bottom: 12px;">
            <div style="background-color: #007bff; color: white; padding: 10px 14px; border-radius: 16px 16px 4px 16px; max-width: 75%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); line-height: 1.4;">
                ${query}
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMessageHtml);
    inputEl.value = ''; 
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Display an elegant, pulsing loading indicator
    const loadingId = 'loading-' + Date.now();
    const loadingHtml = `
        <div id="${loadingId}" style="display: flex; justify-content: flex-start; margin-bottom: 12px;">
            <div style="background-color: #f1f3f4; color: #5f6368; padding: 10px 14px; border-radius: 16px 16px 16px 4px; max-width: 75%; font-family: sans-serif; font-size: 13px; font-style: italic; display: flex; align-items: center; gap: 6px;">
                <span style="display: inline-block; width: 6px; height: 6px; background-color: #1b5e20; border-radius: 50%; animation: pulse 1s infinite alternate;"></span>
                Dhandai-AI is processing neural language nodes...
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', loadingHtml);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. INTENT & LINGUISTIC SCORER MATRIX
    const lowerQuery = query.toLowerCase();
    let scores = { cotton: 0, soybean: 0, fertilizer: 0, pest: 0, address: 0, hello: 0 };

    const keywords = {
        cotton: ['cotton', 'coton', 'कपाशी', 'कापूस', 'kapas', 'kapashi'],
        soybean: ['soybean', 'soyabean', 'soya', 'सोयाबीन', 'soybin'],
        fertilizer: ['fertiliz', 'khad', 'खत', 'खते', 'urea', 'dap', 'mop', 'compost', 'nutrient', 'organic'],
        pest: ['pest', 'insect', 'fungi', 'औषध', 'किड', 'फवारणी', 'बोंडअळी', 'blast', 'whitefly', 'pesticide'],
        address: ['where', 'shop', 'पत्ता', 'address', 'arvi', 'borkund', 'location', 'phone', 'contact', 'call'],
        hello: ['hi', 'hello', 'नमस्कार', 'राम', 'hey', 'welcome', 'good morning', 'gm']
    };

    for (let topic in keywords) {
        keywords[topic].forEach(word => {
            if (lowerQuery.includes(word)) { scores[topic] += 1; }
        });
    }

    let highestTopic = 'none';
    let highestScore = 0;
    for (let topic in scores) {
        if (scores[topic] > highestScore) {
            highestScore = scores[topic];
            highestTopic = topic;
        }
    }

    // 4. GENERATING THE EXPERT REPLIES
    let reply = "";
    let showSuggestions = false;

    if (scores.soybean > 0 && scores.fertilizer > 0) {
        reply = "<b>सोयाबीन खत व्यवस्थापन (Soybean Fertilizer Guide):</b> For maximizing soybean yield, apply single super phosphate (SSP) and Sulphur during land preparation. Avoid heavy nitrogen fertilizers, as soybean fixes its own nitrogen through root nodules! Visit Dhandai Agro Service for specialized liquid bio-fertilizers.";
    }
    else if (scores.cotton > 0 && scores.fertilizer > 0) {
        reply = "<b>कपाशी खत व्यवस्थापन (Cotton Fertilizer Guide):</b> Cotton requires a split dose of balanced NPK fertilizers. Apply a baseline dose at sowing, followed by specialized micronutrient sprays at the flowering stage. Drop by Dhandai Agro to get a custom dosage chart for your soil!";
    }
    else if (highestTopic === 'cotton') {
        reply = "<b>कपाशी पिकासाठी (Cotton Crop):</b> We highly recommend premium BG-II Bt seeds. To protect against pink bollworm (बोंडअळी), ensure timely application of neem-based insecticides and balanced nutrition. Visit Dhandai Agro for targeted protective solutions!";
    } 
    else if (highestTopic === 'soybean') {
        reply = "<b>सोयाबीन पिकासाठी (Soybean Crop):</b> Ensure deep sowing and proper seed treatment (बीजप्रक्रिया) using Rhizobium culture for superior root development. This ensures bold grains and a higher weight profile at harvest!";
    } 
    else if (highestTopic === 'fertilizer') {
        reply = "<b>Dhandai Agro Fertilizer Inventory:</b> We stock authentic Urea, DAP, MOP, SSP, and organic composts. For local Arvi and Borkund soil profiles, balancing macronutrients with water-soluble sprays is key to a 20% yield jump.";
    } 
    else if (highestTopic === 'pest') {
        reply = "<b>पीक संरक्षण (Crop Protection):</b> We provide top-grade systemic insecticides and fungicides to fully control whitefly, aphids, and rust. Bring a leaf sample directly to Dhandai Agro Service for an expert diagnosis!";
    }
    else if (highestTopic === 'address') {
        reply = "<b>Dhandai Agro Service Locations:</b> Our main outlets are located in <b>Arvi</b> and <b>Borkund</b>, fully operational from 9:00 AM to 8:00 PM. Check our contact page below for phone numbers and directions!";
    }
    else if (highestTopic === 'hello') {
        reply = "राम राम! Welcome to Dhandai Agro Service's Intelligent AI Assistant. How can I help you protect your crops or choose the right fertilizers today? (You can type in English or Marathi!)";
        showSuggestions = true;
    }
    else {
        // Dynamic Language Mirroring Fallback
        const hasMarathiHindi = /[\u0900-\u097F]/.test(query);
        const isHinglish = lowerQuery.includes('kya') || lowerQuery.includes('hai') || lowerQuery.includes('kaise') || lowerQuery.includes('krte') || lowerQuery.includes('gheu') || lowerQuery.includes('shakto') || lowerQuery.includes('sang');

        if (hasMarathiHindi) {
            reply = `तुमचा प्रश्न: "${query}" याबद्दल विचार केल्याबद्दल धन्यवाद. आमच्याकडे कापूस, सोयाबीन, खते आणि पीक संरक्षणाची संपूर्ण माहिती उपलब्ध आहे. अचूक उत्तरासाठी खालील पर्यायांवर क्लिक करा:`;
        } else if (isHinglish) {
            reply = `Aapne poocha: "${query}". Yeh ek badhiya question hai! Exact details ke liye aap niche diye gaye features check kar sakte hain:`;
        } else {
            reply = `Thank you for asking: "${query}". To provide the most accurate agricultural broadcast information, please choose from one of our core topics below:`;
        }
        showSuggestions = true;
    }

    // 5. Dynamic Typing Delay Execution & Interface Polish
    setTimeout(() => {
        if (document.getElementById(loadingId)) {
            document.getElementById(loadingId).remove();
        }

        // Build the AI response bubble
        let aiMessageHtml = `
            <div style="display: flex; justify-content: flex-start; margin-bottom: 12px; flex-direction: column; align-items: flex-start;">
                <div style="background-color: #e8f5e9; color: #1b5e20; padding: 10px 14px; border-radius: 16px 16px 16px 4px; max-width: 75%; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); line-height: 1.5;">
                    ${reply}
                </div>
        `;

        // If suggestions are needed, insert beautifully styled clickable suggestion chips
        if (showSuggestions) {
            aiMessageHtml += `
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; max-width: 85%;">
                    <button onclick="document.getElementById('chat-input').value='Cotton Crop'; sendChatMessage();" style="background: white; border: 1px solid #1b5e20; color: #1b5e20; padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; font-family: sans-serif; transition: all 0.2s;">🌱 Cotton</button>
                    <button onclick="document.getElementById('chat-input').value='Soyabean Crop'; sendChatMessage();" style="background: white; border: 1px solid #1b5e20; color: #1b5e20; padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; font-family: sans-serif; transition: all 0.2s;">🌾 Soyabean</button>
                    <button onclick="document.getElementById('chat-input').value='Best Fertilizers'; sendChatMessage();" style="background: white; border: 1px solid #1b5e20; color: #1b5e20; padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; font-family: sans-serif; transition: all 0.2s;">🧪 Fertilizers</button>
                    <button onclick="document.getElementById('chat-input').value='Pesticides'; sendChatMessage();" style="background: white; border: 1px solid #1b5e20; color: #1b5e20; padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; font-family: sans-serif; transition: all 0.2s;">🐛 Pesticides</button>
                    <button onclick="document.getElementById('chat-input').value='Store Address'; sendChatMessage();" style="background: white; border: 1px solid #1b5e20; color: #1b5e20; padding: 6px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; font-family: sans-serif; transition: all 0.2s;">📍 Store Address</button>
                </div>
            `;
        }

        aiMessageHtml += `</div>`;
        messagesContainer.insertAdjacentHTML('beforeend', aiMessageHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 850);
                    }
        
