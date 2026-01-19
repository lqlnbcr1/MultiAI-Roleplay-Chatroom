"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import SettingsModal from "@/components/SettingsModal";
import RoomConfigModal from "@/components/RoomConfig/RoomConfigModal";
import MessageList from "@/components/Chat/MessageList";
import ControlPanel from "@/components/Chat/ControlPanel";
import { Room, Character, Message } from "@/lib/types";
import { StorageService } from "@/lib/storage";
import { AIService } from "@/lib/ai";
import { v4 as uuidv4 } from "uuid";
import { Settings } from "lucide-react";

export default function Home() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isRoomConfigOpen, setIsRoomConfigOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [userName, setUserName] = useState("User");

    // Load initial data
    useEffect(() => {
        const loadedRooms = StorageService.getRooms();
        const settings = StorageService.getSettings();
        setRooms(loadedRooms);
        setUserName(settings.userName || "User");
        if (loadedRooms.length > 0 && !currentRoomId) {
            setCurrentRoomId(loadedRooms[0].id);
        }
    }, []);

    const currentRoom = rooms.find((r) => r.id === currentRoomId);

    const handleCreateRoom = () => {
        const newRoom: Room = {
            id: uuidv4(),
            name: "New Chat Room",
            background: "A quiet, neutral space.",
            characters: [],
            messages: [],
            createdAt: Date.now(),
        };
        StorageService.saveRoom(newRoom);
        setRooms(StorageService.getRooms());
        setCurrentRoomId(newRoom.id);
        setIsRoomConfigOpen(true); // Open config immediately for new room
    };

    const deleteRoom = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this room?")) {
            StorageService.deleteRoom(id);
            const updatedRooms = StorageService.getRooms();
            setRooms(updatedRooms);
            if (currentRoomId === id) {
                setCurrentRoomId(updatedRooms.length > 0 ? updatedRooms[0].id : null);
            }
        }
    };

    const updateRoomConfig = (background: string, characters: Character[]) => {
        if (!currentRoom) return;
        const updatedRoom = { ...currentRoom, background, characters, name: characters.length > 0 ? `${characters.map(c => c.name).join(", ")}'s Room` : "Empty Room" };
        StorageService.saveRoom(updatedRoom);
        setRooms(StorageService.getRooms());
    };

    const handleSendMessage = (text: string) => {
        if (!currentRoom) return;



        const newMessage: Message = {
            id: uuidv4(),
            senderId: "user",
            // targetId: undefined, // User messages do not have a specific target displayed
            timestamp: Date.now(),
            content: {
                state: "",
                monologue: "",
                dialogue: text
            }
        };

        const updatedRoom = { ...currentRoom, messages: [...currentRoom.messages, newMessage] };
        StorageService.saveRoom(updatedRoom);
        setRooms(StorageService.getRooms());
    };

    const handleTriggerAI = async (charId: string, targetId: string) => {
        if (!currentRoom || isGenerating) return;

        const character = currentRoom.characters.find(c => c.id === charId);
        if (!character) return;

        setIsGenerating(true);
        try {
            const settings = StorageService.getSettings();

            // Pass the targetId to generation so it knows who it's talking to
            // We need to update AIService.generateResponse signature next
            const response = await AIService.generateResponse(character, currentRoom, settings, targetId);

            const newMessage: Message = {
                id: uuidv4(),
                senderId: character.id,
                targetId,
                timestamp: Date.now(),
                content: response
            };

            const updatedRoom = {
                ...currentRoom,
                messages: [...currentRoom.messages, newMessage]
            };

            StorageService.saveRoom(updatedRoom);
            setRooms(StorageService.getRooms());
        } catch (error) {
            console.error(error);
            alert("Failed to generate response. Check API Key settings.");
            setIsSettingsOpen(true);
        } finally {
            setIsGenerating(false);
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // ... (rest of the component)

    return (
        <div className="flex h-[100dvh] w-full overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 touch-none">
            <Sidebar
                rooms={rooms}
                currentRoomId={currentRoomId}
                onSelectRoom={(id) => {
                    setCurrentRoomId(id);
                    setIsSidebarOpen(false); // Close sidebar on selection (mobile)
                }}
                onCreateRoom={() => {
                    handleCreateRoom();
                    setIsSidebarOpen(false);
                }}
                onDeleteRoom={deleteRoom}
                onOpenSettings={() => {
                    setIsSettingsOpen(true);
                    setIsSidebarOpen(false);
                }}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className="flex-1 flex flex-col h-full min-h-0 relative w-full">
                {currentRoom ? (
                    <>
                        {/* Header */}
                        <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur z-10 relative">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="md:hidden p-2 -ml-2 text-zinc-600 dark:text-zinc-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                                </button>
                                <div>
                                    <h2 className="font-bold truncate max-w-[150px] md:max-w-md">{currentRoom.name}</h2>
                                    <p className="text-xs text-zinc-500 truncate max-w-[150px] md:max-w-md">{currentRoom.background}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsRoomConfigOpen(true)}
                                className="text-sm px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                Room Settings
                            </button>
                        </div>

                        <MessageList
                            messages={currentRoom.messages}
                            characters={currentRoom.characters}
                            userName={userName}
                        />

                        <ControlPanel
                            characters={currentRoom.characters}
                            onSendMessage={handleSendMessage}
                            onTriggerAI={handleTriggerAI}
                            isGenerating={isGenerating}
                            userName={userName}
                        />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
                        <p>Select a room or create a new one.</p>
                    </div>
                )}
            </main>

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSave={() => {
                    const settings = StorageService.getSettings();
                    setUserName(settings.userName || "User");
                }}
            />

            {currentRoom && (
                <RoomConfigModal
                    isOpen={isRoomConfigOpen}
                    initialBackground={currentRoom.background}
                    initialCharacters={currentRoom.characters}
                    onClose={() => setIsRoomConfigOpen(false)}
                    onSave={updateRoomConfig}
                />
            )}
        </div>
    );
}
