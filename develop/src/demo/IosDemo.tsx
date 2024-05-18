import { Property } from "csstype";
import { useCallback, useMemo, useState } from "react";
import InputButton from "../components/InputButton";
import ColorButton from "../components/ColorButton";
import { IPadMockup, IPhoneMockup } from "../dist";
import demoStyle from "./demo.module.css";
import ScreenDemo from "./ScreenDemo";
import ButtonGroup from "../components/ButtonGroup";
import CodeBlock from "./CodeBlock";

interface IIosDemoDemoProps {
	readonly mode: "phone" | "tab";
}
export default function IosDemo(props: IIosDemoDemoProps) {
	const DEFAULT_SCREEN_WIDTH = 200;
	const DEFAULT_FRAME_COLOR = "#666666";
	const DEFAULT_STATUS_BAR_COLOR = "#CCCCCC";

	const [screenWidth, setScreenWidth] = useState(DEFAULT_SCREEN_WIDTH);
	const [phoneScreenType, setPhoneScreenType] = useState<"legacy" | "notch" | "island">("island");
	const [padScreenType, setPadScreenType] = useState<"legacy" | "modern">("modern");
	const [isLandscape, setIsLandscape] = useState(false);
	const [hideStatusBar, setHideStatusBar] = useState(false);
	const [frameColor, setFrameColor] = useState<Property.Color>(DEFAULT_FRAME_COLOR);
	const [statusbarColor, setStatusbarColor] = useState<Property.Color>(DEFAULT_STATUS_BAR_COLOR);
	const [transparentNavBar, setTransparentNavBar] = useState<boolean>(false);
	const [hideNavBar, setHideNavBar] = useState<boolean>(false);

	const [showScreenDemo, setShowScreenDemo] = useState<boolean>(false);

	const resetAll = useCallback(() => {
		setScreenWidth(DEFAULT_SCREEN_WIDTH);
		setPhoneScreenType("island");
		setPadScreenType("modern");
		setIsLandscape(false);
		setHideStatusBar(false);
		setFrameColor(DEFAULT_FRAME_COLOR);
		setStatusbarColor(DEFAULT_STATUS_BAR_COLOR);
		setTransparentNavBar(false);
		setHideNavBar(false);
		setShowScreenDemo(false);
	}, []);

	const samplecode = useMemo(() => {
		let code = props.mode === "phone" ? "<IPhoneMockup" : "<IPadMockup";
		code += `\n  screenWidth={${screenWidth}}`;

		if (props.mode === "phone" && phoneScreenType !== "island") {
			code += `\n  screenType={"${phoneScreenType}"}`;
		}

		if (props.mode === "tab" && padScreenType !== "modern") {
			code += `\n  screenType={"${padScreenType}"}`;
		}

		if (isLandscape) {
			code += `\n  isLandscape`;
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

		if (transparentNavBar) {
			code += `\n  transparentNavBar`;
		}

		if (hideNavBar) {
			code += `\n  hideNavBar`;
		}

		code += ">";

		if (showScreenDemo) {
			code += "\n  <YourScreenDemo />";
		}

		code += props.mode === "phone" ? `\n</IPhoneMockup>` : `\n</IPadMockup>`;
		return code;
	}, [
		props.mode,
		screenWidth,
		phoneScreenType,
		padScreenType,
		isLandscape,
		frameColor,
		statusbarColor,
		hideStatusBar,
		transparentNavBar,
		hideNavBar,
		showScreenDemo,
	]);

	return (
		<div className={demoStyle.flexRowWrap}>
			<div
				className={demoStyle.flexBox}
				style={{
					display: "flex",
					// alignItems: "center",
					justifyContent: "center",
				}}>
				{props.mode === "phone" && (
					<IPhoneMockup
						screenWidth={screenWidth}
						screenType={phoneScreenType}
						isLandscape={isLandscape}
						frameColor={frameColor}
						statusbarColor={statusbarColor}
						hideStatusBar={hideStatusBar}
						transparentNavBar={transparentNavBar}
						hideNavBar={hideNavBar}>
						{showScreenDemo && (
							<ScreenDemo screenWidth={screenWidth} isLandscape={isLandscape} />
						)}
					</IPhoneMockup>
				)}
				{props.mode === "tab" && (
					<IPadMockup
						screenWidth={screenWidth}
						screenType={padScreenType}
						isLandscape={isLandscape}
						frameColor={frameColor}
						statusbarColor={statusbarColor}
						hideStatusBar={hideStatusBar}
						transparentNavBar={transparentNavBar}
						hideNavBar={hideNavBar}>
						{showScreenDemo && (
							<ScreenDemo screenWidth={screenWidth} isLandscape={isLandscape} />
						)}
					</IPadMockup>
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
							label="✨ screenWidth"
							inputType="number"
							defaultVal={DEFAULT_SCREEN_WIDTH.toString()}
							value={screenWidth.toString()}
							placeholder="screenWidth"
							className={demoStyle["mt8mr30"]}
							onClickSubmit={inputVal => {
								setScreenWidth(Number(inputVal));
							}}
						/>
						<ButtonGroup
							title="screenWidth Preset"
							className={demoStyle["mt8mr30"]}
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
						{props.mode === "phone" && (
							<ButtonGroup
								title="screenType"
								className={demoStyle["mt8mr30"]}
								buttonData={[
									{
										label: "island",
										isActive: phoneScreenType === "island",
										onClick: () => setPhoneScreenType("island"),
									},
									{
										label: "notch",
										isActive: phoneScreenType === "notch",
										onClick: () => setPhoneScreenType("notch"),
									},
									{
										label: "legacy",
										isActive: phoneScreenType === "legacy",
										onClick: () => setPhoneScreenType("legacy"),
									},
								]}
							/>
						)}
						{props.mode === "tab" && (
							<ButtonGroup
								title="screenType"
								className={demoStyle["mt8mr30"]}
								buttonData={[
									{
										label: "modern",
										isActive: padScreenType === "modern",
										onClick: () => setPadScreenType("modern"),
									},
									{
										label: "legacy",
										isActive: padScreenType === "legacy",
										onClick: () => setPadScreenType("legacy"),
									},
								]}
							/>
						)}
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
				{props.mode === "phone" && phoneScreenType === "legacy" && (
					<div
						className={demoStyle.subLabel}
						style={{ display: "initial", marginLeft: 16, marginTop: 4 }}>
						⚠️ When <code className={demoStyle.code}> isLandscape=true </code> and
						<code className={demoStyle.code}> screenType="legacy"</code>, status bar is
						always hidden regardless of
						<code className={demoStyle.code}> hideStatusBar</code>.
					</div>
				)}

				<h3 className={demoStyle.cardTitle}>Navigation Bar</h3>
				<div className={demoStyle.card + " " + demoStyle.flexRowWrap}>
					<ColorButton
						label="transparentNavBar"
						isActive={transparentNavBar}
						showIcon
						style={{ marginRight: 16 }}
						onClick={() => setTransparentNavBar(prev => !prev)}
					/>
					<ColorButton
						label="hideNavBar"
						isActive={hideNavBar}
						showIcon
						style={{ marginRight: 16 }}
						onClick={() => setHideNavBar(prev => !prev)}
					/>
				</div>
				{(phoneScreenType === "legacy" || padScreenType === "legacy") && (
					<div
						className={demoStyle.subLabel}
						style={{ display: "initial", marginLeft: 16, marginTop: 4 }}>
						⚠️ When <code className={demoStyle.code}> screenType="legacy"</code>,
						<code className={demoStyle.code}> transparentNavBar</code> and
						<code className={demoStyle.code}> hideNavBar</code> are always ignored
					</div>
				)}
				{/* code */}
				<CodeBlock title="Code" sampleCode={samplecode} />
			</div>
		</div>
	);
}
