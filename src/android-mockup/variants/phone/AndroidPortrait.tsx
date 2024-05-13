import { PropsWithChildren, useMemo } from "react";
import { IAndroidMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";
import { Property } from "csstype";

export default function AndroidPortrait(props: PropsWithChildren<IAndroidMockupVariantProps>) {
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
	const styles = useMemo(() => {
		return getStyles(
			screenWidth,
			screenRounded,
			frameColor,
			statusbarColor,
			navigationBarcolor,
		);
	}, [screenWidth, screenRounded, frameColor, statusbarColor, navigationBarcolor]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* status bar*/}
					{hideStatusBar === false && (
						<div style={styles.statusbarPortrait}>
							{/* camera - portrait */}
							<div style={styles.cameraPortrait} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1 }}>{props.children}</div>
					{/* camera - fullScreen - portrait */}
					{hideStatusBar && <div style={styles.cameraFullScreenPortrait} />}

					{/* navigation bar - swipe */}
					{hideNavigationBar === false &&
						navigationBar === "swipe" &&
						(transparentNavigationBar ? (
							<div
								// pointerEvents="none"
								style={styles.navigationFullScreenPortraitSwipe}>
								<div style={styles.navigationSwipeBar} />
							</div>
						) : (
							<div style={styles.navigationPortraitSwipe}>
								<div style={styles.navigationSwipeBar} />
							</div>
						))}

					{/* navigation bar - bhr */}
					{hideNavigationBar === false &&
						navigationBar === "bhr" &&
						(transparentNavigationBar ? (
							<div
								// pointerEvents="none"
								style={styles.navigationPortraitBhrTransParent}>
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

					{/* navigation bar - rhb */}
					{hideNavigationBar === false &&
						navigationBar === "rhb" &&
						(transparentNavigationBar ? (
							<div
								// pointerEvents="none"
								style={styles.navigationPortraitBhrTransParent}>
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
			<div style={styles.volumePortrait} />
			<div style={styles.powerPortrait} />
		</div>
	);
}

const getStyles = (
	screenWidth: number,
	screenRounded: boolean,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
	navigationBarcolor: Property.Color,
) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 1080);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(32);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 9) * 19.5);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const frameButtonWidth = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition = screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH;

	const subItemSize = getSizeWithRatio(60);

	const styles = StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			border: "1px solid blue",
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
			// flex: 1,
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		statusbarPortrait: {
			display: "flex",
			flexDirection: "column",
			// width: "100%",
			height: getSizeWithRatio(90),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
		navigationPortraitSwipe: {
			display: "flex",
			width: "100%",
			height: getSizeWithRatio(60),
			backgroundColor: navigationBarcolor,
			alignItems: "center",
			justifyContent: "center",
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
			height: getSizeWithRatio(120),
			backgroundColor: navigationBarcolor,
			paddingLeft: getSizeWithRatio(260),
			paddingRight: getSizeWithRatio(260),
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		navigationPortraitBhrTransParent: {
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(120),
			paddingLeft: getSizeWithRatio(260),
			paddingRight: getSizeWithRatio(260),
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
		},
		volumePortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(420),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(330),
			backgroundColor: frameColor,
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(900),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(180),
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
		cameraPortrait: {
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize,
			backgroundColor: frameColor,
			marginTop: getSizeWithRatio(20),
		},
		cameraFullScreenPortrait: {
			position: "absolute",
			alignSelf: "center",
			top: getSizeWithRatio(20),
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize,
			backgroundColor: frameColor,
		},
		navigationFullScreenPortraitSwipe: {
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(60),
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return styles;
};
