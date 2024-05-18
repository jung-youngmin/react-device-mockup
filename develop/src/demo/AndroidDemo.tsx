import { Property } from "csstype";
import { useCallback, useEffect, useMemo, useState } from "react";
import Highlight from "react-highlight";
import InputButton from "../components/InputButton";
import ColorButton from "../components/ColorButton";
import { AndroidMockup, AndroidTabMockup } from "../dist";
import demoStyle from "./demo.module.css";
import ScreenDemo from "./ScreenDemo";
import ButtonGroup from "../components/ButtonGroup";

interface IAndroidDemoProps {
	readonly mdoe: "phone" | "tab";
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

	const [isCopied, setIsCopied] = useState(false);
	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 1500);
		}
	}, [isCopied]);

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
		let code = props.mdoe === "phone" ? "<AndroidMockup" : "<AndroidTabMockup";
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

		if (props.mdoe === "phone" && transparentCamArea) {
			code += `\n  transparentCamArea`;
		}

		code += ">";

		if (showScreenDemo) {
			code += "\n  <YourScreenDemo />";
		}

		code += props.mdoe === "phone" ? `\n</AndroidMockup>` : `\n</AndroidTabMockup>`;
		return code;
	}, [
		props.mdoe,
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
		<div className={demoStyle.flexRowWrap}>
			<div
				className={demoStyle.flexBox}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				{props.mdoe === "phone" && (
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
				{props.mdoe === "tab" && (
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
				<div className={`${demoStyle.card} ${demoStyle.flexColWrap}`}>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<InputButton
							label="✨ screenWidth"
							inputType="number"
							defaultVal={DEFAULT_SCREEN_WIDTH.toString()}
							value={screenWidth.toString()}
							placeholder="screenWidth"
							style={{ marginRight: 30 }}
							onClickSubmit={inputVal => {
								setScreenWidth(Number(inputVal));
							}}
						/>
						<ButtonGroup
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
							style={{ marginRight: 30, marginTop: 4 }}
						/>
						<div className={demoStyle.flexAlignEnd}>
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
					</div>
					<div className={demoStyle.flexRowWrap}>
						<ColorButton
							label="isLandscape"
							isActive={isLandscape}
							showIcon
							style={{ marginRight: 16, marginTop: 16 }}
							onClick={() => setIsLandscape(prev => !prev)}
						/>
						<ColorButton
							label="noRoundedScreen"
							isActive={noRoundedScreen}
							showIcon
							style={{ marginRight: 16, marginTop: 16 }}
							onClick={() => setNoRoundedScreen(prev => !prev)}
						/>
						<ColorButton
							label="showScreenDemo"
							isActive={showScreenDemo}
							showIcon
							style={{ marginTop: 16 }}
							onClick={() => setShowScreenDemo(prev => !prev)}
						/>
					</div>
				</div>

				<h3 className={demoStyle.cardTitle}>Statusbar</h3>
				<div
					className={`${demoStyle.card} ${demoStyle.flexRowWrap}`}
					style={{ alignItems: "flex-end" }}>
					<div className={demoStyle.flexAlignEnd} style={{ marginRight: 30 }}>
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
						style={{ marginTop: 16 }}
						onClick={() => setHideStatusBar(prev => !prev)}
					/>
				</div>

				<h3 className={demoStyle.cardTitle}>Navigation Bar</h3>
				<div className={`${demoStyle.card} ${demoStyle.flexColWrap}`}>
					<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
						<div style={{ marginRight: 30 }}>
							<div className={demoStyle.subLabel}>navBar</div>
							<ButtonGroup
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
						</div>
						<div className={demoStyle.flexAlignEnd}>
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
							style={{ marginRight: 16, marginTop: 16 }}
							onClick={() => setTransparentNavBar(prev => !prev)}
						/>
						<ColorButton
							label="hideNavBar"
							isActive={hideNavBar}
							showIcon
							style={{ marginRight: 16, marginTop: 16 }}
							onClick={() => setHideNavBar(prev => !prev)}
						/>
						{props.mdoe === "phone" && (
							<div style={{ marginTop: 8 }}>
								<div className={demoStyle.subLabel} style={{ fontSize: 12 }}>
									⚠️ only works when
									<code style={{ color: "coral" }}> isLandscape=true</code>
								</div>
								<ColorButton
									label="transparentCamArea"
									isActive={transparentCamArea}
									showIcon
									onClick={() => setTransparentCamArea(prev => !prev)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* code */}
			<div
				className={`${demoStyle.card} ${demoStyle.flexBox}`}
				style={{ backgroundColor: "#1e1e1e" }}>
				<div className={demoStyle.flexRowWrap} style={{ alignItems: "center" }}>
					<ColorButton
						label={"📑 Copy "}
						isActive
						showIcon={false}
						onClick={async () => {
							await window.navigator.clipboard.writeText(samplecode);
							setIsCopied(true);
						}}
					/>
					{isCopied && (
						<code style={{ color: "lightgray", marginLeft: 16 }}>Copied!</code>
					)}
				</div>
				<Highlight className="react">{samplecode}</Highlight>
			</div>
		</div>
	);
}