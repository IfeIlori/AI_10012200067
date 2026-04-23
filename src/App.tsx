import { useState } from "react";
import Background from "./components/Background";
import IntroScreen from "./components/IntroScreen";
import ChatScreen from "./components/ChatScreen";

export default function App() {
  const [screen, setScreen] = useState<"intro" | "chat">("intro");

  return (
    <>
      <Background />
      <IntroScreen
        visible={screen === "intro"}
        onLaunch={() => setScreen("chat")}
      />
      <ChatScreen
        visible={screen === "chat"}
        onBack={() => setScreen("intro")}
      />
    </>
  );
}
