// components/Discussion.jsx
export default function Discussion() {
  const messages = [
    {
      username: "Vivek",
      text: "Physics is the science of nature at its most fundamental level...",
    },
    {
      username: "Vivek",
      text: "From the tiniest particles in the quantum realm...",
    },
    {
      username: "Vivek",
      text: "It is the language of the cosmos, written in equations...",
    },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#1F1D1D] rounded-md p-4">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-[#2C2C2C] rounded-lg px-4 py-3 text-sm text-white shadow"
          >
            <div className="flex items-center mb-1 gap-2">
              <div className="w-7 h-7 bg-gray-500 rounded-full" />
              <span className="font-semibold text-white">{msg.username}</span>
            </div>
            <p className="text-gray-200 text-xs leading-relaxed">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="@type message"
          className="w-full px-4 py-2 rounded-md border-none bg-[#F1F1F1] text-black placeholder:text-gray-500"
        />
      </div>
    </div>
  );
}
