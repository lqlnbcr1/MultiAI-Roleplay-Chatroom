import { AppSettings, Character, Message, Room } from "./types";

export const AIService = {
    generateResponse: async (
        character: Character,
        room: Room,
        settings: AppSettings,
        targetId: string
    ): Promise<{ state: string; monologue: string; dialogue: string }> => {
        if (!settings.openAiApiKey) {
            throw new Error("API Key is missing within settings.");
        }

        // specific filtering for visibility
        const visibleHistory = room.messages.map((msg) => {
            const isSelf = msg.senderId === character.id;
            const role = isSelf ? "assistant" : "user";

            let content = "";
            let prefix = "";

            if (isSelf) {
                // AI sees its own full internal state
                prefix = "[Myself] ";
                content = JSON.stringify(msg.content);
            } else {
                // AI only sees dialogue of others
                const sender = room.characters.find(c => c.id === msg.senderId);
                const senderName = sender ? sender.name : (settings.userName || "User");
                prefix = `[${senderName}] `;
                content = `${msg.content.dialogue}`;
            }

            // specific "To Who" indicator
            let targetInfo = "";
            if (msg.targetId) {
                if (msg.targetId === character.id) {
                    targetInfo = "(To: Me) ";
                } else {
                    const targetChar = room.characters.find(c => c.id === msg.targetId);
                    const targetName = targetChar ? targetChar.name : (settings.userName || "User");
                    targetInfo = `(To: ${targetName}) `;
                }
            }

            return { role, content: `${prefix}${targetInfo}${content}` };
        });

        const targetChar = room.characters.find(c => c.id === targetId);
        const targetName = targetId === "user" ? (settings.userName || "User") : (targetChar?.name || "Unknown");

        const systemPrompt = `
You are roleplaying as ${character.name}.
Description: ${character.description}
Instruction: ${character.systemPrompt}

Background: ${room.background}

Current Action: You are replying to ${targetName}.

You must use chinese and respond in rigid JSON format with three fields:
1. "state": Briefly describe your current environment, physical/mental state, and circumstances.
2. "monologue": Your internal thoughts at this moment. (Private to you).
3. "dialogue": Your spoken lines. Must be in first person. You may include your action and descriptions of voice, breathing, or other sensory elements to heighten appeal.

Verify that your response is valid JSON.
Example:
{
  "state": "向后靠在椅子上，啜饮着咖啡。",
  "monologue": "他看起来有些焦躁。我得小心点。",
  "dialogue": "嗨，一切都还好吗？"
}
`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...visibleHistory.slice(-20), // Context window limit
        ];

        try {
            const response = await fetch(`${settings.openAiBaseUrl || "https://api.openai.com/v1"}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${settings.openAiApiKey}`,
                },
                body: JSON.stringify({
                    model: settings.modelName || "xai.grok-4",
                    messages: messages,
                    // response_format param removed as it causes 400 with this model/relay
                }),
            });

            if (!response.ok) {
                throw new Error(`OpenAI API Error: ${response.statusText}`);
            }

            const data = await response.json();
            let content = data.choices[0].message.content;

            // Robust JSON extraction
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                content = jsonMatch[0];
            }

            return JSON.parse(content);
        } catch (error) {
            console.error("AI Generation failed:", error);
            throw error;
        }
    },
};
