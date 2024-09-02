import { useEffect } from "react";
import "./App.scss";
import { useScript } from "./util";
import { EventBusAdaptor } from "./EventBusAdaptor";
import { useEventBusChannel } from "./hooks";

function App() {
  useScript("http://localhost:5173/dist/index.js");

  const channel = useEventBusChannel();

  useEffect(() => {
    channel.subscribe((event) => {
      if (event.type == "mfe:count-changed")
        channel.emit({
          type: "host:count-received",
        });
    });

    return () => {
      channel.dispose();
    };
  }, [channel]);

  return (
    <>
      <EventBusAdaptor />
      <app-delist customer-id="Bab" category="Manager"></app-delist>
    </>
  );
}

export default App;
