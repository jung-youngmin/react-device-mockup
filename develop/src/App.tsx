import { useState } from "react";
import logo from "./logo.svg";
import cssStyles from "./App.module.css";
import AndroidDemo from "./demo/AndroidDemo";
import TouchableTitle from "./components/TouchableTitle";
import IosDemo from "./demo/IosDemo";
import CodeBlock from "./demo/CodeBlock";

function App() {
	const [showAndroidDemo, setShowAndroidDemo] = useState(false);
	const [showAndroidTabDemo, setShowAndroidTabDemo] = useState(false);
	const [showIphoneDemo, setShowIphoneDemo] = useState(false);
	const [showIpadDemo, setShowIpadDemo] = useState(false);

	const rnImport = `import {
  AndroidMockup,
  AndroidTabMockup,
  IPhoneMockup,
  IPadMockup
}
from "react-native-device-mockup"`;
	const rImport = `import {
	AndroidMockup,
	AndroidTabMockup,
	IPhoneMockup,
	IPadMockup
  }
  from "react-native-device-mockup"`;

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
			{/* // TODO */}
			<TouchableTitle title="Install & import" isActive onClick={() => {}} />
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				<CodeBlock
					title="React"
					language="bash"
					sampleCode="npm install react-device-mockup"
				/>
				<CodeBlock title="React" language="ts" sampleCode={rImport} />
			</div>
			<CodeBlock
				title="React Native"
				language="bash"
				sampleCode="npm install react-native-device-mockup"
			/>
			<CodeBlock title="React Native" language="ts" sampleCode={rnImport} />

			<TouchableTitle
				title="📞 AndroidMockup"
				isActive={showAndroidDemo}
				onClick={() => setShowAndroidDemo(prev => !prev)}
			/>
			{showAndroidDemo && <AndroidDemo mode="phone" />}

			<TouchableTitle
				title="📺 AndroidTabMockup"
				isActive={showAndroidTabDemo}
				onClick={() => setShowAndroidTabDemo(prev => !prev)}
			/>
			{showAndroidTabDemo && <AndroidDemo mode="tab" />}

			<TouchableTitle
				title="📞 IPhoneMockup"
				isActive={showIphoneDemo}
				onClick={() => setShowIphoneDemo(prev => !prev)}
			/>
			{showIphoneDemo && <IosDemo mode="phone" />}

			<TouchableTitle
				title="📺 IPadMockup"
				isActive={showIpadDemo}
				onClick={() => setShowIpadDemo(prev => !prev)}
			/>
			{showIpadDemo && <IosDemo mode="tab" />}
		</div>
	);
}

export default App;
