import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppLogic } from "./hooks/use-app-logic.hook";
import StartPage from "./pages";
import ChatsPage from "./pages/chats";
import SingleChatPage from "./pages/chats/[id]";

function App() {
  const { user, loading, setUser } = useAppLogic();
  if (loading) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chats/:id" element={<SingleChatPage user={user} />} />
        <Route path="/chats" element={<ChatsPage user={user} />} />
        <Route path="*" element={<StartPage setUser={setUser} user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
