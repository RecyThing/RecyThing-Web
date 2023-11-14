import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import { Provider } from "react-redux";
// import { store } from "./store";
import { theme } from "./configs";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			{/* <Provider store={store}> */}
				<ChakraProvider
					theme={theme}
					resetCSS
				>
					<App />
				</ChakraProvider>
			{/* </Provider> */}
		</BrowserRouter>
	</React.StrictMode>
);
