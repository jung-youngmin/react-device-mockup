import React, { PropsWithChildren, useMemo } from "react";
import { ColorValue, StyleSheet, View } from "react-native";
import { IIosMockupVariantProps } from "../variants-interface";

export default function IPadModernPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		frameColor,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		return getStyles(props.screenWidth, frameColor, statusbarColor);
	}, [props.screenWidth, frameColor, statusbarColor]);

	return (
		<View style={styles.container}>
			{/* frame */}
			<View style={styles.frame}>
				{/* screen */}
				<View style={styles.screen}>
					{hideStatusBar === false && <View style={styles.notchContainer} />}
					{/* screen content */}
					<View style={{ flex: 1 }}>{props.children}</View>
					{hideNavigationBar === false && transparentNavigationBar === false && (
						<View style={styles.swipeContainer}>
							<View style={styles.swipeBar} />
						</View>
					)}
				</View>
				{hideStatusBar && (
					<View pointerEvents="none" style={styles.notchContainerFullScreen} />
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<View pointerEvents="none" style={styles.swipeContainerFullScreen}>
						<View style={styles.swipeBar} />
					</View>
				)}
			</View>
			<View style={styles.volumeUp} />
			<View style={styles.volumeDown} />
			<View style={styles.power} />
		</View>
	);
}

const getStyles = (screenWidth: number, frameColor: ColorValue, statusbarColor: ColorValue) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 834);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(35);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 3) * 4);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const bezelRadius = getSizeWithRatio(50);

	const frameButtonWidth = Math.floor(FRAME_WIDTH * 0.65);
	const frameButtonPosition = screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			width: widthAndFrame,
			height: heightAndFrame,
			borderRadius: bezelRadius,
			backgroundColor: frameColor,
			marginTop: frameButtonWidth - HALF_FRAME_WIDTH,
			marginRight: frameButtonWidth - HALF_FRAME_WIDTH,
		},
		frame: {
			width: widthAndFrame,
			height: heightAndFrame,
			borderRadius: bezelRadius,
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			overflow: "hidden",
		},
		screen: {
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
		},
		notchContainerFullScreen: {
			position: "absolute",
			width: "100%",
			height: getSizeWithRatio(24),
			alignItems: "center",
		},
		notchContainer: {
			width: "100%",
			height: getSizeWithRatio(24),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
		swipeContainerFullScreen: {
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(20),
			alignItems: "center",
			justifyContent: "center",
		},
		swipeContainer: {
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
			width: "30%",
			height: getSizeWithRatio(8),
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(75),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(50),
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(130),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(50),
			backgroundColor: frameColor,
		},
		power: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			bottom: mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH,
			left: screenWidth - FRAME_WIDTH - HALF_FRAME_WIDTH,
			width: getSizeWithRatio(60),
			height: frameButtonWidth,
			backgroundColor: frameColor,
		},
	});
};
