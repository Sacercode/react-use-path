import { useState }  from 'react'
import { usePath } from '@sacercode/react-use-path'

const App = () => {
  const { currentPath, goTo, goBack, goHome } = usePath()
  const [target, setTarget] = useState("");

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>usePath Hook</h1>

        Watch code on <a
          href='https://github.com/sacercode/react-use-path'
          target='_blank' rel='noopener noreferrer'
        >
          Github
        </a>, or <a href="https://www.npmjs.com/package/@sacercode/react-use-path?activeTab=code" target='_blank' rel='noopener noreferrer'>
          NPM
        </a>.

        <h2>Demo</h2>
        Looking for such kind of component ? You might like <a
          href='https://sacercode.fr'
        >
          Sacercode
        </a>&apos;s <a
          href='https://github.com/sacercode/path-viewer'
          target='_blank' rel='noopener noreferrer'
        >
          path-viewer
        </a>, which uses this hook.
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <button onClick={goHome} style={{ marginRight: '10px' }}>🏠 Home</button>
          <span style={{ fontWeight: 'bold' }}>Current Path: /</span>
          {currentPath.map(
            (path, index) => (
              <>
                <span
                  style={{ color: '#0066cc', cursor: "pointer" }}
                  onClick={() => goBack(index)} key={"p-" + index}
                >
                  {path}
                </span>
                {index < currentPath.length - 1 && <span>/</span>}
              </>
            )
          )}
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

        <h2>Documentation</h2>
        <p>The <code>usePath</code> hook provides a simple way to manage and navigate paths in your application. It supports relative and absolute paths, as well as parent and current directory navigation. (Note that this is not a router)</p>
        <h3>Installation</h3>
        <pre><code>npm install @sacercode/use-path</code></pre>
        <h3>Usage</h3>
        <pre><code>import {"{ usePath }"} from &apos;@sacercode/use-path&apos;;</code></pre>
        <p>Then use the hook in your component:</p>
        <pre><code>const {"{ currentPath, currentPathString, setCurrentPath, goTo, goBack, goHome }"} = usePath();</code></pre>
        <h3>API</h3>
        <ul>
          <li><code>currentPath: string[]</code>: The current path as a string array.</li>
          <li><code>currentPathString: string</code>: The current path as a string.</li>
          <li><code>setCurrentPath(path: any|string[]): void</code>: Set the current path.</li>
          <li><code>goTo(path: string): void</code>: Navigate to a specific path.</li>
          <li><code>goBack(index: number): void</code>: Go back to the previous path. Or to given index.</li>
          <li><code>goHome(): void</code>: Go back to the root path.</li>
        </ul>
      </main>
    </div>
  )
}

export default App