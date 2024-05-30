import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../shared-types/variants-interface";
import IPhoneLegacyLandscape from "./variants/phone/IPhoneLegacyLandscape";

interface IiPhoneMockupProps {
	readonly screenWidth: number;
	/** default: "island" */
	readonly screenType?: "legacy" | "notch" | "island";
	/** default: false */
	readonly isLandscape?: boolean;
	readonly containerStlye?: CSSProperties;
	/** default: "#666666" */
	readonly frameColor?: Property.Color;
	/** default: false */
	readonly frameOnly?: boolean;
	/** default: "#CCCCCC" */
	readonly statusbarColor?: Property.Color;
	/** default: false */
	readonly hideStatusBar?: boolean;
	/** default: false */
	readonly transparentNavBar?: boolean;
	/** default: false */
	readonly hideNavBar?: boolean;
}

export type IPhoneMockupProps = PropsWithChildren<IiPhoneMockupProps>;
export default function IPhoneMockup(props: IPhoneMockupProps) {
	const {
		screenWidth,
		screenType = "island",
		isLandscape = false,
		frameColor = "#666666",
		frameOnly = false,
		statusbarColor = "#CCCCCC",
		hideStatusBar = false,
		transparentNavBar = false,
		hideNavBar = false,
	} = props;
	// const screenType = useMemo(
	// 	() => (props.screenType === undefined ? "island" : props.screenType),
	// 	[props.screenType],
	// );

	// const isLandscape = useMemo(
	// 	() => (props.isLandscape === undefined ? false : props.isLandscape),
	// 	[props.isLandscape],
	// );

	// const frameColor = useMemo(
	// 	() => (props.frameColor === undefined ? "#666666" : props.frameColor),
	// 	[props.frameColor],
	// );

	// const frameOnly = useMemo(
	// 	() => (props.frameOnly === undefined ? false : props.frameOnly),
	// 	[props.frameOnly],
	// );

	// const statusbarColor = useMemo(
	// 	() => (props.statusbarColor === undefined ? "#CCCCCC" : props.statusbarColor),
	// 	[props.statusbarColor],
	// );

	// const hideStatusBar = useMemo(
	// 	() => (props.hideStatusBar === undefined ? false : props.hideStatusBar),
	// 	[props.hideStatusBar],
	// );

	// const transparentNavigationBar = useMemo(
	// 	() => (props.transparentNavBar === undefined ? false : props.transparentNavBar),
	// 	[props.transparentNavBar],
	// );

	// const hideNavigationBar = useMemo(
	// 	() => (props.hideNavBar === undefined ? false : props.hideNavBar),
	// 	[props.hideNavBar],
	// );

	const Mockup = useMemo(() => {
		switch (screenType) {
			case "legacy":
				// 무시
				// hideNavigationBar,
				// transparentNavigationBar,
				if (isLandscape) {
					// hideStatusBar 무시
					return IPhoneLegacyLandscape;
				}
				// eslint-disable-next-line no-use-before-define
				return IPhoneLegacyPortrait;

			case "notch":
				if (isLandscape) {
					// eslint-disable-next-line no-use-before-define
					return IPhoneNotchLandscape;
				}
				// eslint-disable-next-line no-use-before-define
				return IPhoneNotchPortrait;
			case "island":
			default:
				if (isLandscape) {
					// eslint-disable-next-line no-use-before-define
					return IPhoneIslandLandscape;
				}
				// eslint-disable-next-line no-use-before-define
				return IPhoneIslandPortrait;
		}
	}, [isLandscape, screenType]);

	return (
		<div style={props.containerStlye}>
			<Mockup
				screenWidth={screenWidth}
				frameColor={frameColor}
				frameOnly={frameOnly}
				statusbarColor={statusbarColor}
				hideStatusBar={hideStatusBar}
				transparentNavigationBar={transparentNavBar}
				hideNavigationBar={hideNavBar}>
				{props.children}
			</Mockup>
		</div>
	);
}

interface IStyleParam {
	readonly screenType: "legacy" | "notch" | "island";
	readonly isLandscape: boolean;
	readonly getSizeWithRatio: (size: number) => number;
	readonly screenWidth: number;
	readonly mHeight: number;
	readonly frameColor: Property.Color;
	readonly frameWidth: number;
	readonly statusbarColor: Property.Color;
	readonly frameOnly: boolean;
	readonly bezelRadius: number;
}
const getStyles = (param: IStyleParam) => {
	const {
		screenType,
		isLandscape,
		getSizeWithRatio,
		screenWidth,
		mHeight,
		frameColor,
		frameWidth,
		statusbarColor,
		frameOnly,
		bezelRadius,
	} = param;

	const FRAME_WIDTH = frameWidth;
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const frameButtonSize = Math.floor(FRAME_WIDTH * (isLandscape ? 0.9 : 0.9));
	const frameButtonPosition =
		(isLandscape ? mHeight : screenWidth) +
		FRAME_WIDTH +
		HALF_FRAME_WIDTH +
		frameButtonSize -
		HALF_FRAME_WIDTH;

	let pRight; // for Portrait
	let pLeft; // for Portrait
	let pTop; // for Landscape
	let pBottom; // for Landscape
	if (frameOnly) {
		pRight = 0;
		pLeft = 0;
		pTop = 0;
		pBottom = 0;
	} else {
		pRight = isLandscape ? 0 : frameButtonSize - HALF_FRAME_WIDTH;
		pLeft = isLandscape ? 0 : frameButtonSize - HALF_FRAME_WIDTH;
		pTop = isLandscape ? frameButtonSize - HALF_FRAME_WIDTH : 0;
		pBottom = isLandscape ? frameButtonSize - HALF_FRAME_WIDTH : 0;
	}

	let topInset: number;
	let leftInset: number;
	let rightInset: number;
	let bottomInset: number;
	let powerPosition: number;
	switch (screenType) {
		case "notch":
			topInset = isLandscape ? 0 : getSizeWithRatio(44);
			leftInset = isLandscape ? getSizeWithRatio(44) : 0;
			rightInset = isLandscape ? getSizeWithRatio(44) : 0;
			bottomInset = isLandscape ? getSizeWithRatio(21) : getSizeWithRatio(34);
			powerPosition = getSizeWithRatio(250);
			break;
		case "legacy":
			topInset = isLandscape ? 0 : getSizeWithRatio(20);
			leftInset = 0;
			rightInset = 0;
			bottomInset = 0;
			// TODO:
			powerPosition = getSizeWithRatio(280);
			break;
		case "island":
		default:
			topInset = isLandscape ? 0 : getSizeWithRatio(59);
			leftInset = isLandscape ? getSizeWithRatio(59) : 0;
			rightInset = isLandscape ? getSizeWithRatio(59) : 0;
			bottomInset = isLandscape ? getSizeWithRatio(21) : getSizeWithRatio(34);
			powerPosition = getSizeWithRatio(280);
			break;
	}

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: isLandscape ? "row" : "column",
			boxSizing: "content-box",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingRight: pRight,
			paddingLeft: pLeft,
			paddingTop: pTop,
			paddingBottom: pBottom,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			boxSizing: "border-box",
			backgroundColor: frameColor,
			borderRadius: bezelRadius,
			borderStyle: "solid",
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			overflow: "hidden",
		},
		screen: {
			display: "flex",
			flexDirection: isLandscape ? "row" : "column",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		notchContainer: {
			display: "flex",
			flexDirection: "column",
			width: isLandscape ? leftInset : "100%",
			height: isLandscape ? "100%" : topInset,
			backgroundColor: statusbarColor,
			alignItems: isLandscape ? "flex-start" : "center",
			justifyContent: isLandscape ? "center" : "flex-start",
		},
		notchContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			width: isLandscape ? leftInset : "100%",
			height: isLandscape ? "100%" : topInset,
			alignItems: isLandscape ? "flex-start" : "center",
			justifyContent: isLandscape ? "center" : "flex-start",
			pointerEvents: "none",
		},
		// landscape only
		safeAreaRight: {
			width: rightInset,
			height: "100%",
			backgroundColor: statusbarColor,
		},
		island: {
			width: isLandscape ? getSizeWithRatio(35) : getSizeWithRatio(128),
			height: isLandscape ? getSizeWithRatio(128) : getSizeWithRatio(35),
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(50),
			marginTop: isLandscape ? undefined : getSizeWithRatio(13),
			marginLeft: isLandscape ? getSizeWithRatio(13) : undefined,
		},
		notch: {
			width: isLandscape ? getSizeWithRatio(31) : getSizeWithRatio(160),
			height: isLandscape ? getSizeWithRatio(160) : getSizeWithRatio(31),
			backgroundColor: frameColor,
			borderBottomLeftRadius: isLandscape ? 0 : getSizeWithRatio(20),
			borderBottomRightRadius: getSizeWithRatio(20),
			borderTopRightRadius: isLandscape ? getSizeWithRatio(20) : 0,
		},
		swipeContainer: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: bottomInset,
			backgroundColor: statusbarColor,
			alignItems: "center",
			justifyContent: "flex-end",
		},
		swipeContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: bottomInset,
			alignItems: "center",
			justifyContent: "flex-end",
			pointerEvents: "none",
		},
		swipeBar: {
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(100),
			width: isLandscape ? getSizeWithRatio(230) : "35%",
			height: getSizeWithRatio(7),
			marginBottom: isLandscape ? getSizeWithRatio(5) : getSizeWithRatio(10),
		},
		silenceSwitch: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? frameButtonPosition : getSizeWithRatio(165),
			left: isLandscape ? getSizeWithRatio(165) : undefined,
			right: isLandscape ? undefined : frameButtonPosition,
			width: isLandscape ? getSizeWithRatio(34) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(34),
			backgroundColor: frameColor,
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? frameButtonPosition : getSizeWithRatio(230),
			left: isLandscape ? getSizeWithRatio(230) : undefined,
			right: isLandscape ? undefined : frameButtonPosition,
			width: isLandscape ? getSizeWithRatio(65) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(65),
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? frameButtonPosition : getSizeWithRatio(315),
			left: isLandscape ? getSizeWithRatio(315) : undefined,
			right: isLandscape ? undefined : frameButtonPosition,
			width: isLandscape ? getSizeWithRatio(65) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(65),
			backgroundColor: frameColor,
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? undefined : powerPosition,
			left: isLandscape ? powerPosition : frameButtonPosition,
			bottom: isLandscape ? frameButtonPosition : undefined,
			width: isLandscape ? getSizeWithRatio(105) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(105),
			backgroundColor: frameColor,
		},
		notchPad: {
			alignSelf: "center",
			position: "absolute",
			top: isLandscape ? undefined : HALF_FRAME_WIDTH,
			left: isLandscape ? HALF_FRAME_WIDTH : undefined,
			width: isLandscape ? getSizeWithRatio(20) : getSizeWithRatio(160),
			height: isLandscape ? getSizeWithRatio(160) : getSizeWithRatio(20),
			backgroundColor: frameColor,
		},
	});
};

function IPhoneIslandPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		screenWidth,
		frameColor,
		frameOnly,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 390);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 9) * 19.5);

		return getStyles({
			screenType: "island",
			isLandscape: false,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			frameWidth: getSizeWithRatio(10),
			frameOnly,
			statusbarColor,
			bezelRadius: getSizeWithRatio(68),
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && (
						<div style={styles.notchContainer}>
							<div style={styles.island} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
						{props.children}
					</div>
					{hideNavigationBar === false && transparentNavigationBar === false && (
						<div style={styles.swipeContainer}>
							<div style={styles.swipeBar} />
						</div>
					)}
				</div>
				{hideStatusBar && (
					<div style={styles.notchContainerFullScreen}>
						<div style={styles.island} />
					</div>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			{!frameOnly && (
				<>
					<div style={styles.silenceSwitch} />
					<div style={styles.volumeUp} />
					<div style={styles.volumeDown} />
					<div style={styles.powerPortrait} />
				</>
			)}
		</div>
	);
}

function IPhoneIslandLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		screenWidth,
		frameColor,
		frameOnly,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 844);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 19.5) * 9);

		return getStyles({
			screenType: "island",
			isLandscape: true,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			frameWidth: getSizeWithRatio(10),
			frameOnly,
			statusbarColor,
			bezelRadius: getSizeWithRatio(68),
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && (
						<div style={styles.notchContainer}>
							<div style={styles.island} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
						<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
							{props.children}
						</div>
						{hideNavigationBar === false && transparentNavigationBar === false && (
							<div style={styles.swipeContainer}>
								<div style={styles.swipeBar} />
							</div>
						)}
					</div>
					{hideStatusBar === false && <div style={styles.safeAreaRight} />}
				</div>
				{hideStatusBar && (
					<div style={styles.notchContainerFullScreen}>
						<div style={styles.island} />
					</div>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			{!frameOnly && (
				<>
					<div style={styles.silenceSwitch} />
					<div style={styles.volumeUp} />
					<div style={styles.volumeDown} />
					<div style={styles.powerPortrait} />
				</>
			)}
		</div>
	);
}

function IPhoneNotchPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		screenWidth,
		frameColor,
		frameOnly,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 390);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 9) * 19.5);

		return getStyles({
			screenType: "notch",
			isLandscape: false,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			frameWidth: getSizeWithRatio(14),
			frameOnly,
			statusbarColor,
			bezelRadius: getSizeWithRatio(64),
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && (
						<div style={styles.notchContainer}>
							<div style={styles.notch} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
						{props.children}
					</div>
					{hideNavigationBar === false && transparentNavigationBar === false && (
						<div style={styles.swipeContainer}>
							<div style={styles.swipeBar} />
						</div>
					)}
				</div>
				{hideStatusBar && (
					<div style={styles.notchContainerFullScreen}>
						<div style={styles.notch} />
					</div>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			<div style={styles.notchPad} />
			{!frameOnly && (
				<>
					<div style={styles.silenceSwitch} />
					<div style={styles.volumeUp} />
					<div style={styles.volumeDown} />
					<div style={styles.powerPortrait} />
				</>
			)}
		</div>
	);
}

function IPhoneNotchLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		screenWidth,
		frameColor,
		frameOnly,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 844);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 19.5) * 9);

		return getStyles({
			screenType: "notch",
			isLandscape: true,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			frameWidth: getSizeWithRatio(14),
			frameOnly,
			statusbarColor,
			bezelRadius: getSizeWithRatio(64),
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && (
						<div style={styles.notchContainer}>
							<div style={styles.notch} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
						<div
							style={{
								display: "flex",
								flex: 1,
								flexDirection: "column",
								overflow: "hidden",
							}}>
							{props.children}
						</div>
						{hideNavigationBar === false && transparentNavigationBar === false && (
							<div style={styles.swipeContainer}>
								<div style={styles.swipeBar} />
							</div>
						)}
					</div>
					{hideStatusBar === false && <div style={styles.safeAreaRight} />}
				</div>
				{hideStatusBar && (
					<div style={styles.notchContainerFullScreen}>
						<div style={styles.notch} />
					</div>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			<div style={styles.notchPad} />
			{!frameOnly && (
				<>
					<div style={styles.silenceSwitch} />
					<div style={styles.volumeUp} />
					<div style={styles.volumeDown} />
					<div style={styles.powerPortrait} />
				</>
			)}
		</div>
	);
}

interface ILegacyStyleParam {
	readonly isLandscape: boolean;
	readonly getSizeWithRatio: (size: number) => number;
	readonly screenWidth: number;
	readonly mHeight: number;
	readonly frameColor: Property.Color;
	readonly statusbarColor: Property.Color;
	readonly frameOnly: boolean;
}
const getLegacyStyles = (param: ILegacyStyleParam) => {
	const {
		isLandscape,
		getSizeWithRatio,
		screenWidth,
		mHeight,
		frameColor,
		statusbarColor,
		frameOnly,
	} = param;

	const FRAME_WIDTH = getSizeWithRatio(22);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;

	const upperBezelHeight = getSizeWithRatio(110);
	const lowerBezelHeight = getSizeWithRatio(110);

	const frameButtonWidth = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition =
		screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonWidth - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: "column",
			boxSizing: "content-box",
			position: "relative",
			width: widthAndFrame,
			height: mHeight + upperBezelHeight + lowerBezelHeight,
			paddingRight: frameButtonWidth - HALF_FRAME_WIDTH,
			paddingLeft: frameButtonWidth - HALF_FRAME_WIDTH,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			position: "relative",
			boxSizing: "border-box",
			backgroundColor: frameColor,
			width: widthAndFrame,
			height: mHeight,
			overflow: "hidden",
		},
		upperBezel: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			borderTopLeftRadius: getSizeWithRatio(60),
			borderTopRightRadius: getSizeWithRatio(60),
			width: widthAndFrame,
			height: upperBezelHeight,
			backgroundColor: frameColor,
			justifyContent: "center",
		},
		camSpeakerCont: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: "100%",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
		},
		camera: {
			position: "absolute",
			left: -getSizeWithRatio(38),
			width: getSizeWithRatio(10),
			height: getSizeWithRatio(10),
			borderRadius: getSizeWithRatio(10),
			backgroundColor: statusbarColor,
		},
		speaker: {
			position: "relative",
			width: getSizeWithRatio(80),
			height: getSizeWithRatio(8),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(10),
		},
		lowerBezel: {
			display: "flex",
			flexDirection: "column",
			borderBottomLeftRadius: getSizeWithRatio(60),
			borderBottomRightRadius: getSizeWithRatio(60),
			width: widthAndFrame,
			height: lowerBezelHeight,
			backgroundColor: frameColor,
			alignItems: "center",
			justifyContent: "center",
		},
		homeButoon: {
			width: getSizeWithRatio(65),
			height: getSizeWithRatio(65),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(65),
		},
		screen: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
		},
		statusbar: {
			width: "100%",
			height: getSizeWithRatio(20),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
		silenceSwitch: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(115),
			right: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(36),
			backgroundColor: frameColor,
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(185),
			right: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(70),
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(270),
			right: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(70),
			backgroundColor: frameColor,
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(190),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(64),
			backgroundColor: frameColor,
		},
	});
};

function IPhoneLegacyPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, statusbarColor, hideStatusBar } = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 375);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 9) * 16);

		return getLegacyStyles({
			isLandscape: false,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			statusbarColor,
			frameOnly: false,
		});
	}, [screenWidth, frameColor, statusbarColor]);

	return (
		<div style={styles.container}>
			<div style={styles.upperBezel}>
				<div style={styles.camSpeakerCont}>
					<div style={styles.speaker}>
						<div style={styles.camera} />
					</div>
				</div>
			</div>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && <div style={styles.statusbar} />}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
						{props.children}
					</div>
				</div>
			</div>
			<div style={styles.lowerBezel}>
				<div style={styles.homeButoon} />
			</div>

			<div style={styles.silenceSwitch} />
			<div style={styles.volumeUp} />
			<div style={styles.volumeDown} />
			<div style={styles.powerPortrait} />
		</div>
	);
}
