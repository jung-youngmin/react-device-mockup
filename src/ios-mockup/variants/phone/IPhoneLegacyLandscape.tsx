import React, { PropsWithChildren, useMemo } from "react";
import { ColorValue, StyleSheet, View } from "react-native";
import { IIosMockupVariantProps } from "../variants-interface";

export default function IPhoneLegacyLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, statusbarColor } = props;
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
			<View style={styles.power} />
		</View>
	);
}

const getStyles = (screenWidth: number, frameColor: ColorValue, statusbarColor: ColorValue) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 667);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(22);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 16) * 9);
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const upperBezelWidth = getSizeWithRatio(110);
	const lowerBezelWidth = getSizeWithRatio(110);

	const bezelRadius = getSizeWithRatio(60);

	const frameButtonHeight = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition = mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			width: screenWidth + upperBezelWidth + lowerBezelWidth,
			height: heightAndFrame,
			borderRadius: bezelRadius,
			backgroundColor: frameColor,
			flexDirection: "row",
			marginVertical: frameButtonHeight - HALF_FRAME_WIDTH,
		},
		frame: {
			backgroundColor: frameColor,
			width: screenWidth,
			height: heightAndFrame,
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			borderLeftWidth: 0,
			borderRightWidth: 0,
		},
		upperBezel: {
			borderTopLeftRadius: bezelRadius,
			borderBottomLeftRadius: bezelRadius,
			height: heightAndFrame,
			width: upperBezelWidth,
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
			bottom: -getSizeWithRatio(38),
			width: getSizeWithRatio(12),
			height: getSizeWithRatio(12),
			borderRadius: getSizeWithRatio(12),
			backgroundColor: statusbarColor,
		},
		speaker: {
			width: getSizeWithRatio(10),
			height: getSizeWithRatio(72),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(10),
		},
		lowerBezel: {
			borderTopRightRadius: bezelRadius,
			borderBottomRightRadius: bezelRadius,
			width: lowerBezelWidth,
			height: heightAndFrame,
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
		silenceSwitch: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(115),
			top: frameButtonPosition,
			width: getSizeWithRatio(36),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(185),
			top: frameButtonPosition,
			width: getSizeWithRatio(70),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(270),
			top: frameButtonPosition,
			width: getSizeWithRatio(70),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		power: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(190),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(64),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
	});
};
