import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
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
	const frameButtonPosition =
		mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonHeight - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			flexDirection: "row",
			width: screenWidth + upperBezelWidth + lowerBezelWidth,
			height: heightAndFrame,
			paddingTop: frameButtonHeight - HALF_FRAME_WIDTH,
			paddingBottom: frameButtonHeight - HALF_FRAME_WIDTH,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			justifyContent: "center",
			boxSizing: "border-box",
			backgroundColor: frameColor,
			width: screenWidth,
			height: heightAndFrame,
			overflow: "hidden",
		},
		upperBezel: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			borderTopLeftRadius: bezelRadius,
			borderBottomLeftRadius: bezelRadius,
			height: heightAndFrame,
			width: upperBezelWidth,
			backgroundColor: frameColor,
			justifyContent: "center",
		},
		camSpeakerCont: {
			display: "flex",
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
			position: "relative",
			width: getSizeWithRatio(10),
			height: getSizeWithRatio(72),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(10),
		},
		lowerBezel: {
			display: "flex",
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
			display: "flex",
			flexDirection: "row",
			position: "relative",
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

export default function IPhoneLegacyLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, statusbarColor } = props;
	const styles = useMemo(
		() => getStyles(screenWidth, frameColor, statusbarColor),
		[screenWidth, frameColor, statusbarColor],
	);

	return (
		<div style={styles.container}>
			<div style={styles.upperBezel}>
				<div style={styles.camSpeakerCont}>
					<div style={styles.speaker}>
						<div style={styles.camera} />
					</div>
				</div>
			</div>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
						{props.children}
					</div>
				</div>
			</div>
			<div style={styles.lowerBezel}>
				<div style={styles.homeButoon} />
			</div>

			<div style={styles.silenceSwitch} />
			<div style={styles.volumeUp} />
			<div style={styles.volumeDown} />
			<div style={styles.power} />
		</div>
	);
}
