import { useState } from "react";

export default function TagInput({ label, onChange, value = [] }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = input.trim();
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]);
        setInput("");
      }
    }
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      <div className="w-full px-3 py-2 border rounded-xl flex flex-wrap gap-2 bg-gray-50">
        {value.map((tag, idx) => (
          <span
            key={idx}
            className="bg-black justify-items-center  text-white px-3 py-1 rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-xs bg-white text-black rounded-full px-1"
            >
              ✕
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 py-1"
          placeholder="Type & press Enter"
        />
      </div>
    </div>
  );
}
