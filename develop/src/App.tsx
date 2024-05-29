import { useState } from "react";
import cssStyles from "./App.module.css";
import TouchableTitle from "./components/TouchableTitle";
import AndroidDemo from "./demo/AndroidDemo";
import InstallDemo from "./demo/InstallDemo";
import IosDemo from "./demo/IosDemo";
import PackageDemo from "./demo/PackageDemo";

function App() {
	const [showInstallDemo, setShowInstallDemo] = useState(true);
	const [showAndroidDemo, setShowAndroidDemo] = useState(false);
	const [showAndroidTabDemo, setShowAndroidTabDemo] = useState(false);
	const [showIphoneDemo, setShowIphoneDemo] = useState(false);
	const [showIpadDemo, setShowIpadDemo] = useState(false);

	return (
		<div className={cssStyles.App}>
			<header style={{ textAlign: "center" }}>
				<h1 style={{ margin: 0 }}>Full Demo</h1>
				<h2 style={{ margin: 0 }}>Device Mockup</h2>
			</header>

			<PackageDemo />

			<TouchableTitle
				title="Install & import"
				isActive={showInstallDemo}
				onClick={() => setShowInstallDemo(prev => !prev)}
			/>
			{showInstallDemo && <InstallDemo />}

			<TouchableTitle
				title="📞 AndroidMockup"
				isActive={showAndroidDemo}
				onClick={() => setShowAndroidDemo(prev => !prev)}
			/>
			<AndroidDemo mode="phone" showDemo={showAndroidDemo} />

			<TouchableTitle
				title="📺 AndroidTabMockup"
				isActive={showAndroidTabDemo}
				onClick={() => setShowAndroidTabDemo(prev => !prev)}
			/>
			<AndroidDemo mode="tab" showDemo={showAndroidTabDemo} />

			<TouchableTitle
				title="📞 IPhoneMockup"
				isActive={showIphoneDemo}
				onClick={() => setShowIphoneDemo(prev => !prev)}
			/>
			<IosDemo mode="phone" showDemo={showIphoneDemo} />

			<TouchableTitle
				title="📺 IPadMockup"
				isActive={showIpadDemo}
				onClick={() => setShowIpadDemo(prev => !prev)}
			/>
			<IosDemo mode="tab" showDemo={showIpadDemo} />
		</div>
	);
}

export default App;
