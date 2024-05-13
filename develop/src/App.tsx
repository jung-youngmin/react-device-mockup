import React, { CSSProperties, useMemo, useState } from "react";
import logo from "./logo.svg";
import cssStyles from "./App.module.css";
import { AndroidMockup } from "./dist";
import ColorkButton from "./components/ColorkButton";
import InputButton from "./components/InputButton";

function App() {
	const mockupContainerStyle = useMemo<CSSProperties>(() => {
		return {
			// borderWidth: 1,
			padding: 5,
			marginTop: 10,
			// alignItems: 'flex-end',
		};
	}, []);

	const DEFAULT_SCREEN_WIDTH = 200;
	const [screenWidth, setScreenWidth] = useState(DEFAULT_SCREEN_WIDTH);
	const [noRoundedScreen, setNoRoundedScreen] = useState(false);

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
			<h1>AndroidMockup</h1>
			<div>
				<AndroidMockup
					screenWidth={screenWidth}
					noRoundedScreen={noRoundedScreen}
					// isLandscape={false}
					containerStlye={mockupContainerStyle}
					// frameColor="green"
					// statusbarColor="red"
					// hideStatusBar
					// navBar="bhr"
					// navBarcolor="blue"
					// transparentNavBar
					// hideNavBar={true}
				>
					<ScreenDemo />
				</AndroidMockup>
				<ColorkButton
					label="noRoundedScreen"
					isActive={noRoundedScreen}
					showIcon
					onClick={() => setNoRoundedScreen(prev => !prev)}
				/>
				<InputButton
					label="screenWidth"
					inputType="number"
					defaultVal={DEFAULT_SCREEN_WIDTH.toString()}
					placeholder="screenWidth"
					style={{ marginTop: 4 }}
					onClickSubmit={inputVal => {
						setScreenWidth(Number(inputVal));
					}}
				/>
			</div>
		</div>
	);
}

const _ScreenDemo = ({ style }: { style?: CSSProperties }) => {
	const [isDown, setIsDown] = useState(false);

	return (
		<div
			className={cssStyles.screenContainer}
			// onMouseDown={() => {
			// 	console.log("down");
			// 	setIsDown(true);
			// }}
			// onMouseUp={() => {
			// 	setIsDown(false);
			// }}
		>
			<div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
				<div className={cssStyles.appRow}>
					<div className={cssStyles.appIcon} />
					<div className={cssStyles.appIcon} />
					<div className={cssStyles.appIcon} />
					<div className={cssStyles.appIcon} />
				</div>
				<div className={cssStyles.appRow}>
					<div className={cssStyles.appIcon} />
					<div className={cssStyles.appIcon} />
					<div className={cssStyles.appIcon} />
					<div className={`${cssStyles.appIcon} ${cssStyles.transparent}`} />
				</div>
			</div>
		</div>
	);
};
const ScreenDemo = React.memo(_ScreenDemo);

const styles: { [key: string]: CSSProperties } = {
	buttons: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 10,
		marginRight: 10,
	},
};

export default App;
