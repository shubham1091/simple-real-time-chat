import { ID, Permission, Role } from "appwrite";
import { FormEvent, useState } from "react";
import { Send } from "react-feather";
import { databases } from "../appwriteConfig";
import { user } from "../utils/types";

interface Props {
  user: user | null;
}

export const MessageInput = ({ user }: Props) => {
  const [messageBody, setMessageBody] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (messageBody.trim()) {
        const formEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        }) as unknown as FormEvent<HTMLFormElement>;
        handleSubmit(formEvent);
      }
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !messageBody.trim()) {
      return;
    }
    const permissions = [Permission.write(Role.user(user.$id))];
    const payload = {
      body: messageBody,
      userId: user?.$id,
      userName: user?.name,
    };
    await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      ID.unique(),
      payload,
      permissions
    );
    setMessageBody("");
  };
  return (
    <div className="border-t border-gray-700 bg-gray-800 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto"
      >
        <div className="flex gap-2">
          <textarea
            required
            maxLength={250}
            placeholder="Type a message..."
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 min-h-[44px] max-h-32 p-2 bg-gray-700 border border-gray-600 rounded-lg resize-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
          />
          <button
            type="submit"
            disabled={!messageBody.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
