"use client";

import { Room } from "@/lib/types";
import { Plus, Trash2, MessageSquare, Settings, X } from "lucide-react";

interface SidebarProps {
    rooms: Room[];
    currentRoomId: string | null;
    onSelectRoom: (id: string) => void;
    onCreateRoom: () => void;
    onDeleteRoom: (id: string, e: React.MouseEvent) => void;
    onOpenSettings: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({
    rooms,
    currentRoomId,
    onSelectRoom,
    onCreateRoom,
    onDeleteRoom,
    onOpenSettings,
    isOpen,
    onClose
}: SidebarProps) {
    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                    <h1 className="font-bold text-lg">AI Rooms</h1>
                    <div className="flex gap-1">
                        <button onClick={onOpenSettings} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full">
                            <Settings size={18} />
                        </button>
                        {/* Mobile Close Button */}
                        <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full md:hidden">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {/* ... (existing list code) ... */}
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            onClick={() => onSelectRoom(room.id)}
                            className={`
                  group w-full flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
                  ${currentRoomId === room.id ? "bg-white dark:bg-zinc-800 shadow-sm" : "hover:bg-zinc-200 dark:hover:bg-zinc-800/50"}
                `}
                        >
                            <div className="flex items-center gap-3 truncate">
                                <MessageSquare size={16} className="text-zinc-500" />
                                <span className="truncate text-sm font-medium">{room.name}</span>
                            </div>

                            <button
                                onClick={(e) => onDeleteRoom(room.id, e)}
                                className="md:opacity-0 group-hover:opacity-100 p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}

                    {rooms.length === 0 && (
                        <div className="text-center py-10 text-zinc-400 text-sm">
                            No rooms yet.
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={onCreateRoom}
                        className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        <Plus size={18} />
                        <span>New Room</span>
                    </button>
                </div>
            </div>
        </>
    );
}
