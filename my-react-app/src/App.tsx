import { useActionState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { processData, initialActionState } from './actions';
import { ActionForm } from './components/ActionForm';
import { Processor3D } from './components/Processor3D';
import './App.css';

function App() {
  const [state, formAction, isPending] = useActionState(processData, initialActionState);

  // Determine the visual status for the 3D component
  const visualStatus = isPending ? 'pending' : state.status;

  return (
    <div className="app-container">
      {/* 3D Scene */}
      <div className="canvas-layer">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Processor3D status={visualStatus} state={state} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="ui-layer">
        {/* Header */}
        <header className="app-header">
          <div>
            <h1 className="app-title">
              React 19 <span className="highlight">useActionState</span>
            </h1>
            <p className="app-subtitle">Interactive Learning Visualization</p>
          </div>
          <div style={{ display: 'block' }}>
            <a
              href="https://react.dev/reference/react/useActionState"
              target="_blank"
              rel="noreferrer"
              className="docs-link"
            >
              Read Documentation &rarr;
            </a>
          </div>
        </header>

        {/* Form Component */}
        <ActionForm
          formAction={formAction}
          isPending={isPending}
          state={state}
        />
      </div>
    </div>
  );
}

export default App;
