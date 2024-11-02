import { Models } from "appwrite";
import { Check, Trash2 } from "react-feather";
import { databases } from "../appwriteConfig";
import { user } from "../utils/types";

export const MessageBubble = ({
  message,
  user,
}: {
  message: Models.Document;
  user: user | null;
}) => {
  const isCurrentUser = message.userId === user?.$id;
  const time = new Date(message.$createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const deleteMessage = async (mId: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        mId
      );
    }
  };
  return (
    <div
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } group mb-2`}
    >
      <div className="flex max-w-[85%] items-end gap-2">
        {!isCurrentUser && (
          <div className="flex flex-col items-center mb-1">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-semibold">
                {message.userName?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col ${
            isCurrentUser ? "items-end" : "items-start"
          }`}
        >
          {!isCurrentUser && (
            <span className="text-sm text-gray-400 mb-1 ml-1">
              {message.userName || "Anonymous"}
            </span>
          )}

          <div
            className={`relative rounded-2xl px-4 py-2 ${
              isCurrentUser
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-gray-700 text-white rounded-bl-sm"
            }`}
          >
            <p className="break-words">{message.body}</p>

            <div
              className={`flex items-center gap-1 mt-1 text-xs ${
                isCurrentUser ? "text-blue-200" : "text-gray-400"
              }`}
            >
              <span>{time}</span>
              {isCurrentUser && <Check size={12} />}
            </div>
          </div>

          {isCurrentUser && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2
                size={14}
                className="mt-1 text-gray-400 hover:text-red-400 cursor-pointer transition-colors"
                onClick={() => deleteMessage(message.$id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
