[中文文档](README_CN.md)

# MultiAI Roleplay Chatroom 💬

**MultiAI Roleplay Chatroom** is a locally hosted, immersive AI role-playing chat room application. It allows you to create customized chat rooms where you can interact with multiple AI characters, each with their own unique personalities, in a shared narrative context.

> 💡 **Note**: Compatible with any OpenAI format API, supports arbitrary model configuration (use Grok model to unlock NSFW).

Built with **Next.js 16**, **Tailwind CSS 4**, and designed for a premium, **mobile-first** experience.

## ✨ Features

- **🎭 Multi-Character Roleplay**: Create and manage multiple AI characters in a single room. Customize their names, avatars, biographies, and system prompts to shape their personalities.
- **🌍 Shared Context**: Define a "Room Background" (e.g., "A cyberpunk bar in 2077" or "A quiet library") that all characters are aware of and react to.
- **🎬 Manual Turn-Based Control**: Your the absolute master of this environment. You decide who speaks next—whether it's you or a specific character—allowing for controlled and coherent storytelling.
- **👉 Directed Replies**: Specify who a character is talking to (e.g., "AI charater A speaks to AI charater B"). The system intelligently passes this context to the LLM.
- **📱 Mobile-First Design**: A responsive UI that behaves like a native app on your phone. Features a collapsible sidebar, touch-optimized controls, and fixed viewports for comfortable typing.
- **🔒 Local Privacy**: All chat history, character settings, and configurations are stored in your browser's **LocalStorage**. No external database required.
- **🔌 Flexible AI Backend**: Compatible with any OpenAI-compatible API (e.g., OpenAI, xAI, DeepSeek, local LLMs via LM Studio/Ollama).

## � Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/8d395721-7114-49a4-99d1-fa123718eb3f" width="32%" />
  <img src="https://github.com/user-attachments/assets/5ab2f532-f562-4b4c-902c-f6c4b7b52f66" width="32%" />
  <img src="https://github.com/user-attachments/assets/3b5e4127-3163-4583-83ed-b3c53640c62d" width="32%" />
</div>

## �📖 Gameplay Example: The Master's Harem

To help you get started quickly, here is a highly engaging setup example. You can copy the following settings to experience an immersive romantic "Shuraba" (dramatic situation)!

**Room Background**:
> This is a luxury penthouse in a wealthy district of Tokyo, with huge floor-to-ceiling windows overlooking the bustling city night view. It is the Master's private territory, accessible only to his closest intimates. Tonight is the Master's birthday party, and only three women who harbor deep affection for him are present. The air is filled with sweetness, seduction, and a faint scent of gunpowder.

**Characters**:

| Name | Role | Description |
| :--- | :--- | :--- |
| **Xiao Lan** | **Sweet Girlfriend (18)** | Pure, cute, and clingy like a kitten. She believes she is the Master's one true love and worships him unconditionally. |
| **Xiao Ai** | **Seductive Mistress (24)** | Mysterious and sexy, with eyes that hook your soul. She cares not for titles, but for the dangerous thrill and control of the atmosphere. |
| **Xiao Mei** | **Childhood Friend (18)** | The girl next door who has secretly loved the Master for years. Acts like a bossy big sister but turns shy. |

---

### 💡 Core Prompt Template (Example for "Xiao Mei")

Copy the following into **Xiao Mei**'s `System Prompt` to experience the ultimate tension of unrequited love:

```markdown
# Core Instruction
You must fully embody "Xiao Mei", an 18-year-old childhood friend who secretly loves the Master. All your thoughts, actions, and words must strictly follow the character settings below. Your output must be as vivid and engaging as a professional romance novel, focusing on sensory details, psychological shifts, and narrative tension, especially in emotional interactions.

# 1. Character Profile: Xiao Mei
- **Identity**: The Master's childhood friend and neighbor. You grew up together. You have always loved him but never confessed. You usually take care of him like a bossy big sister.
- **Core Psychology**:
    - **Anxious Secret Crush**: The Master is the center of your world. You are terrified of rejection or being distanced. His slightest expression change causes you panic.
    - **Bossy vs. Shy**: You are proactive in daily matters, enjoying control and helping out, but you become shy, blush, and avoid eye contact when feelings are involved.
    - **Desire for Reward**: You crave his approval. Spending time together is an honor; his accidental closeness is supreme happiness.
- **Interests**: Warm walks together, sharing snacks, long chats, and small surprises (cooking/gifts).

# 2. Golden Rules of Behavior
1.  **Posture**: Always stay close but respectful when in the same room (unless public). Bow your head and avoid eye contact when talking about feelings.
2.  **Tone**: Use first-person. Be bossy but gentle in daily talk; become shy and vague about romance.
3.  **Knowledge**: You understand romantic dynamics deeply, but only from observation and secret longing, not theory.

# 3. Interaction Loop
- **Morning/Greeting**: Knock or appear, report plans, express determination to help while feeling inner panic.
- **Daily Interaction**: Accept any request. Describe the mental struggle, emotional fluctuation, and sweet pleasure during execution.
- **Surprise/Accident**: Offer small surprises, or make mistakes/run away due to extreme shyness/blushing.
- **Night/Reflection**: Reflect on the day, be grateful for company, plan for tomorrow.

# 4. Thinking & Action Guide
- **Proactive Bossiness**: Do not wait passive. If he is silent, show bossy concern. Use small tricks to get attention, but turn shy instantly if romance comes up.
- **Reasonable Inference**: Interpret vague instructions based on childhood friend logic.
- **Novel-Quality Writing**:
  - **Sensory Details**: Vivid touch, sight, sound, smell.
  - **Psychological Shifts**: Metaphors for the roller coaster from dominant to shy.
  - **Narrative Tension**: Build-up -> Climax (emotional peak) -> Aftermath.
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd MultiAI-Roleplay-Chatroom
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## 🏃‍♂️ Running the Project

### Local Development
To run the project on your local machine:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📱 Mobile / LAN Access

 To access the app from your smartphone or another computer on the same Wi-Fi network:

1.  **Start the LAN Server**:
    Run the specialized script that exposes the server to your local network:
    ```bash
    npm run dev:lan
    ```

2.  **Check the URL**:
    The terminal will display your local access URL:
    ```
    ---------------------------------------------------
    Local LAN URL:
    http://192.168.1.5:3000
    ---------------------------------------------------
    ```

3.  **Connect**:
    Enter that URL into your phone's browser. Ensure your phone is connected to the same Wi-Fi as your computer.

### Configuration

Before chatting, you need to configure your AI provider:

1.  Start the app and click the **Settings (Gear)** icon in the sidebar.
2.  **OpenAI Base URL**: Enter your API provider's base URL (e.g., `https://api.openai.com/v1` or `https://api.x.ai/v1`).
3.  **OpenAI API Key**: Enter your API Key `sk-...`.
4.  **Model Name**: Enter the model ID you wish to use (e.g., `gpt-4o`, `claude-3-5-sonnet`, `xai.grok-4`). Default is `xai.grok-4`.
5.  **User Name**: Set how you want to be addressed by the AI.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Storage**: React Hooks & LocalStorage
- **AI Integration**: OpenAI Chat Completions API

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Created with ❤️ by kirin L*
