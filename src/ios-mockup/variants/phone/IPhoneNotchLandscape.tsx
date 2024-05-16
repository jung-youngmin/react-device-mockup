import React, { PropsWithChildren, useMemo } from "react";
import { ColorValue, StyleSheet, View } from "react-native";
import { IIosMockupVariantProps } from "../variants-interface";

export default function IPhoneNotchLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
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
					{hideStatusBar === false && (
						<View style={styles.notchContainer}>
							<View style={styles.notch}></View>
						</View>
					)}
					{/* screen content */}
					<View style={{ flex: 1 }}>
						<View style={{ flex: 1 }}>{props.children}</View>
						{hideNavigationBar === false && transparentNavigationBar === false && (
							<View style={styles.swipeContainer}>
								<View style={styles.swipeBar} />
							</View>
						)}
					</View>
					{hideStatusBar === false && <View style={styles.safeAreaRight} />}
				</View>
				{hideStatusBar && (
					<View pointerEvents="none" style={styles.notchContainerFullScreen}>
						<View style={styles.notch}></View>
					</View>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<View pointerEvents="none" style={styles.swipeContainerFullScreen}>
						<View style={styles.swipeBar} />
					</View>
				)}
			</View>
			<View style={styles.notchPad} />
			<View style={styles.silenceSwitch} />
			<View style={styles.volumeUp} />
			<View style={styles.volumeDown} />
			<View style={styles.powerPortrait} />
		</View>
	);
}

const getStyles = (screenWidth: number, frameColor: ColorValue, statusbarColor: ColorValue) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 844);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(14);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 19.5) * 9);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const bezelRadius = getSizeWithRatio(64);

	const frameButtonHeight = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition = mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			width: widthAndFrame,
			height: heightAndFrame,
			borderRadius: bezelRadius,
			backgroundColor: frameColor,
			flexDirection: "row",
			marginVertical: frameButtonHeight - HALF_FRAME_WIDTH,
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
			flexDirection: "row",
		},
		safeAreaRight: {
			width: getSizeWithRatio(44),
			height: "100%",
			backgroundColor: statusbarColor,
		},
		notchContainerFullScreen: {
			position: "absolute",
			width: getSizeWithRatio(44),
			height: "100%",
			justifyContent: "center",
		},
		notchContainer: {
			width: getSizeWithRatio(44),
			height: "100%",
			backgroundColor: statusbarColor,
			justifyContent: "center",
		},
		notch: {
			width: getSizeWithRatio(31),
			height: getSizeWithRatio(160),
			backgroundColor: frameColor,
			borderTopRightRadius: getSizeWithRatio(20),
			borderBottomRightRadius: getSizeWithRatio(20),
		},
		swipeContainerFullScreen: {
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(21),
			alignItems: "center",
			justifyContent: "flex-end",
		},
		swipeContainer: {
			width: "100%",
			height: getSizeWithRatio(21),
			backgroundColor: statusbarColor,
			alignItems: "center",
			justifyContent: "flex-end",
		},
		swipeBar: {
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(100),
			width: "30%",
			height: getSizeWithRatio(7),
			marginBottom: getSizeWithRatio(5),
		},
		silenceSwitch: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(165),
			top: frameButtonPosition,
			width: getSizeWithRatio(34),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(230),
			top: frameButtonPosition,
			width: getSizeWithRatio(65),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(315),
			top: frameButtonPosition,
			width: getSizeWithRatio(65),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(250),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(105),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		notchPad: {
			alignSelf: "center",
			position: "absolute",
			left: HALF_FRAME_WIDTH,
			width: getSizeWithRatio(20),
			height: getSizeWithRatio(160),
			backgroundColor: frameColor,
		},
	});
};
