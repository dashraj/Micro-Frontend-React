import { StrictMode, useState } from 'react'
import './App.css'

export type AppExternalProps = {
  customerId: string;
  category: string;
};

export type AppInternalProps = AppExternalProps & {
  target?: Element;
};

export const App = ({ customerId, category }: AppInternalProps) => {
  const [count, setCount] = useState(0)

  return (
    <StrictMode>
      <div>
        <h1>Customer Id : {customerId}</h1>
        <h1>Category    : {category}</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
    </StrictMode>
  )
}

export default App
