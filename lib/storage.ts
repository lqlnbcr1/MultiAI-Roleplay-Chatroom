import { Room, AppSettings } from "./types";

const ROOMS_KEY = "ai_chat_rooms";
const SETTINGS_KEY = "ai_chat_settings";

export const StorageService = {
    getRooms: (): Room[] => {
        if (typeof window === "undefined") return [];
        const data = localStorage.getItem(ROOMS_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveRoom: (room: Room) => {
        const rooms = StorageService.getRooms();
        const index = rooms.findIndex((r) => r.id === room.id);
        if (index >= 0) {
            rooms[index] = room;
        } else {
            rooms.push(room);
        }
        localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
    },

    deleteRoom: (id: string) => {
        const rooms = StorageService.getRooms();
        const newRooms = rooms.filter((r) => r.id !== id);
        localStorage.setItem(ROOMS_KEY, JSON.stringify(newRooms));
    },

    saveSettings: (settings: AppSettings) => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    },

    getSettings: (): AppSettings => {
        if (typeof window === "undefined") return { openAiBaseUrl: "", openAiApiKey: "" };
        const data = localStorage.getItem(SETTINGS_KEY);
        return data ? JSON.parse(data) : { openAiBaseUrl: "", openAiApiKey: "", userName: "", modelName: "xai.grok-4" };
    },
};
