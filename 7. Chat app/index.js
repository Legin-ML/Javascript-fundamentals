const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function createMessage(content, isUserMessage = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUserMessage ? 'user-message' : 'bot-message');
    const timestamp = new Date().toLocaleTimeString();
    messageDiv.innerHTML = `
        <div class="message-content">${content}</div>
        <div class="timestamp">${timestamp}</div>
    `;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = 'Bot is typing...';
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingDiv;
}

function hideTypingIndicator(typingDiv) {
    chatBox.removeChild(typingDiv);
}

function simulateIncomingMessage() {
    const typingDiv = showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator(typingDiv);
        const botMessage = 'This is a simulated bot message.';
        createMessage(botMessage, false);
    }, 3000);
}

sendBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        createMessage(message, true);
        messageInput.value = '';
        simulateIncomingMessage();
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
