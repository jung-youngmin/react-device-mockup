import { useState } from "react";
import logo from "./logo.svg";
import cssStyles from "./App.module.css";
import AndroidDemo from "./demo/AndroidDemo";
import TouchableTitle from "./components/TouchableTitle";
import IosDemo from "./demo/IosDemo";

function App() {
	const [showAndroidDemo, setShowAndroidDemo] = useState(true);
	const [showAndroidTabDemo, setShowAndroidTabDemo] = useState(true);
	const [showIphoneDemo, setShowIphoneDemo] = useState(true);

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
				title="📞 AndroidMockup"
				isActive={showAndroidDemo}
				onClick={() => setShowAndroidDemo(prev => !prev)}
			/>
			{showAndroidDemo && <AndroidDemo mdoe="phone" />}

			<TouchableTitle
				title="📺 AndroidTabMockup"
				isActive={showAndroidTabDemo}
				onClick={() => setShowAndroidTabDemo(prev => !prev)}
			/>
			{showAndroidTabDemo && <AndroidDemo mdoe="tab" />}

			<TouchableTitle
				title="📞 IPhoneMockup"
				isActive={showIphoneDemo}
				onClick={() => setShowIphoneDemo(prev => !prev)}
			/>
			{showIphoneDemo && <IosDemo mdoe="phone" />}
		</div>
	);
}

export default App;
