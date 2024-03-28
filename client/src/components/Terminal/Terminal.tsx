import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Map from "../Map/Map";
import Messages from "../Messages/Messages";
import CommandList from "../CommandList/CommandList";
import InventoryList from "../InventoryList/InventoryList";

const Terminal = () => {
  let socketio = useRef(
    io("localhost:5000", {
      auth: localStorage.user_id,
      autoConnect: false,
    })
  );
//https://retromooapi.onrender.com


  const [messages, setMessages] = useState([{ message: "", time: "" }]);

  const [map, setMap] = useState("");

  const [message, setMessage] = useState("");

  const [inventory, setInventory] = useState<{id: number, name: string, group: string}[]>([])

  useEffect(() => {
    socketio.current.connect();
    return () => {
      socketio.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketio.current.on("event", (data: { message: string }) => {
      setMessages((curr) => [
        ...curr,
        { message: data.message, time: new Date().toLocaleString() },
      ]);
    });
    socketio.current.on("map", (data: { map: string }) => {
      setMap(data.map);
    });
    socketio.current.on("inventory", (data: { inventory: {id: number, name: string, group: string}[] }) => {
      setInventory(data.inventory);
    });
  }, []);

  const submitTask = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      command: message.substr(0, message.indexOf(" ")),
      data: message.substr(message.indexOf(" ") + 1),
    };
    if (payload.command === "" && payload.data) {
      payload.command = payload.data;
      payload.data = "";
    }
    console.log(payload);
    socketio.current.emit("client", payload);
    setMessage("");
  };

  return (
    <div className="papyrus-box">
      <div className="map-box" id="map-box">
        <Map map={map} />
      </div>
      <div className="room-commands">
        <CommandList />
      </div>
      <div className="room-inventory">
        <InventoryList inventory={inventory} />
      </div>
      <div className="room-box">
        <h2 className="room-header">Narnia</h2>
        <div className="message-box">
          <div className="messages" id="messages">
            <Messages messages={messages} />
          </div>
          <form className="input" id="input-form" onSubmit={submitTask}>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Type here!"
              required
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <button id="send-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Terminal;
