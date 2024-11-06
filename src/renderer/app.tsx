import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from "./store";
import {router} from "./router";
import {ErrorBoundary} from "react-error-boundary";

const ErrorFallback = ({}) => {
  return (
    <div>
      <h2>Something went wrong</h2>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <ErrorBoundary fallback={<ErrorFallback/>}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </PersistGate>
  </Provider>
);
