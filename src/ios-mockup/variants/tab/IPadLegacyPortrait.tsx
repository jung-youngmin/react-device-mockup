import React, { PropsWithChildren, useMemo } from "react";
import { ColorValue, StyleSheet, View } from "react-native";
import { IIosMockupVariantProps } from "../variants-interface";

export default function IPadLegacyPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, statusbarColor, hideStatusBar } = props;
	const styles = useMemo(() => {
		return getStyles(screenWidth, frameColor, statusbarColor);
	}, [screenWidth, frameColor, statusbarColor]);

	return (
		<View style={styles.container}>
			<View style={styles.upperBezel}>
				<View style={styles.camSpeakerCont}>
					<View style={styles.camera}></View>
				</View>
			</View>
			{/* frame */}
			<View style={styles.frame}>
				{/* screen */}
				<View style={styles.screen}>
					{hideStatusBar === false && <View style={styles.statusbar} />}
					{/* screen content */}
					<View style={{ flex: 1 }}>{props.children}</View>
				</View>
			</View>
			<View style={styles.lowerBezel}>
				<View style={styles.homeButoon}></View>
			</View>
		</View>
	);
}

const getStyles = (screenWidth: number, frameColor: ColorValue, statusbarColor: ColorValue) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 810);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(35);

	const mHeight = Math.floor((screenWidth / 3) * 4);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;

	const upperBezelHeight = getSizeWithRatio(90);
	const lowerBezelHeight = getSizeWithRatio(90);

	const bezelRadius = getSizeWithRatio(40);

	return StyleSheet.create({
		container: {
			width: widthAndFrame,
			height: mHeight + upperBezelHeight + lowerBezelHeight,
			borderRadius: bezelRadius,
			backgroundColor: frameColor,
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
			borderTopLeftRadius: bezelRadius,
			borderTopRightRadius: bezelRadius,
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
			width: getSizeWithRatio(20),
			height: getSizeWithRatio(20),
			borderRadius: getSizeWithRatio(20),
			backgroundColor: statusbarColor,
		},
		lowerBezel: {
			borderBottomLeftRadius: bezelRadius,
			borderBottomRightRadius: bezelRadius,
			width: widthAndFrame,
			height: lowerBezelHeight,
			backgroundColor: frameColor,
			alignItems: "center",
			justifyContent: "center",
		},
		homeButoon: {
			width: getSizeWithRatio(55),
			height: getSizeWithRatio(55),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(55),
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
	});
};
