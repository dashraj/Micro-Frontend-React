import { useEffect } from "react";
import "./App.scss";
import { useScript } from "./util";
import { EventBusAdaptor } from "./EventBusAdaptor";
import { EVENT_BUS_HOST_OUTPUT_CHANNEL_NAME } from "../../event-bus/common.constants";
import { useHostInputChannel, useHostOutputChannel } from "./hooks";

function App() {
  const [isLoaded, error] = useScript("http://localhost:5173/dist/index.js");

  const inputChannel = useHostInputChannel();
  const outputChannel = useHostOutputChannel();


  useEffect(() => {
    outputChannel.subscribe((event) => {
      inputChannel.emit({
        type: 'count-received'
      });
    })

    return () => {
      inputChannel.dispose();
      outputChannel.dispose();
    };
  }, [inputChannel, outputChannel]);

  return (
    <>
      <EventBusAdaptor />
      <app-delist customer-id="Bab" category="Manager"></app-delist>
    </>
  );
}

export default App;
