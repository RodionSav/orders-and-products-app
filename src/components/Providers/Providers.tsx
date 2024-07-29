import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { SocketContext } from "../contexts/SocketContext";
import { io, Socket } from "socket.io-client";
import { store } from "@/redux/store";

const socket: Socket = io("http://localhost:3000");

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </Provider>
  );
};
