import { Property } from "csstype";
import { CSSProperties, useMemo, useState } from "react";
import InputButton from "../components/InputButton";
import ColorkButton from "../components/ColorkButton";
import { AndroidMockup } from "../dist";
import demoStyle from "./demo.module.css";
import ScreenDemo from "./ScreenDemo";

export default function AndroidDemo() {
	const DEFAULT_SCREEN_WIDTH = 200;
	const [screenWidth, setScreenWidth] = useState(DEFAULT_SCREEN_WIDTH);
	const [noRoundedScreen, setNoRoundedScreen] = useState(false);
	const [isLandscape, setIsLandscape] = useState(false);
	const [hideStatusBar, setHideStatusBar] = useState(false);
	const [frameColor, setFrameColor] = useState<Property.Color>("#666666");
	const [statusbarColor, setStatusbarColor] = useState<Property.Color>("#CCCCCC");
	const [navBar, setNavBar] = useState<"swipe" | "bhr" | "rhb">("swipe");
	const [navBarcolor, setNavBarcolor] = useState<Property.Color>("#CCCCCC");
	const [transparentNavBar, setTransparentNavBar] = useState<boolean>(false);
	const [hideNavBar, setHideNavBar] = useState<boolean>(false);
	const [showScreenDemo, setShowScreenDemo] = useState<boolean>(false);

	const mockupContainerStyle = useMemo<CSSProperties>(() => {
		return {
			margin: 16,
		};
	}, []);

	const samplecode = useMemo(() => {
		return `<AndroidMockup
  screenWidth={${screenWidth}}${isLandscape ? `\n  isLandscape` : ""}
${noRoundedScreen ? `\n  noRoundedScreen` : ""}
  frameColor={frameColor}
  statusbarColor={statusbarColor}
  hideStatusBar={hideStatusBar}
  navBar={navBar}
  navBarcolor={navBarcolor}
  transparentNavBar={transparentNavBar}
  hideNavBar={hideNavBar}>
    <ScreenDemo screenWidth={screenWidth} isLandscape={isLandscape} />
</AndroidMockup>
`;
	}, [screenWidth, isLandscape, noRoundedScreen]);

	return (
		<div className={demoStyle.flexRowWrap}>
			<div className={demoStyle.controlPanel}>
				<div className={demoStyle.flexColWrap}>
					<h3 className={demoStyle.cardTitle}>Common</h3>
					<div className={`${demoStyle.card} ${demoStyle.flexColWrap}`}>
						<div className={demoStyle.flexRowWrap}>
							<InputButton
								label="✨ screenWidth"
								inputType="number"
								defaultVal={DEFAULT_SCREEN_WIDTH.toString()}
								placeholder="screenWidth"
								style={{ marginRight: 30 }}
								onClickSubmit={inputVal => {
									setScreenWidth(Number(inputVal));
								}}
							/>
							<div className={demoStyle.flexAlignEnd}>
								<InputButton
									label="frameColor"
									inputType="text"
									defaultVal={"#666666"}
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
						<div className={demoStyle.flexRowWrap} style={{ marginTop: 16 }}>
							<ColorkButton
								label="isLandscape"
								isActive={isLandscape}
								showIcon
								style={{ marginRight: 16 }}
								onClick={() => setIsLandscape(prev => !prev)}
							/>
							<ColorkButton
								label="noRoundedScreen"
								isActive={noRoundedScreen}
								showIcon
								style={{ marginRight: 16 }}
								onClick={() => setNoRoundedScreen(prev => !prev)}
							/>
							<ColorkButton
								label="showScreenDemo"
								isActive={showScreenDemo}
								showIcon
								onClick={() => setShowScreenDemo(prev => !prev)}
							/>
						</div>
					</div>
					<h3 className={demoStyle.cardTitle} style={{ marginTop: 16 }}>
						Statusbar
					</h3>
					<div
						className={`${demoStyle.card} ${demoStyle.flexRowWrap}`}
						style={{ alignItems: "flex-end" }}>
						<div className={demoStyle.flexAlignEnd} style={{ marginRight: 30 }}>
							<InputButton
								label="statusbarColor"
								inputType="text"
								defaultVal={"#CCCCCC"}
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
						<ColorkButton
							label="hideStatusBar"
							isActive={hideStatusBar}
							showIcon
							style={{ marginTop: 16 }}
							onClick={() => setHideStatusBar(prev => !prev)}
						/>
					</div>

					<h3 className={demoStyle.cardTitle} style={{ marginTop: 16 }}>
						Navigation Bar
					</h3>
					<div className={`${demoStyle.card} ${demoStyle.flexColWrap}`}>
						<div className={`${demoStyle.flexRowWrap} ${demoStyle.flexAlignEnd}`}>
							<div style={{ marginRight: 30 }}>
								<div className={demoStyle.subLabel}>navBar</div>
								<ColorkButton
									label="swipe"
									isActive={navBar === "swipe"}
									showIcon={false}
									style={{
										borderTopRightRadius: 0,
										borderBottomRightRadius: 0,
										width: 70,
									}}
									onClick={() => setNavBar("swipe")}
								/>
								<ColorkButton
									label="bhr"
									isActive={navBar === "bhr"}
									showIcon={false}
									style={{
										borderRadius: 0,
										width: 70,
										borderLeft: "0.5px solid darkgray",
										borderRight: "0.5px solid darkgray",
									}}
									onClick={() => setNavBar("bhr")}
								/>
								<ColorkButton
									label="rhb"
									isActive={navBar === "rhb"}
									showIcon={false}
									style={{
										borderTopLeftRadius: 0,
										borderBottomLeftRadius: 0,
										width: 70,
									}}
									onClick={() => setNavBar("rhb")}
								/>
							</div>
							<div className={demoStyle.flexAlignEnd}>
								<InputButton
									label="navBarcolor"
									inputType="text"
									defaultVal={"#CCCCCC"}
									placeholder="navBarcolor"
									onClickSubmit={inputVal => {
										setNavBarcolor(inputVal);
									}}
								/>
								<span
									style={{
										width: 20,
										height: 20,
										borderRadius: 20,
										backgroundColor: navBarcolor,
										marginBottom: 6,
										marginLeft: 8,
									}}></span>
							</div>
						</div>
						<div className={demoStyle.flexRowWrap} style={{ marginTop: 16 }}>
							<ColorkButton
								label="transparentNavBar"
								isActive={transparentNavBar}
								showIcon
								style={{ marginRight: 16 }}
								onClick={() => setTransparentNavBar(prev => !prev)}
							/>
							<ColorkButton
								label="hideNavBar"
								isActive={hideNavBar}
								showIcon
								onClick={() => setHideNavBar(prev => !prev)}
							/>
						</div>
					</div>
				</div>
			</div>
			<AndroidMockup
				screenWidth={screenWidth}
				isLandscape={isLandscape}
				containerStlye={mockupContainerStyle}
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
			</AndroidMockup>
			<pre>
				<code>{samplecode}</code>
			</pre>
		</div>
	);
}
