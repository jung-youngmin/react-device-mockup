import React, { PropsWithChildren, useMemo } from "react";
import { ColorValue, StyleSheet, View } from "react-native";
import { IIosMockupVariantProps } from "../variants-interface";

export default function IPhoneLegacyPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, statusbarColor, hideStatusBar } = props;
	const styles = useMemo(() => {
		return getStyles(screenWidth, frameColor, statusbarColor);
	}, [screenWidth, frameColor, statusbarColor]);

	return (
		<View style={styles.container}>
			<View style={styles.upperBezel}>
				<View style={styles.camSpeakerCont}>
					<View style={styles.speaker}>
						<View style={styles.camera}></View>
					</View>
				</View>
			</View>
			{/* frame */}
			<View style={styles.frame}>
				{/* screen */}
				<View style={styles.screen}>
					{hideStatusBar === false && <View style={styles.statusbar}></View>}
					{/* screen content */}
					<View style={{ flex: 1 }}>{props.children}</View>
				</View>
			</View>
			<View style={styles.lowerBezel}>
				<View style={styles.homeButoon}></View>
			</View>

			<View style={styles.silenceSwitch} />
			<View style={styles.volumeUp} />
			<View style={styles.volumeDown} />
			<View style={styles.powerPortrait} />
		</View>
	);
}

const getStyles = (screenWidth: number, frameColor: ColorValue, statusbarColor: ColorValue) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 375);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(22);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 9) * 16);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;

	const upperBezelHeight = getSizeWithRatio(110);
	const lowerBezelHeight = getSizeWithRatio(110);

	const frameButtonWidth = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition = screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			width: widthAndFrame,
			height: mHeight + upperBezelHeight + lowerBezelHeight,
			borderRadius: getSizeWithRatio(60),
			backgroundColor: frameColor,
			marginHorizontal: frameButtonWidth - HALF_FRAME_WIDTH,
		},
		frame: {
			backgroundColor: frameColor,
			width: widthAndFrame,
			height: mHeight,
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			borderTopWidth: 0,
			borderBottomWidth: 0,
		},
		upperBezel: {
			borderTopLeftRadius: getSizeWithRatio(60),
			borderTopRightRadius: getSizeWithRatio(60),
			width: widthAndFrame,
			height: upperBezelHeight,
			backgroundColor: frameColor,
			justifyContent: "center",
		},
		camSpeakerCont: {
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
			width: getSizeWithRatio(80),
			height: getSizeWithRatio(8),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(10),
		},
		lowerBezel: {
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
