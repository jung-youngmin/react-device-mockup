import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useMemo } from "react";
import { IAndroidMockupVariantProps, StyleSheet } from "../shared-types/variants-interface";

interface IAndroidTabMockupProps {
	readonly screenWidth: number;
	/** default: false */
	readonly noRoundedScreen?: boolean;
	/** default: false */
	readonly isLandscape?: boolean;
	/** default: true */
	readonly containerStlye?: CSSProperties;
	/** default: "#666666" */
	readonly frameColor?: Property.Color;
	/** default: false */
	readonly frameOnly?: boolean;
	/** default: "#CCCCCC" */
	readonly statusbarColor?: Property.Color;
	/** default: false */
	readonly hideStatusBar?: boolean;
	/** default: "swipe" */
	readonly navBar?: "swipe" | "bhr" | "rhb";
	/** default: "#CCCCCC" */
	readonly navBarColor?: Property.Color;
	/** default: false */
	readonly transparentNavBar?: boolean;
	/** default: false */
	readonly hideNavBar?: boolean;
}

export type AndroidTabMockupProps = PropsWithChildren<IAndroidTabMockupProps>;
export default function AndroidTabMockup(props: AndroidTabMockupProps) {
	const {
		screenWidth,
		noRoundedScreen = false,
		isLandscape = false,
		frameColor = "#666666",
		frameOnly = false,
		statusbarColor = "#CCCCCC",
		hideStatusBar = false,
		navBar = "swipe",
		navBarColor = "#CCCCCC",
		transparentNavBar = false,
		hideNavBar = false,
	} = props;

	return (
		<div style={props.containerStlye}>
			{isLandscape ? (
				// eslint-disable-next-line no-use-before-define
				<AndroidTabLandscape
					screenWidth={screenWidth}
					screenRounded={!noRoundedScreen}
					frameColor={frameColor}
					frameOnly={frameOnly}
					statusbarColor={statusbarColor}
					navigationBar={navBar}
					navigationBarColor={navBarColor}
					hideStatusBar={hideStatusBar}
					transparentNavigationBar={transparentNavBar}
					hideNavigationBar={hideNavBar}>
					{props.children}
				</AndroidTabLandscape>
			) : (
				// eslint-disable-next-line no-use-before-define
				<AndroidTabPortrait
					screenWidth={screenWidth}
					screenRounded={!noRoundedScreen}
					frameColor={frameColor}
					frameOnly={frameOnly}
					statusbarColor={statusbarColor}
					navigationBar={navBar}
					navigationBarColor={navBarColor}
					hideStatusBar={hideStatusBar}
					transparentNavigationBar={transparentNavBar}
					hideNavigationBar={hideNavBar}>
					{props.children}
				</AndroidTabPortrait>
			)}
		</div>
	);
}

const getStyles = (
	isLandscape: boolean,
	getSizeWithRatio: (size: number) => number,
	screenWidth: number,
	mHeight: number,
	screenRounded: boolean,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
	navigationBarColor: Property.Color,
	frameOnly: boolean,
) => {
	const FRAME_WIDTH = getSizeWithRatio(100);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const frameButtonSize = Math.floor(FRAME_WIDTH * 0.7);
	const frameButtonPosition =
		(isLandscape ? mHeight : screenWidth) + FRAME_WIDTH + HALF_FRAME_WIDTH;

	const subItemSize = getSizeWithRatio(45);

	let contPaddingRight: number; // for Portrait
	let contPaddingTop: number; // for Landscape
	if (frameOnly) {
		contPaddingRight = 0;
		contPaddingTop = 0;
	} else if (isLandscape) {
		contPaddingRight = 0;
		contPaddingTop = frameButtonSize - HALF_FRAME_WIDTH + 1;
	} else {
		contPaddingRight = frameButtonSize - HALF_FRAME_WIDTH + 1;
		contPaddingTop = 0;
	}

	return StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			boxSizing: "content-box",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingTop: contPaddingTop,
			paddingRight: contPaddingRight,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			position: "relative", // landscape에만 있었음
			backgroundColor: frameColor,
			borderRadius: screenRounded ? getSizeWithRatio(140) : getSizeWithRatio(30),
			borderStyle: "solid",
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			overflow: "hidden",
		},
		screenCont: {
			display: "flex",
			flex: 1,
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
		statusbar: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: getSizeWithRatio(50),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
		navigationSwipe: {
			display: "flex",
			width: "100%",
			height: getSizeWithRatio(60),
			backgroundColor: navigationBarColor,
			alignItems: "center",
			justifyContent: "center",
		},
		navigationSwipeTransparent: {
			display: "flex",
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(60),
			alignItems: "center",
			justifyContent: "center",
			pointerEvents: "none",
		},
		navigationSwipeBar: {
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(100),
			width: getSizeWithRatio(350),
			height: getSizeWithRatio(15),
		},
		navigationBhrCont: {
			display: "flex",
			position: "relative",
			boxSizing: "border-box",
			width: "100%",
			height: getSizeWithRatio(80),
			backgroundColor: navigationBarColor,
			paddingLeft: isLandscape ? (screenWidth / 3) * 2 : screenWidth / 2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		navigationBhrTransparent: {
			position: "absolute",
			boxSizing: "border-box",
			display: "flex",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(80),
			paddingLeft: isLandscape ? (screenWidth / 3) * 2 : screenWidth / 2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
			pointerEvents: "none",
		},
		power: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? undefined : getSizeWithRatio(300),
			left: isLandscape ? getSizeWithRatio(300) : frameButtonPosition,
			bottom: isLandscape ? frameButtonPosition : undefined,
			width: isLandscape ? getSizeWithRatio(180) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(180),
			backgroundColor: frameColor,
		},
		volume: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: isLandscape ? undefined : getSizeWithRatio(600),
			left: isLandscape ? getSizeWithRatio(600) : frameButtonPosition,
			bottom: isLandscape ? frameButtonPosition : undefined,
			width: isLandscape ? getSizeWithRatio(330) : frameButtonSize,
			height: isLandscape ? frameButtonSize : getSizeWithRatio(330),
			backgroundColor: frameColor,
		},
		triangle: {
			width: 0,
			height: 0,
			borderTopWidth: subItemSize / 2,
			borderTopStyle: "solid",
			borderTopColor: "transparent",
			borderBottomWidth: subItemSize / 2,
			borderBottomStyle: "solid",
			borderBottomColor: "transparent",
			borderRightWidth: subItemSize,
			borderRightStyle: "solid",
			borderRightColor: frameColor,
			opacity: 0.6,
		},
		circle: {
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize,
			backgroundColor: frameColor,
			opacity: 0.6,
		},
		square: {
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize / 10,
			backgroundColor: frameColor,
			opacity: 0.6,
		},
		cameraContainer: {
			position: "absolute",
			display: "flex",
			left: isLandscape ? undefined : screenWidth + FRAME_WIDTH,
			alignItems: "center",
			justifyContent: "center",
			width: isLandscape ? "100%" : FRAME_WIDTH,
			height: isLandscape ? FRAME_WIDTH : "100%",
		},
		camera: {
			width: getSizeWithRatio(40),
			height: getSizeWithRatio(40),
			borderRadius: getSizeWithRatio(40),
			backgroundColor: statusbarColor,
		},
	});
};

function AndroidTabPortrait(props: PropsWithChildren<IAndroidMockupVariantProps>) {
	const {
		screenWidth,
		screenRounded,
		frameColor,
		frameOnly,
		statusbarColor,
		navigationBar,
		navigationBarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 1600);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 10) * 16);

		return getStyles(
			false,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			screenRounded,
			frameColor,
			statusbarColor,
			navigationBarColor,
			frameOnly,
		);
	}, [screenWidth, screenRounded, frameColor, statusbarColor, navigationBarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* status bar */}
					{hideStatusBar === false && <div style={styles.statusbar} />}
					{/* screen content */}
					<div style={styles.screenCont}>{props.children}</div>
					{/* navigation bar - swipe */}
					{hideNavigationBar === false &&
						navigationBar === "swipe" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationSwipeTransparent}>
								<div style={styles.navigationSwipeBar} />
							</div>
						) : (
							<div style={styles.navigationSwipe}>
								<div style={styles.navigationSwipeBar} />
							</div>
						))}
					{/* navigation bar - portrait - bhr */}
					{hideNavigationBar === false &&
						navigationBar === "bhr" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationBhrTransparent}>
								<div style={styles.triangle} />
								<div style={styles.circle} />
								<div style={styles.square} />
							</div>
						) : (
							<div style={styles.navigationBhrCont}>
								<div style={styles.triangle} />
								<div style={styles.circle} />
								<div style={styles.square} />
							</div>
						))}

					{/* navigation bar - portrait - rhb */}
					{hideNavigationBar === false &&
						navigationBar === "rhb" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationBhrTransparent}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						) : (
							<div style={styles.navigationBhrCont}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						))}
				</div>
			</div>
			{/* camera - portrait */}
			<div style={styles.cameraContainer}>
				<div style={styles.camera} />
			</div>
			{!frameOnly && (
				<>
					<div style={styles.volume} />
					<div style={styles.power} />
				</>
			)}
		</div>
	);
}

function AndroidTabLandscape(props: PropsWithChildren<IAndroidMockupVariantProps>) {
	const {
		screenWidth,
		screenRounded,
		frameColor,
		frameOnly,
		statusbarColor,
		navigationBar,
		navigationBarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 2560);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 16) * 10);

		return getStyles(
			true,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			screenRounded,
			frameColor,
			statusbarColor,
			navigationBarColor,
			frameOnly,
		);
	}, [screenWidth, screenRounded, frameColor, statusbarColor, navigationBarColor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* status bar */}
					{hideStatusBar === false && <div style={styles.statusbar} />}
					{/* screen content */}
					<div style={styles.screenCont}>{props.children}</div>
					{/* navigation bar - swipe */}
					{hideNavigationBar === false &&
						navigationBar === "swipe" &&
						(transparentNavigationBar ? (
							<div
								// pointerEvents="none"
								style={styles.navigationSwipeTransparent}>
								<div style={styles.navigationSwipeBar} />
							</div>
						) : (
							<div style={styles.navigationSwipe}>
								<div style={styles.navigationSwipeBar} />
							</div>
						))}
					{/* navigation bar - landscape - bhr */}
					{hideNavigationBar === false &&
						navigationBar === "bhr" &&
						(transparentNavigationBar ? (
							<div
								// pointerEvents="none"
								style={styles.navigationBhrTransparent}>
								<div style={styles.triangle} />
								<div style={styles.circle} />
								<div style={styles.square} />
							</div>
						) : (
							<div style={styles.navigationBhrCont}>
								<div style={styles.triangle} />
								<div style={styles.circle} />
								<div style={styles.square} />
							</div>
						))}
					{/* navigation bar - landscape - rhb */}
					{hideNavigationBar === false &&
						navigationBar === "rhb" &&
						(transparentNavigationBar ? (
							<div
								// pointerEvents="none"
								style={styles.navigationBhrTransparent}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						) : (
							<div style={styles.navigationBhrCont}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						))}
				</div>
			</div>
			{/* camera - landscape */}
			<div style={styles.cameraContainer}>
				<div style={styles.camera} />
			</div>
			{!frameOnly && (
				<>
					<div style={styles.volume} />
					<div style={styles.power} />
				</>
			)}
		</div>
	);
}
