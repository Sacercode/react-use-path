import React, { useState }  from 'react'
import { usePath } from 'use-path'

const App = () => {
  const { currentPathString, goTo, goBack, goHome } = usePath()
  const [target, setTarget] = useState("");

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>usePath Hook</h1>

      <h2>Demo</h2>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <button onClick={goHome} style={{ marginRight: '10px' }}>🏠 Home</button>
        <span style={{ fontWeight: 'bold' }}>Current Path: /</span>
        <span style={{ color: '#0066cc' }}>{currentPathString}</span>
        <button onClick={goBack} style={{ marginLeft: '10px' }}>⬅️ Go back</button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Where do you want to go?</label>
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="folder1/folder2 or /absolute/path"
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button
          onClick={() => {
            goTo(target);
            setTarget("");
          }}
          style={{ padding: '8px 16px' }}
        >
          Go !
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Examples to try:</h3>
        <ul>
          <li><code>folder1/folder2</code> - Navigate relative to current path</li>
          <li><code>/documents/photos</code> - Navigate to absolute path</li>
          <li><code>../sibling</code> - Go back and enter sibling folder</li>
          <li><code>/</code> - Go to root</li>
          <li><code>/users/../home/./documents</code> - Complex absolute path</li>
        </ul>
      </div>

      <div style={{ backgroundColor: '#e8f4fd', padding: '10px', borderRadius: '5px' }}>
        <strong>Features:</strong>
        <ul>
          <li>✅ Relative paths: <code>folder1/folder2</code></li>
          <li>✅ Absolute paths: <code>/folder1/folder2</code></li>
          <li>✅ Parent navigation: <code>..</code></li>
          <li>✅ Current directory: <code>.</code></li>
          <li>✅ Path history with go back</li>
        </ul>
      </div>

      <h2>Documentation</h2>
      <p>The <code>usePath</code> hook provides a simple way to manage and navigate paths in your application. It supports relative and absolute paths, as well as parent and current directory navigation. (Note that this is not a router)</p>
      <h3>Installation</h3>
      <pre><code>npm install use-path</code></pre>
      <h3>Usage</h3>
      <pre><code>import {"{ usePath }"} from &apos;use-path&apos;;</code></pre>
      <p>Then use the hook in your component:</p>
      <pre><code>const {"{ currentPath, goTo, goBack, goHome }"} = usePath();</code></pre>
      <h3>API</h3>
      <ul>
        <li><code>currentPath</code>: The current path as an array.</li>
        <li><code>currentPathString</code>: The current path as a string.</li>
        <li><code>goTo(path: string): void</code>: Navigate to a specific path.</li>
        <li><code>goBack(): void</code>: Go back to the previous path.</li>
        <li><code>goHome(): void</code>: Go back to the root path.</li>
      </ul>
    </div>
  )
}

export default App