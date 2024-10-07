import { useState, useEffect, useRef } from "react";

const initialSuggestionPrompts = [
  "Hi! I am feeling dizzy 😊",
  "How can I stop smoking? 🚭",
  "Tell me about the cons of smoking ⚠️",
];

const AIChat = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("aiChatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestionPrompts, setSuggestionPrompts] = useState(
    initialSuggestionPrompts
  );

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("aiChatMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    const newMessage = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setInput("");

    try {
      // Fetch AI response from Gemini API
      const aiResponse = await fetchGeminiResponse(message);

      // Add the AI response to the chat messages
      const newAiMessage = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      console.log(error)
      // console.error("Failed to fetch AI response:", error);
    } finally {
      setLoading(false);
    }

    // Clear suggestion prompts after sending a message
    setSuggestionPrompts([]);
  };

  // Replace the fetchGeminiResponse function
  const fetchGeminiResponse = async (message) => {
    const response = await fetch("/api/v1/aichats/aichat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }), // Send message as payload
    });

    if (!response.ok) {
      throw new Error(
        `Failed to get response from backend: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Backend Response:", data); // Log the backend response
    return data.aiResponse; // Return the modified AI response from the backend
  };

  const handleSuggestionClick = (prompt) => {
    handleSend(prompt);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center bg-[#f0f7f4]">
      {/* Chat Container */}
      <div className="w-full max-w-6xl max-h-[70vh] bg-[#ffffff] flex flex-col">
        {/* Header */}
        <div className="bg-[#f0f7f4] py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">AI CHAT</h1>
        </div>

        {/* Suggestion Prompts */}
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 p-4 justify-center bg-[#f0f7f4]">
            {suggestionPrompts.map((prompt, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-full bg-[#d7e9e3] hover:bg-[#b4d1c9] px-4 py-2 text-sm text-gray-800 shadow transition-transform transform hover:scale-105"
                onClick={() => handleSuggestionClick(prompt)}
              >
                {prompt}
              </div>
            ))}
          </div>
        )}

        {/* Messages (Scrollable Chat Section) */}
        <div
          className="flex-1 overflow-y-auto p-4 mb-4"
          style={{ height: "400px" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg shadow-md text-gray-800 text-sm ${
                  message.role === "user" ? "bg-[#c2e0db]" : "bg-[#d9ece8]"
                }`}
              >
                <div>{message.content}</div>
                <div className="text-right text-xs mt-1 text-gray-500">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <p className="text-sm text-gray-500">AI is typing...</p>
            </div>
          )}
          {/* Reference element to scroll into view when new messages are added */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <div className="flex items-center p-3 ">
          <input
            type="text"
            className="flex-1 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#a7c4bc] bg-white"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend(input);
              }
            }}
          />
          <button
            className="ml-2 text-white p-3 rounded-lg hover:bg-[#8cae9f] transition-colors disabled:bg-[#b4d1c9]"
            onClick={() => handleSend(input)}
            disabled={loading || input.trim() === ""}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
