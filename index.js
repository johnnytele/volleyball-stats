import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { registerRootComponent } from "expo";

registerRootComponent(Main);


export default function Main() {
    return (
        <Provider store={store}>
            <App />
        </Provider> 
    );
}