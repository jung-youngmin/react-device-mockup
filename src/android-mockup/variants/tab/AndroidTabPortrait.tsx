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
		const sizeRatio = Math.floor((screenWidth * size) / 1600);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(100);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 10) * 16);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const frameButtonWidth = Math.floor(FRAME_WIDTH * 0.7);
	const frameButtonPosition = screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH;

	const subItemSize = getSizeWithRatio(45);

	return StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingRight: frameButtonWidth - HALF_FRAME_WIDTH + 1,
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
		screen: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
		},
		statusbarPortrait: {
			display: "flex",
			flexDirection: "column",
			// width: "100%",
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
		navigationPortraitBHR: {
			display: "flex",
			position: "relative",
			// width: "100%",
			height: getSizeWithRatio(80),
			backgroundColor: navigationBarcolor,
			paddingLeft: screenWidth / 2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		navigationPortraitBhrTransparent: {
			display: "flex",
			position: "absolute",
			bottom: 0,
			width: "100%",
			boxSizing: "border-box",
			pointerEvents: "none",
			height: getSizeWithRatio(80),
			paddingLeft: screenWidth / 2,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(300),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(180),
			backgroundColor: frameColor,
		},
		volumePortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(600),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(330),
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
		cameraPortraitContainer: {
			display: "flex",
			position: "absolute",
			left: screenWidth + FRAME_WIDTH,
			alignItems: "center",
			justifyContent: "center",
			width: FRAME_WIDTH,
			height: "100%",
		},
		camera: {
			width: getSizeWithRatio(40),
			height: getSizeWithRatio(40),
			borderRadius: getSizeWithRatio(40),
			backgroundColor: statusbarColor,
		},
	});
};

export default function AndroidTabPortrait(props: PropsWithChildren<IAndroidMockupVariantProps>) {
	const {
		screenWidth,
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
		() => getStyles(screenWidth, screenRounded, frameColor, statusbarColor, navigationBarcolor),
		[screenWidth, screenRounded, frameColor, statusbarColor, navigationBarcolor],
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
							<div style={styles.navigationPortraitBhrTransparent}>
								<div style={styles.triangle} />
								<div style={styles.circle} />
								<div style={styles.square} />
							</div>
						) : (
							<div style={styles.navigationPortraitBHR}>
								<div style={styles.triangle} />
								<div style={styles.circle} />
								<div style={styles.square} />
							</div>
						))}

					{/* navigation bar - portrait - rhb */}
					{hideNavigationBar === false &&
						navigationBar === "rhb" &&
						(transparentNavigationBar ? (
							<div style={styles.navigationPortraitBhrTransparent}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						) : (
							<div style={styles.navigationPortraitBHR}>
								<div style={styles.square} />
								<div style={styles.circle} />
								<div style={styles.triangle} />
							</div>
						))}
				</div>
			</div>
			{/* camera - portrait */}
			<div style={styles.cameraPortraitContainer}>
				<div style={styles.camera} />
			</div>
			<div style={styles.volumePortrait} />
			<div style={styles.powerPortrait} />
		</div>
	);
}
