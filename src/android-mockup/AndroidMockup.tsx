import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useMemo } from "react";
import { IAndroidMockupVariantProps, StyleSheet } from "../shared-types/variants-interface";

interface IAndroidMockupProps {
	readonly screenWidth: number;
	/** default: false */
	readonly noRoundedScreen?: boolean;
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
	/** default: "swipe" */
	readonly navBar?: "swipe" | "bhr" | "rhb";
	/** default: "#CCCCCC" */
	readonly navBarcolor?: Property.Color;
	/** default: false */
	readonly transparentNavBar?: boolean;
	/** default: false */
	readonly hideNavBar?: boolean;
	/** default: false. Landscape only */
	readonly transparentCamArea?: boolean;
}

export type AndroidMockupProps = PropsWithChildren<IAndroidMockupProps>;
export default function AndroidMockup(props: AndroidMockupProps) {
	const noRoundedScreen = useMemo(
		() => (props.noRoundedScreen === undefined ? false : props.noRoundedScreen),
		[props.noRoundedScreen],
	);

	const isLandscape = useMemo(
		() => (props.isLandscape === undefined ? false : props.isLandscape),
		[props.isLandscape],
	);

	const frameColor = useMemo(
		() => (props.frameColor === undefined ? "#666666" : props.frameColor),
		[props.frameColor],
	);

	const frameOnly = useMemo(
		() => (props.frameOnly === undefined ? false : props.frameOnly),
		[props.frameOnly],
	);

	const statusbarColor = useMemo(
		() => (props.statusbarColor === undefined ? "#CCCCCC" : props.statusbarColor),
		[props.statusbarColor],
	);

	const navigationBar = useMemo(
		() => (props.navBar === undefined ? "swipe" : props.navBar),
		[props.navBar],
	);

	const navigationBarcolor = useMemo(
		() => (props.navBarcolor === undefined ? "#CCCCCC" : props.navBarcolor),
		[props.navBarcolor],
	);

	const hideStatusBar = useMemo(
		() => (props.hideStatusBar === undefined ? false : props.hideStatusBar),
		[props.hideStatusBar],
	);

	const transparentCamArea = useMemo(
		() => (props.transparentCamArea === undefined ? false : props.transparentCamArea),
		[props.transparentCamArea],
	);

	const transparentNavigationBar = useMemo(
		() => (props.transparentNavBar === undefined ? false : props.transparentNavBar),
		[props.transparentNavBar],
	);

	const hideNavigationBar = useMemo(
		() => (props.hideNavBar === undefined ? false : props.hideNavBar),
		[props.hideNavBar],
	);

	return (
		<div style={props.containerStlye}>
			{isLandscape ? (
				// eslint-disable-next-line no-use-before-define
				<AndroidLandscape
					screenWidth={props.screenWidth}
					screenRounded={!noRoundedScreen}
					frameColor={frameColor}
					frameOnly={frameOnly}
					statusbarColor={statusbarColor}
					navigationBar={navigationBar}
					navigationBarcolor={navigationBarcolor}
					hideStatusBar={hideStatusBar}
					transparentCamArea={transparentCamArea}
					transparentNavigationBar={transparentNavigationBar}
					hideNavigationBar={hideNavigationBar}>
					{props.children}
				</AndroidLandscape>
			) : (
				// eslint-disable-next-line no-use-before-define
				<AndroidPortrait
					screenWidth={props.screenWidth}
					screenRounded={!noRoundedScreen}
					frameColor={frameColor}
					frameOnly={frameOnly}
					statusbarColor={statusbarColor}
					navigationBar={navigationBar}
					navigationBarcolor={navigationBarcolor}
					hideStatusBar={hideStatusBar}
					transparentNavigationBar={transparentNavigationBar}
					hideNavigationBar={hideNavigationBar}>
					{props.children}
				</AndroidPortrait>
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
	navigationBarcolor: Property.Color,
	frameOnly: boolean,
) => {
	const FRAME_WIDTH = getSizeWithRatio(32);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const frameButtonSize = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition =
		(isLandscape ? mHeight : screenWidth) + FRAME_WIDTH + HALF_FRAME_WIDTH;

	const subItemSize = getSizeWithRatio(60);

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

	const styles = StyleSheet.create({
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
			backgroundColor: frameColor,
			borderRadius: screenRounded ? getSizeWithRatio(140) : getSizeWithRatio(30),
			borderStyle: "solid",
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			overflow: "hidden",
		},
		screenCont: { display: "flex", flex: 1, overflow: "hidden" },
		screen: {
			display: "flex",
			flexDirection: isLandscape ? "row" : "column",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		statusbar: {
			display: "flex",
			flexDirection: "column",
			width: isLandscape ? getSizeWithRatio(90) : "100%",
			height: isLandscape ? "100%" : getSizeWithRatio(90),
			backgroundColor: statusbarColor,
			alignItems: isLandscape ? "flex-start" : "center",
			justifyContent: isLandscape ? "center" : "flex-start",
		},
		camera: {
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize,
			backgroundColor: frameColor,
			marginTop: isLandscape ? 0 : getSizeWithRatio(20),
			marginLeft: isLandscape ? getSizeWithRatio(20) : 0,
		},
		// landscape only
		statusbarLand: {
			height: getSizeWithRatio(50),
			backgroundColor: statusbarColor,
		},
		navigationSwipeCont: {
			display: "flex",
			width: "100%",
			height: getSizeWithRatio(isLandscape ? 50 : 60),
			backgroundColor: navigationBarcolor,
			alignItems: "center",
			justifyContent: "center",
		},
		navigationSwipeTransparentCont: {
			display: "flex",
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(isLandscape ? 50 : 60),
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
			flexDirection: isLandscape ? "column" : "row",
			width: isLandscape ? getSizeWithRatio(120) : "100%",
			height: isLandscape ? "100%" : getSizeWithRatio(120),
			backgroundColor: navigationBarcolor,
			paddingTop: isLandscape ? getSizeWithRatio(260) : 0,
			paddingBottom: isLandscape ? getSizeWithRatio(260) : 0,
			paddingLeft: isLandscape ? 0 : getSizeWithRatio(260),
			paddingRight: isLandscape ? 0 : getSizeWithRatio(260),
			alignItems: "center",
			justifyContent: "space-between",
		},
		navigationBhrTransParent: {
			position: "absolute",
			display: "flex",
			flexDirection: isLandscape ? "column" : "row",
			boxSizing: "border-box",
			bottom: isLandscape ? undefined : 0,
			right: isLandscape ? 0 : undefined,
			width: isLandscape ? getSizeWithRatio(120) : "100%",
			height: isLandscape ? "100%" : getSizeWithRatio(120),
			paddingTop: isLandscape ? getSizeWithRatio(260) : 0,
			paddingBottom: isLandscape ? getSizeWithRatio(260) : 0,
			paddingLeft: isLandscape ? 0 : getSizeWithRatio(260),
			paddingRight: isLandscape ? 0 : getSizeWithRatio(260),
			alignItems: "center",
			justifyContent: "space-between",
			pointerEvents: "none",
		},
		volumePortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(420),
			left: frameButtonPosition,
			width: frameButtonSize,
			height: getSizeWithRatio(330),
			backgroundColor: frameColor,
		},
		volumeLandscape: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(420),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(330),
			height: frameButtonSize,
			backgroundColor: frameColor,
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(900),
			left: frameButtonPosition,
			width: frameButtonSize,
			height: getSizeWithRatio(180),
			backgroundColor: frameColor,
		},
		powerLandscape: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(900),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(180),
			height: frameButtonSize,
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
		cameraFullScreen: {
			position: "absolute",
			alignSelf: "center",
			verticalAlign: isLandscape ? "middle" : undefined,
			top: isLandscape ? undefined : getSizeWithRatio(20),
			left: isLandscape ? getSizeWithRatio(20) : undefined,
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize,
			backgroundColor: frameColor,
		},
	});

	return styles;
};

function AndroidPortrait(props: PropsWithChildren<IAndroidMockupVariantProps>) {
	const {
		screenWidth,
		screenRounded,
		frameColor,
		frameOnly,
		statusbarColor,
		navigationBar,
		navigationBarcolor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;

	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 1080);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 9) * 19.5);

		return getStyles(
			false,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			screenRounded,
			frameColor,
			statusbarColor,
			navigationBarcolor,
			frameOnly,
		);
	}, [screenWidth, screenRounded, frameColor, statusbarColor, navigationBarcolor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* status bar */}
					{hideStatusBar === false && (
						<div style={styles.statusbar}>
							{/* camera - portrait */}
							<div style={styles.camera} />
						</div>
					)}
					{/* screen content */}
					<div style={styles.screenCont}>{props.children}</div>
					{/* camera - fullScreen - portrait */}
					{hideStatusBar && <div style={styles.cameraFullScreen} />}

					{/* navigation bar - swipe */}
					{hideNavigationBar === false &&
						navigationBar === "swipe" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationSwipeTransparentCont}>
								<div style={styles.navigationSwipeBar} />
							</div>
						) : (
							<div style={styles.navigationSwipeCont}>
								<div style={styles.navigationSwipeBar} />
							</div>
						))}

					{/* navigation bar - bhr */}
					{hideNavigationBar === false &&
						navigationBar === "bhr" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationBhrTransParent}>
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

					{/* navigation bar - rhb */}
					{hideNavigationBar === false &&
						navigationBar === "rhb" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationBhrTransParent}>
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
			{!frameOnly && (
				<>
					<div style={styles.volumePortrait} />
					<div style={styles.powerPortrait} />
				</>
			)}
		</div>
	);
}

function AndroidLandscape(
	props: PropsWithChildren<IAndroidMockupVariantProps & { readonly transparentCamArea: boolean }>,
) {
	const {
		screenWidth,
		screenRounded,
		frameColor,
		frameOnly,
		statusbarColor,
		navigationBar,
		navigationBarcolor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
		transparentCamArea,
	} = props;
	const styles = useMemo(() => {
		const getSizeWithRatio = (size: number) => {
			const sizeRatio = Math.floor((screenWidth * size) / 2340);
			return Math.max(sizeRatio, 1);
		};
		const mHeight = Math.floor((screenWidth / 19.5) * 9);

		return getStyles(
			true,
			getSizeWithRatio,
			screenWidth,
			mHeight,
			screenRounded,
			frameColor,
			statusbarColor,
			navigationBarcolor,
			frameOnly,
		);
	}, [screenWidth, screenRounded, frameColor, statusbarColor, navigationBarcolor, frameOnly]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* status bar */}
					{transparentCamArea === false && (
						<div style={styles.statusbar}>
							{/* camera */}
							<div style={styles.camera} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
						{hideStatusBar === false && <div style={styles.statusbarLand} />}
						<div style={styles.screenCont}>{props.children}</div>
						{/* navigation bar - swipe */}
						{hideNavigationBar === false &&
							navigationBar === "swipe" &&
							transparentNavigationBar === false && (
								<div style={styles.navigationSwipeCont}>
									<div style={styles.navigationSwipeBar} />
								</div>
							)}
					</div>

					{/* camera - fullScreen */}
					{transparentCamArea && <div style={styles.cameraFullScreen} />}

					{/* navigation bar - fullScreen - swipe */}
					{hideNavigationBar === false &&
						navigationBar === "swipe" &&
						transparentNavigationBar && (
							<div style={styles.navigationSwipeTransparentCont}>
								<div style={styles.navigationSwipeBar} />
							</div>
						)}

					{/* navigation bar - bhr */}
					{hideNavigationBar === false &&
						navigationBar === "bhr" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationBhrTransParent}>
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

					{/* navigation bar - rhb */}
					{hideNavigationBar === false &&
						navigationBar === "rhb" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationBhrTransParent}>
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
				</div>
			</div>
			{!frameOnly && (
				<>
					<div style={styles.volumeLandscape} />
					<div style={styles.powerLandscape} />
				</>
			)}
		</div>
	);
}
