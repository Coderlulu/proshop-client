import { createRoot } from "react-dom/client";
import "./bootstrap.min.css";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.js";
const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
