import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IAndroidMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	screenRounded: boolean,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
	navigationBarcolor: Property.Color,
) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 2560);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(100);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 16) * 10);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const frameButtonHeight = Math.floor(FRAME_WIDTH * 0.7);
	const frameButtonPosition = mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH;

	const subItemSize = getSizeWithRatio(45);

	return StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingTop: frameButtonHeight - HALF_FRAME_WIDTH,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			backgroundColor: frameColor,
			borderRadius: screenRounded ? getSizeWithRatio(140) : getSizeWithRatio(30),
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
		statusbarPortrait: {
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
			backgroundColor: navigationBarcolor,
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
		navigationLandscapeBHR: {
			display: "flex",
			position: "relative",
			boxSizing: "border-box",
			width: "100%",
			height: getSizeWithRatio(80),
			backgroundColor: navigationBarcolor,
			paddingLeft: (screenWidth / 3) * 2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		navigationLandscapeBhrTransparent: {
			display: "flex",
			position: "absolute",
			boxSizing: "border-box",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(80),
			paddingLeft: (screenWidth / 3) * 2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		powerLandscape: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(300),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(180),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeLandscape: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(600),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(330),
			height: frameButtonHeight,
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
		cameraLandscapeContainer: {
			display: "flex",
			position: "absolute",
			top: frameButtonHeight - HALF_FRAME_WIDTH,
			alignItems: "center",
			justifyContent: "center",
			width: widthAndFrame,
			height: FRAME_WIDTH,
		},
		camera: {
			width: getSizeWithRatio(40),
			height: getSizeWithRatio(40),
			borderRadius: getSizeWithRatio(40),
			backgroundColor: statusbarColor,
		},
	});
};

export default function AndroidTabLandscape(props: PropsWithChildren<IAndroidMockupVariantProps>) {
	const {
		screenRounded,
		frameColor,
		statusbarColor,
		navigationBar,
		navigationBarcolor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(
		() =>
			getStyles(
				props.screenWidth,
				screenRounded,
				frameColor,
				statusbarColor,
				navigationBarcolor,
			),
		[props.screenWidth, screenRounded, frameColor, statusbarColor, navigationBarcolor],
	);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* status bar */}
					{hideStatusBar === false && <div style={styles.statusbarPortrait} />}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
						{props.children}
					</div>
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
								style={styles.navigationLandscapeBhrTransparent}>
								<div style={styles.triangle} />
								<div style={styles.circle} />
								<div style={styles.square} />
							</div>
						) : (
							<div style={styles.navigationLandscapeBHR}>
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
								style={styles.navigationLandscapeBhrTransparent}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						) : (
							<div style={styles.navigationLandscapeBHR}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						))}
				</div>
			</div>
			{/* camera - landscape */}
			<div style={styles.cameraLandscapeContainer}>
				<div style={styles.camera} />
			</div>
			<div style={styles.volumeLandscape} />
			<div style={styles.powerLandscape} />
		</div>
	);
}
