import { Property } from "csstype";
import { useCallback, useMemo, useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import ColorButton from "../components/ColorButton";
import InputButton from "../components/InputButton";
// import { AndroidMockup, AndroidTabMockup } from "../dist";
import { AndroidMockup, AndroidTabMockup } from "react-device-mockup";
import CodeBlock from "./CodeBlock";
import ScreenDemo from "./ScreenDemo";
import demoStyle from "./demo.module.css";

interface IAndroidDemoProps {
	readonly mode: "phone" | "tab";
}
export default function AndroidDemo(props: IAndroidDemoProps) {
	const DEFAULT_SCREEN_WIDTH = 200;
	const DEFAULT_FRAME_COLOR = "#666666";
	const DEFAULT_STATUS_BAR_COLOR = "#CCCCCC";

	const [screenWidth, setScreenWidth] = useState(DEFAULT_SCREEN_WIDTH);
	const [noRoundedScreen, setNoRoundedScreen] = useState(false);
	const [isLandscape, setIsLandscape] = useState(false);
	const [hideStatusBar, setHideStatusBar] = useState(false);
	const [frameColor, setFrameColor] = useState<Property.Color>(DEFAULT_FRAME_COLOR);
	const [statusbarColor, setStatusbarColor] = useState<Property.Color>(DEFAULT_STATUS_BAR_COLOR);
	const [navBar, setNavBar] = useState<"swipe" | "bhr" | "rhb">("swipe");
	const [navBarcolor, setNavBarcolor] = useState<Property.Color>(DEFAULT_STATUS_BAR_COLOR);
	const [transparentNavBar, setTransparentNavBar] = useState<boolean>(false);
	const [hideNavBar, setHideNavBar] = useState<boolean>(false);
	const [transparentCamArea, setTransparentCamArea] = useState<boolean>(false);

	const [showScreenDemo, setShowScreenDemo] = useState<boolean>(false);

	const resetAll = useCallback(() => {
		setScreenWidth(DEFAULT_SCREEN_WIDTH);
		setNoRoundedScreen(false);
		setIsLandscape(false);
		setHideStatusBar(false);
		setFrameColor(DEFAULT_FRAME_COLOR);
		setStatusbarColor(DEFAULT_STATUS_BAR_COLOR);
		setNavBar("swipe");
		setNavBarcolor(DEFAULT_STATUS_BAR_COLOR);
		setTransparentNavBar(false);
		setHideNavBar(false);
		setTransparentCamArea(false);
		setShowScreenDemo(false);
	}, []);

	const samplecode = useMemo(() => {
		let code = props.mode === "phone" ? "<AndroidMockup" : "<AndroidTabMockup";
		code += `\n  screenWidth={${screenWidth}}`;

		if (isLandscape) {
			code += `\n  isLandscape`;
		}

		if (noRoundedScreen) {
			code += `\n  noRoundedScreen`;
		}

		if (frameColor !== DEFAULT_FRAME_COLOR) {
			code += `\n  frameColor={"${frameColor}"}`;
		}

		if (statusbarColor !== DEFAULT_STATUS_BAR_COLOR) {
			code += `\n  statusbarColor={"${statusbarColor}"}`;
		}

		if (hideStatusBar) {
			code += `\n  hideStatusBar`;
		}

		if (navBar !== "swipe") {
			code += `\n  navBar={"${navBar}"}`;
		}

		if (navBarcolor !== DEFAULT_STATUS_BAR_COLOR) {
			code += `\n  navBarcolor={"${navBarcolor}"}`;
		}

		if (transparentNavBar) {
			code += `\n  transparentNavBar`;
		}

		if (hideNavBar) {
			code += `\n  hideNavBar`;
		}

		if (props.mode === "phone" && transparentCamArea) {
			code += `\n  transparentCamArea`;
		}

		code += ">";

		if (showScreenDemo) {
			code += "\n  <YourScreenDemo />";
		}

		code += props.mode === "phone" ? `\n</AndroidMockup>` : `\n</AndroidTabMockup>`;
		return code;
	}, [
		props.mode,
		screenWidth,
		isLandscape,
		noRoundedScreen,
		frameColor,
		statusbarColor,
		hideStatusBar,
		navBar,
		navBarcolor,
		transparentNavBar,
		hideNavBar,
		transparentCamArea,
		showScreenDemo,
	]);

	return (
		<div className={demoStyle.flexRowWrap} style={{ justifyContent: "center" }}>
			<div className={demoStyle.flexBox} style={{ display: "flex" }}>
				{props.mode === "phone" && (
					<AndroidMockup
						screenWidth={screenWidth}
						isLandscape={isLandscape}
						noRoundedScreen={noRoundedScreen}
						frameColor={frameColor}
						statusbarColor={statusbarColor}
						hideStatusBar={hideStatusBar}
						navBar={navBar}
						navBarcolor={navBarcolor}
						transparentNavBar={transparentNavBar}
						hideNavBar={hideNavBar}
						transparentCamArea={transparentCamArea}>
						{showScreenDemo && (
							<ScreenDemo screenWidth={screenWidth} isLandscape={isLandscape} />
						)}
					</AndroidMockup>
				)}
				{props.mode === "tab" && (
					<AndroidTabMockup
						screenWidth={screenWidth}
						isLandscape={isLandscape}
						noRoundedScreen={noRoundedScreen}
						frameColor={frameColor}
						statusbarColor={statusbarColor}
						hideStatusBar={hideStatusBar}
						navBar={navBar}
						navBarcolor={navBarcolor}
						transparentNavBar={transparentNavBar}
						hideNavBar={hideNavBar}>
						{showScreenDemo && (
							<ScreenDemo screenWidth={screenWidth} isLandscape={isLandscape} />
						)}
					</AndroidTabMockup>
				)}
			</div>
			{/* control panel */}
			<div className={`${demoStyle.flexColWrap} ${demoStyle.flexBox}`}>
				<ColorButton
					label="Reset All"
					isActive={false}
					showIcon={false}
					style={{ paddingTop: 8, paddingBottom: 8 }}
					onClick={resetAll}
				/>
				<h3 className={demoStyle.cardTitle}>Common</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexColWrap}`}
					style={{ paddingTop: 8 }}>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<InputButton
							className={demoStyle["mt8mr30"]}
							label="✨ screenWidth"
							inputType="number"
							defaultVal={DEFAULT_SCREEN_WIDTH.toString()}
							value={screenWidth.toString()}
							placeholder="screenWidth"
							onClickSubmit={inputVal => {
								setScreenWidth(Number(inputVal));
							}}
						/>
						<ButtonGroup
							className={demoStyle["mt8mr30"]}
							title="screenWidth Preset"
							buttonData={[
								{
									label: "200",
									isActive: screenWidth === 200,
									onClick: () => setScreenWidth(200),
								},
								{
									label: "300",
									isActive: screenWidth === 300,
									onClick: () => setScreenWidth(300),
								},
								{
									label: "400",
									isActive: screenWidth === 400,
									onClick: () => setScreenWidth(400),
								},
							]}
						/>
					</div>
					<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
						<InputButton
							label="frameColor"
							inputType="text"
							defaultVal={DEFAULT_FRAME_COLOR}
							placeholder="frameColor"
							onClickSubmit={inputVal => {
								setFrameColor(inputVal);
							}}
						/>
						<span
							className={demoStyle.colorSample}
							style={{ backgroundColor: frameColor }}
						/>
					</div>
					<div className={demoStyle.flexRowWrap}>
						<ColorButton
							label="isLandscape"
							isActive={isLandscape}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setIsLandscape(prev => !prev)}
						/>
						<ColorButton
							label="noRoundedScreen"
							isActive={noRoundedScreen}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setNoRoundedScreen(prev => !prev)}
						/>
						<ColorButton
							label="showScreenDemo"
							isActive={showScreenDemo}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setShowScreenDemo(prev => !prev)}
						/>
					</div>
				</div>

				<h3 className={demoStyle.cardTitle}>Statusbar</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}
					style={{ paddingTop: 8 }}>
					<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
						<InputButton
							label="statusbarColor"
							inputType="text"
							defaultVal={DEFAULT_STATUS_BAR_COLOR}
							placeholder="statusbarColor"
							onClickSubmit={inputVal => {
								setStatusbarColor(inputVal);
							}}
						/>
						<span
							className={demoStyle.colorSample}
							style={{ backgroundColor: statusbarColor }}
						/>
					</div>
					<ColorButton
						label="hideStatusBar"
						isActive={hideStatusBar}
						showIcon
						className={demoStyle["mt16mr16"]}
						onClick={() => setHideStatusBar(prev => !prev)}
					/>
				</div>

				<h3 className={demoStyle.cardTitle}>Navigation Bar</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexColWrap}`}
					style={{ paddingTop: 8 }}>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<ButtonGroup
							title="navBar"
							className={demoStyle["mt8mr30"]}
							buttonData={[
								{
									label: "swipe",
									isActive: navBar === "swipe",
									onClick: () => setNavBar("swipe"),
								},
								{
									label: "bhr",
									isActive: navBar === "bhr",
									onClick: () => setNavBar("bhr"),
								},
								{
									label: "rhb",
									isActive: navBar === "rhb",
									onClick: () => setNavBar("rhb"),
								},
							]}
						/>
						<div className={demoStyle.flexAlignEnd + " " + demoStyle["mt8mr30"]}>
							<InputButton
								label="navBarcolor"
								inputType="text"
								defaultVal={DEFAULT_STATUS_BAR_COLOR}
								placeholder="navBarcolor"
								onClickSubmit={inputVal => {
									setNavBarcolor(inputVal);
								}}
							/>
							<span
								className={demoStyle.colorSample}
								style={{ backgroundColor: navBarcolor }}
							/>
						</div>
					</div>
					<div className={demoStyle.flexRowWrap + " " + demoStyle.flexAlignEnd}>
						<ColorButton
							label="transparentNavBar"
							isActive={transparentNavBar}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setTransparentNavBar(prev => !prev)}
						/>
						<ColorButton
							label="hideNavBar"
							isActive={hideNavBar}
							showIcon
							className={demoStyle["mt16mr16"]}
							onClick={() => setHideNavBar(prev => !prev)}
						/>
						{props.mode === "phone" && (
							<ColorButton
								label="transparentCamArea"
								isActive={transparentCamArea}
								showIcon
								className={demoStyle["mt16mr16"]}
								onClick={() => setTransparentCamArea(prev => !prev)}
							/>
						)}
					</div>
				</div>
				{props.mode === "phone" && (
					<div
						className={demoStyle.subLabel}
						style={{ display: "initial", marginLeft: 16, marginTop: 4 }}>
						⚠️ <code className={demoStyle.code}>transparentCamArea</code> only works
						when
						<code className={demoStyle.code}> isLandscape=true</code>
					</div>
				)}
				{/* code */}
				<CodeBlock title="Code" sampleCode={samplecode} />
			</div>
		</div>
	);
}
