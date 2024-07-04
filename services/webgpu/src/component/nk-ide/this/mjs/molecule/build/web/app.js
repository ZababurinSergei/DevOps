import React from 'react';
import { createRoot } from 'react-dom/client';
import { create, Workbench } from '../../esm';
import '../../esm/style/mo.css';

const moInstance = create({
    extensions: [],
});

export const App = () => moInstance.render(<Workbench />);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

// ReactDOM.render(
//     <StrictMode>
//         <App />
//     </StrictMode>,
//     document.getElementById('root')
// );
