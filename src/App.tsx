import { useState } from 'react';
import { MatrixProvider } from './context/MatrixContext';
import { MatrixTable } from './components/MatrixTable';

function App() {
  const [M, setM] = useState(5);
  const [N, setN] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Matrix App</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col justify-start gap-5 mb-4">
            <div>
              <label className="mr-2">M:</label>
              <input
                type="range"
                value={M}
                min={0}
                max={100}
                step={1}
                onChange={e => setM(+e.target.value)}
                className="border p-2 m-2"
              />
              <span className="text-lg font-medium">{M}</span>
            </div>

            <div>
              <label className="mr-2">N:</label>
              <input
                type="range"
                value={N}
                min={0}
                max={100}
                step={1}
                onChange={e => setN(+e.target.value)}
                className="border p-2 m-2"
              />
              <span className="text-lg font-medium">{N}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2"
          >
            Generate Matrix
          </button>
        </form>
      ) : (
        <MatrixProvider m={M} n={N}>
          <MatrixTable />
        </MatrixProvider>
      )}
    </div>
  );
}

export default App;












