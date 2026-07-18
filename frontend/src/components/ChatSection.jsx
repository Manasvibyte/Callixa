import socket from "../socket/socket";

const ChatSection = ({
  messages,
  message,
  setMessage,
  handleSendMessage,
  messagesEndRef,
}) => {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-800">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-slate-400">
            Start the conversation 👋
          </p>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender === socket.id;

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 ${
                    isMe
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <p className="mb-1 text-xs font-medium opacity-70">
                    {isMe ? "You" : "Participant"}
                  </p>

                  <p className="break-words text-sm">{msg.message}</p>
                </div>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t p-3">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-400"
        />

        <button
          onClick={handleSendMessage}
          className="rounded-xl bg-slate-800 px-5 py-2 text-sm text-white hover:bg-slate-900"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
