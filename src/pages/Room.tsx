import { FormEvent, useEffect, useState } from "react";
import { client, databases } from "../appwriteConfig";
import {
    ID,
    Models,
    Permission,
    Query,
    RealtimeResponseEvent,
    Role,
} from "appwrite";
import { useAuth } from "../utils/AuthContext";
import Header from "../components/Header";
import { Trash2 } from "react-feather";

const Room = () => {
    const [messages, setMessages] = useState<Models.Document[]>([]);
    const [messageBody, setMessageBOdy] = useState("");
    const { user } = useAuth();

    const getMessages = async () => {
        const res = await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            [Query.orderAsc("$createdAt"), Query.limit(100)]
        );
        console.log(res.documents);
        setMessages(res.documents);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("MESSAGE:", messageBody);
        if (!user) {
            return;
        }
        const permissions = [Permission.write(Role.user(user.$id))];
        const payload = {
            body: messageBody,
            userId: user?.$id,
            userName: user?.name,
        };
        const res = await databases.createDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            ID.unique(),
            payload,
            permissions
        );
        console.log("RESPONSE:", res);
        setMessageBOdy("");
    };

    const deleteMessage = async (mId: string) => {
        await databases.deleteDocument(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            mId
        );
    };

    useEffect(() => {
        getMessages();
        const unsub = client.subscribe(
            `databases.${import.meta.env.VITE_DATABASE_ID}.collections.${
                import.meta.env.VITE_COLLECTION_ID
            }.documents`,
            (res: RealtimeResponseEvent<Models.Document>) => {
                const type = res.events[0].split(".").pop();
                if (type === "create") {
                    console.log("create");
                    setMessages((prev) => [...prev, res.payload]);
                } else if (type === "delete") {
                    console.log("delete");
                    setMessages((prev) =>
                        prev.filter((msg) => msg.$id !== res.payload.$id)
                    );
                }
            }
        );

        return () => {
            unsub();
        };
    }, []);

    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <div className="max-w-3xl mx-auto p-4">
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className="flex mb-4">
                        <textarea
                            required
                            maxLength={250}
                            placeholder="Enter your message..."
                            onChange={(e) => {
                                setMessageBOdy(e.target.value);
                            }}
                            value={messageBody}
                            className="flex-grow resize-none border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Send
                        </button>
                    </div>
                </form>
                <div>
                    {messages.map((message) => (
                        <div key={message.$id} className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold">
                                    {message?.userName ? (
                                        <span>{message?.userName}</span>
                                    ) : (
                                        "Anonymous user"
                                    )}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        message.$createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="flex-grow pr-2">
                                    {message.body}
                                </span>
                                {user?.$id === message.userId && (
                                    <Trash2
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => {
                                            deleteMessage(message.$id);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Room;
