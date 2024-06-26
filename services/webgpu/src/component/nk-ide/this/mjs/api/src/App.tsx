import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { create, Workbench } from '@dtinsight/molecule';
import '@dtinsight/molecule/esm/style/mo.css';

import extensions from './extensions';
import MyWorkbench from './views/myWorkbench';

(window as any).__DEVELOPMENT__ = false;

function NotFound() {
    return (
        <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
        </main>
    );
}

const moleculeInst = create({
    extensions
});

const DefaultWorkbench = () => moleculeInst.render(<Workbench />);
const CustomWorkbench = () => moleculeInst.render(<MyWorkbench />);

export const ApiContext = React.createContext({});

function App(props: any) {

    return (
        <ApiContext.Provider value={props.component}>
            <div className="App">
                <Routes>
                    <Route path="/" element={<CustomWorkbench />} />
                    <Route path="vscode" element={<DefaultWorkbench />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </ApiContext.Provider>
    );
}

export default App;
