import { FC, memo, useEffect } from "react";
import { useEventBusChannel } from "./hooks";

export const HostEventBusLogger: FC = memo(function HostEventBusLogger() {
  const channel = useEventBusChannel();

  useEffect(() => {
    const subscription = channel.subscribe((event) => {
      if (event.type.toString().includes("mfe")) {
        console.log("event.received at host:", event);
      } else if (event.type.toString().includes("host")) {
        console.log("event.sent from host:", event);
      } else {
        console.log("unknown event:", event);
      }
    });
    return () => {
      subscription.dispose();
    };
  }, [channel]);

  return null;
});
