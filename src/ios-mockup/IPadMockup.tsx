import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../shared-types/variants-interface";

interface IiPadMockupProps {
	readonly screenWidth: number;
	/** default: "modern" */
	readonly screenType?: "legacy" | "modern";
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

export type IPadMockupProps = PropsWithChildren<IiPadMockupProps>;
export default function IPadMockup(props: IPadMockupProps) {
	const {
		screenWidth,
		screenType = "modern",
		isLandscape = false,
		frameColor = "#666666",
		frameOnly = false,
		statusbarColor = "#CCCCCC",
		hideStatusBar = false,
		transparentNavBar = false,
		hideNavBar = false,
	} = props;

	const Mockup = useMemo(() => {
		switch (screenType) {
			case "legacy":
				// 무시
				// hideNavigationBar,
				// transparentNavigationBar,
				if (isLandscape) {
					// eslint-disable-next-line no-use-before-define
					return IPadLegacyLandscape;
				}
				// eslint-disable-next-line no-use-before-define
				return IPadLegacyPortrait;
			case "modern":
			default:
				if (isLandscape) {
					// eslint-disable-next-line no-use-before-define
					return IPadModernLandscape;
				}
				// eslint-disable-next-line no-use-before-define
				return IPadModernPortrait;
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
	readonly isLandscape: boolean;
	readonly getSizeWithRatio: (size: number) => number;
	readonly screenWidth: number;
	readonly mHeight: number;
	readonly frameColor: Property.Color;
	readonly statusbarColor: Property.Color;
	readonly frameOnly: boolean;
}
const getStyles = (param: IStyleParam) => {
	const {
		isLandscape,
		getSizeWithRatio,
		screenWidth,
		mHeight,
		frameColor,
		statusbarColor,
		frameOnly,
	} = param;

	const FRAME_WIDTH = getSizeWithRatio(35);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const bezelRadius = getSizeWithRatio(50);

	const frameButtonSize = Math.floor(FRAME_WIDTH * 0.65);
	const frameButtonPosition =
		(isLandscape ? mHeight : screenWidth) +
		FRAME_WIDTH +
		HALF_FRAME_WIDTH +
		frameButtonSize -
		HALF_FRAME_WIDTH;

	let pRight; // for Portrait
	let pLeft; // for Landscape
	let pTop; // both
	if (frameOnly) {
		pRight = 0;
		pLeft = 0;
		pTop = 0;
	} else {
		pTop = frameButtonSize - HALF_FRAME_WIDTH;
		pRight = isLandscape ? 0 : frameButtonSize - HALF_FRAME_WIDTH;
		pLeft = isLandscape ? frameButtonSize - HALF_FRAME_WIDTH : 0;
	}

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: "column",
			boxSizing: "content-box",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingTop: pTop,
			paddingRight: pRight,
			paddingLeft: pLeft,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			backgroundColor: frameColor,
			borderRadius: bezelRadius,
			borderStyle: "solid",
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			overflow: "hidden",
		},
		screen: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		notchContainer: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: getSizeWithRatio(24),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
		swipeContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			boxSizing: "border-box",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(20),
			paddingTop: getSizeWithRatio(4),
			alignItems: "center",
			justifyContent: "center",
			pointerEvents: "none",
		},
		swipeContainer: {
			display: "flex",
			flexDirection: "column",
			boxSizing: "border-box",
			width: "100%",
			height: getSizeWithRatio(20),
			backgroundColor: statusbarColor,
			paddingTop: getSizeWithRatio(4),
			alignItems: "center",
			justifyContent: "center",
		},
		swipeBar: {
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(100),
			width: isLandscape ? "25%" : "30%",
			height: getSizeWithRatio(8),
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? undefined : getSizeWithRatio(75),
			left: isLandscape ? getSizeWithRatio(75) : frameButtonPosition,
			bottom: isLandscape ? frameButtonPosition : undefined,
			width: isLandscape ? getSizeWithRatio(50) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(50),
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? undefined : getSizeWithRatio(130),
			left: isLandscape ? getSizeWithRatio(130) : frameButtonPosition,
			bottom: isLandscape ? frameButtonPosition : undefined,
			width: isLandscape ? getSizeWithRatio(50) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(50),
			backgroundColor: frameColor,
		},
		power: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			bottom: isLandscape
				? mHeight - FRAME_WIDTH - HALF_FRAME_WIDTH
				: mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonSize - HALF_FRAME_WIDTH,
			left: isLandscape ? undefined : screenWidth - FRAME_WIDTH - HALF_FRAME_WIDTH,
			right: isLandscape
				? screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonSize - HALF_FRAME_WIDTH
				: undefined,
			width: isLandscape ? frameButtonSize : getSizeWithRatio(60),
			height: isLandscape ? getSizeWithRatio(60) : frameButtonSize,
			backgroundColor: frameColor,
		},
	});
};

function IPadModernPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
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
			const sizeRatio = Math.floor((screenWidth * size) / 834);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 3) * 4);

		return getStyles({
			isLandscape: false,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			statusbarColor,
			frameOnly,
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && <div style={styles.notchContainer} />}
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
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			{!frameOnly && (
				<>
					<div style={styles.volumeUp} />
					<div style={styles.volumeDown} />
					<div style={styles.power} />
				</>
			)}
		</div>
	);
}

function IPadModernLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
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
			const sizeRatio = Math.floor((screenWidth * size) / 1194);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 4) * 3);

		return getStyles({
			isLandscape: true,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			statusbarColor,
			frameOnly,
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && <div style={styles.notchContainer} />}
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
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			{!frameOnly && (
				<>
					<div style={styles.volumeUp} />
					<div style={styles.volumeDown} />
					<div style={styles.power} />
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
	const { isLandscape, getSizeWithRatio, screenWidth, mHeight, frameColor, statusbarColor } =
		param;

	const FRAME_WIDTH = getSizeWithRatio(35);

	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const upperBezelSize = getSizeWithRatio(90);
	const lowerBezelSize = getSizeWithRatio(90);

	const bezelRadius = getSizeWithRatio(40);

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: isLandscape ? "row" : "column",
			boxSizing: "content-box",
			position: "relative",
			width: isLandscape ? screenWidth + upperBezelSize + lowerBezelSize : widthAndFrame,
			height: isLandscape ? heightAndFrame : mHeight + upperBezelSize + lowerBezelSize,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			alignItems: isLandscape ? "flex-start" : "center",
			justifyContent: isLandscape ? "center" : "flex-start",
			position: "relative",
			boxSizing: "border-box",
			backgroundColor: frameColor,
			width: isLandscape ? screenWidth : widthAndFrame,
			height: isLandscape ? heightAndFrame : mHeight,
			overflow: "hidden",
		},
		upperBezel: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			borderTopLeftRadius: bezelRadius,
			borderTopRightRadius: isLandscape ? 0 : bezelRadius,
			borderBottomLeftRadius: isLandscape ? bezelRadius : 0,
			width: isLandscape ? upperBezelSize : widthAndFrame,
			height: isLandscape ? heightAndFrame : upperBezelSize,
			backgroundColor: frameColor,
			justifyContent: "center",
		},
		camSpeakerCont: {
			display: "flex",
			flexDirection: isLandscape ? "row" : "column",
			position: "relative",
			width: "100%",
			height: "100%",
			alignItems: "center",
			justifyContent: "center",
		},
		camera: {
			width: getSizeWithRatio(20),
			height: getSizeWithRatio(20),
			borderRadius: getSizeWithRatio(20),
			backgroundColor: statusbarColor,
		},
		lowerBezel: {
			display: "flex",
			flexDirection: isLandscape ? "row" : "column",
			borderBottomLeftRadius: isLandscape ? 0 : bezelRadius,
			borderBottomRightRadius: bezelRadius,
			borderTopRightRadius: isLandscape ? bezelRadius : 0,
			width: isLandscape ? lowerBezelSize : widthAndFrame,
			height: isLandscape ? heightAndFrame : lowerBezelSize,
			backgroundColor: frameColor,
			alignItems: "center",
			justifyContent: "center",
		},
		homeButoon: {
			width: getSizeWithRatio(55),
			height: getSizeWithRatio(55),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(55),
		},
		screen: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		statusbar: {
			width: "100%",
			height: getSizeWithRatio(20),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
	});
};

function IPadLegacyPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, frameOnly, statusbarColor, hideStatusBar } = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 810);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 3) * 4);

		return getLegacyStyles({
			isLandscape: false,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			statusbarColor,
			frameOnly,
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			<div style={styles.upperBezel}>
				<div style={styles.camSpeakerCont}>
					<div style={styles.camera} />
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
		</div>
	);
}

function IPadLegacyLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, frameOnly, statusbarColor, hideStatusBar } = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 1080);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 4) * 3);

		return getLegacyStyles({
			isLandscape: true,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			frameColor,
			statusbarColor,
			frameOnly,
		});
	}, [screenWidth, frameColor, statusbarColor, frameOnly]);

	return (
		<div style={styles.container}>
			<div style={styles.upperBezel}>
				<div style={styles.camSpeakerCont}>
					<div style={styles.camera} />
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
		</div>
	);
}
