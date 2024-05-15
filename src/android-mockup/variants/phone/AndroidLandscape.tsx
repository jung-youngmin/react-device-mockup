import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IAndroidMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

export default function AndroidLandscape(
	props: PropsWithChildren<IAndroidMockupVariantProps & { readonly transparentCamArea: boolean }>,
) {
	const {
		screenRounded,
		frameColor,
		statusbarColor,
		navigationBar,
		navigationBarcolor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
		transparentCamArea,
	} = props;
	const styles = useMemo(() => {
		return getStyles(
			props.screenWidth,
			screenRounded,
			frameColor,
			statusbarColor,
			navigationBarcolor,
		);
	}, [props.screenWidth, screenRounded, frameColor, statusbarColor, navigationBarcolor]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* status bar*/}
					{transparentCamArea === false && (
						<div style={styles.statusbarLandscape}>
							{/* camera */}
							<div style={styles.cameraLandscape} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
						{hideStatusBar === false && <div style={styles.statusbar} />}
						<div
							style={{
								display: "flex",
								flex: 1,
								overflow: "hidden",
							}}>
							{props.children}
						</div>
						{/* navigation bar - swipe */}
						{hideNavigationBar === false &&
							navigationBar === "swipe" &&
							transparentNavigationBar === false && (
								<div style={styles.navigationLandscapeSwipe}>
									<div style={styles.navigationSwipeBar} />
								</div>
							)}
					</div>

					{/* camera - fullScreen */}
					{transparentCamArea && <div style={styles.cameraFullScreenLandscape} />}

					{/* navigation bar - fullScreen - swipe */}
					{hideNavigationBar === false &&
						navigationBar === "swipe" &&
						transparentNavigationBar && (
							<div
								// pointerEvents="none"
								style={styles.navigationFullScreenLandscapeSwipe}>
								<div style={styles.navigationSwipeBar} />
							</div>
						)}

					{/* navigation bar - bhr */}
					{hideNavigationBar === false &&
						navigationBar === "bhr" &&
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

					{/* navigation bar - rhb */}
					{hideNavigationBar === false &&
						navigationBar === "rhb" &&
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
				</div>
			</div>
			<div style={styles.volumeLandscape} />
			<div style={styles.powerLandscape} />
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
		const sizeRatio = Math.floor((screenWidth * size) / 2340);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(32);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 19.5) * 9);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const frameButtonHeight = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition = mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH;

	const subItemSize = getSizeWithRatio(60);

	return StyleSheet.create({
		container: {
			// border: "1px solid blue",
			display: "flex",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingTop: frameButtonHeight - HALF_FRAME_WIDTH + 1,
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
			flexDirection: "row",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		statusbarLandscape: {
			display: "flex",
			flexDirection: "column",
			width: getSizeWithRatio(90),
			height: "100%",
			backgroundColor: statusbarColor,
			justifyContent: "center",
		},
		statusbar: {
			// display: "flex",
			// width: "100%",
			height: getSizeWithRatio(50),
			backgroundColor: statusbarColor,
		},
		navigationLandscapeSwipe: {
			display: "flex",
			width: "100%",
			height: getSizeWithRatio(50),
			backgroundColor: navigationBarcolor,
			alignItems: "center",
			justifyContent: "center",
		},
		navigationFullScreenLandscapeSwipe: {
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(50),
			alignItems: "center",
			justifyContent: "center",
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
			flexDirection: "column",
			width: getSizeWithRatio(120),
			// height: "100%",
			paddingTop: getSizeWithRatio(260),
			paddingBottom: getSizeWithRatio(260),
			backgroundColor: navigationBarcolor,
			alignItems: "center",
			justifyContent: "space-between",
		},
		navigationLandscapeBhrTransparent: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			boxSizing: "border-box",
			right: 0,
			width: getSizeWithRatio(120),
			height: "100%",
			paddingTop: getSizeWithRatio(260),
			paddingBottom: getSizeWithRatio(260),
			alignItems: "center",
			justifyContent: "space-between",
		},
		volumeLandscape: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(420),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(330),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		powerLandscape: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(900),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(180),
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
		cameraLandscape: {
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize,
			backgroundColor: frameColor,
			marginLeft: getSizeWithRatio(20),
		},
		cameraFullScreenLandscape: {
			position: "absolute",
			alignSelf: "center",
			verticalAlign: "middle",
			left: getSizeWithRatio(20),
			width: subItemSize,
			height: subItemSize,
			borderRadius: subItemSize,
			backgroundColor: frameColor,
		},
	});
};
