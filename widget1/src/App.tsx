import { StrictMode, useEffect, useState } from "react";
import "./App.scss";

export type AppExternalProps = {
  customerId: string;
  category: string;
};

export type AppInternalProps = AppExternalProps & {
  target?: Element;
};

export const App = (props: AppInternalProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("count", count);
    document.dispatchEvent(
      new CustomEvent("mfe-event", {
        detail: {
          count: count,
        },
      })
    );
  }, [count]);
  return (
    <StrictMode>
      <div className="grid p-5 mt-5 border shadow-lg rounded-xl w-full">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Risk of delist</h1>
        </div>
        <div className="p-10 py-20 mt-2">
          <div>
            <p>Customer: {props.customerId}</p>
            <p>Category: {props.category}</p>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
};

export default App;
