import { useEffect } from "react";
import "./App.scss";
import { useScript } from "./util";

function App() {
  const [isLoaded, error] = useScript("http://localhost:5173/dist/index.js");

  useEffect(() => {
    console.log(isLoaded);
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.addEventListener("mfe-event", (event: any) => {
      console.log(event);
      // alert(`Counter value is ${event?.detail?.count}`);
    });
  }, [isLoaded, error]);
  return (
    <>
      <app-delist customer-id="Bab" category="Manager"></app-delist>
    </>
  );
}

export default App;
