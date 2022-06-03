import React, { useState }  from 'react'
import { usePath } from 'use-path'

const App = () => {
  const { currentPath, goTo, goBack, goHome } = usePath()
  const [target, setTarget] = useState("");

  return (
    <div>
      <div>
        <button onClick={goHome}>Home</button>
        <label>Current Path : /</label>{currentPath.join("/")}
        <button onClick={goBack}>Go back</button>
      </div>
      <div>
        <label>Where do you want to go ?</label>
        <input
          value={target}
          onChange={
            (e) => setTarget(e.target.value)
          }
        />
        <button
          onClick={
            () => {
              goTo(target);
              setTarget("");
            }
          }
        >
          Go !
        </button>
      </div>
    </div>
  )
}
export default App