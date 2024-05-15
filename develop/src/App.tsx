import { Property } from "csstype";
import React, { CSSProperties, useMemo, useState } from "react";
import logo from "./logo.svg";
import cssStyles from "./App.module.css";
import { AndroidMockup } from "./dist";
import ColorkButton from "./components/ColorkButton";
import InputButton from "./components/InputButton";
import AndroidDemo from "./demo/AndroidDemo";
import TouchableTitle from "./components/TouchableTitle";

function App() {
	const [showAndroidDemo, setShowAndroidDemo] = useState(false);

	return (
		<div className={cssStyles.App}>
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header> */}
			<TouchableTitle
				title="AndroidMockup"
				isActive={showAndroidDemo}
				onClick={() => setShowAndroidDemo(prev => !prev)}
			/>
			{showAndroidDemo && <AndroidDemo />}
		</div>
	);
}

export default App;
