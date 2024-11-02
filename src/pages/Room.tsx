import { Models, Query, RealtimeResponseEvent } from "appwrite";
import { useEffect, useRef, useState } from "react";
import { client, databases } from "../appwriteConfig";
import { Header, MessageBubble, MessageInput } from "../components";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const [messages, setMessages] = useState<Models.Document[]>([]);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessages = async () => {
    const res = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      [Query.orderAsc("$createdAt")]
    );
    setMessages(res.documents);
  };

  useEffect(() => {
    getMessages();
    const unsub = client.subscribe(
      `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
        import.meta.env.VITE_COLLECTION_ID
      }.documents`,
      (res: RealtimeResponseEvent<Models.Document>) => {
        const type = res.events[0].split(".").pop();

        switch (type) {
          case "create":
            setMessages((prev) => [...prev, res.payload]);
            break;

          case "delete":
            setMessages((prev) =>
              prev.filter((msg) => msg.$id !== res.payload.$id)
            );
            break;
          default:
            break;
        }
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />

      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-1">
            {messages.map((message) => (
              <MessageBubble key={message.$id} message={message} user={user} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <MessageInput user={user} />
      </main>
    </div>
  );
};

export default Room;
