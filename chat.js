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

    // 2. Display the live "Thinking Matrix" animation
    const loadingId = 'loading-' + Date.now();
    const loadingHtml = `
        <div id="${loadingId}" style="background-color: #e8f5e9; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; color: #1b5e20; font-style: italic; font-family: sans-serif;">
            ⚡ Dhandai-AI is processing neural language nodes...
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', loadingHtml);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. THE INTENT & LINGUISTIC SCORER MATRIX
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

    // 4. GENERATING THE EXPERT ANSWERS
    let reply = "";

    if (scores.soybean > 0 && scores.fertilizer > 0) {
        reply = "<b>सोयाबीन खत व्यवस्थापन (Soybean Fertilizer Expert Guide):</b> For maximizing soybean yield, apply single super phosphate (SSP) and Sulphur during land preparation. Avoid heavy nitrogen fertilizers, as soybean fixes its own nitrogen through root nodules! Visit Dhandai Agro Service for specialized liquid bio-fertilizers.";
    }
    else if (scores.cotton > 0 && scores.fertilizer > 0) {
        reply = "<b>कपाशी खत व्यवस्थापन (Cotton Fertilizer Expert Guide):</b> Cotton requires a split dose of balanced NPK fertilizers. Apply a baseline dose at sowing, followed by specialized micronutrient sprays at the flowering stage. Drop by Dhandai Agro to get a custom dosage chart for your soil!";
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
    }
    
    // 5. THE ADVANCED AI SIMULATION ENGINE (Handles ANY other question or language)
    else {
        // Step A: Detect Language Style dynamically based on characters
        const hasMarathiHindi = /[\u0900-\u097F]/.test(query);
        const isHinglish = lowerQuery.includes('kya') || lowerQuery.includes('hai') || lowerQuery.includes('kaise') || lowerQuery.includes('krte') || lowerQuery.includes('gheu') || lowerQuery.includes('shakto') || lowerQuery.includes('sang');

        // Step B: Formulate an intelligent response that adapts to what they said
        if (hasMarathiHindi) {
            reply = `तुमचा प्रश्न: "${query}" याबद्दल विचार केल्याबद्दल धन्यवाद. आमच्याकडे कापूस, सोयाबीन, खते आणि पीक संरक्षणाची संपूर्ण माहिती उपलब्ध आहे. तुमच्या प्रश्नाचे अधिक अचूक उत्तर मिळवण्यासाठी कृपया वर दिलेल्या मेनूचा वापर करा किंवा थेट आमच्या अर्वी/बोरकुंड शाखेला भेट द्या!`;
        } else if (isHinglish) {
            reply = `Aapne poocha: "${query}". Yeh ek bht hi badhiya question hai! Dhandai Agro Service local farming solutions ke liye best expert maana jaata hai. Please check kijiye ki aapka sawal Cotton, Soyabean, Fertilizer ya Pest Control se related hai ya nahi, taaki hum exact calculations dikha sakein!`;
        } else {
            reply = `Thank you for asking: "${query}". As the Dhandai Agro Intelligent Assistant, I analyze local soil profiles across Arvi and Borkund. To give you the most accurate agricultural forecast, please verify if your question relates to **Crops (Cotton/Soybean)**, **Fertilizers**, or **Pest Protection**.`;
        }
    }

    // 6. Dynamic Typing Delay Execution
    setTimeout(() => {
        if (document.getElementById(loadingId)) {
            document.getElementById(loadingId).remove();
        }
        const aiMessageHtml = `
            <div style="background-color: #e8f5e9; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; color: #1b5e20; font-family: sans-serif; line-height: 1.5;">
                ${reply}
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', aiMessageHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 850); // Slightly longer delay makes it feel like it's deeply calculating a response
               }
    
        
