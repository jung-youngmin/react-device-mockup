import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
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
	const frameButtonPosition =
		screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonWidth - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: widthAndFrame,
			height: mHeight + upperBezelHeight + lowerBezelHeight,
			paddingRight: frameButtonWidth - HALF_FRAME_WIDTH,
			paddingLeft: frameButtonWidth - HALF_FRAME_WIDTH,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			position: "relative",
			boxSizing: "border-box",
			backgroundColor: frameColor,
			width: widthAndFrame,
			height: mHeight,
			overflow: "hidden",
		},
		upperBezel: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			borderTopLeftRadius: getSizeWithRatio(60),
			borderTopRightRadius: getSizeWithRatio(60),
			width: widthAndFrame,
			height: upperBezelHeight,
			backgroundColor: frameColor,
			justifyContent: "center",
		},
		camSpeakerCont: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
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
			position: "relative",
			width: getSizeWithRatio(80),
			height: getSizeWithRatio(8),
			backgroundColor: statusbarColor,
			borderRadius: getSizeWithRatio(10),
		},
		lowerBezel: {
			display: "flex",
			flexDirection: "column",
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
			display: "flex",
			flexDirection: "column",
			position: "relative",
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

export default function IPhoneLegacyPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, statusbarColor, hideStatusBar } = props;
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
					{hideStatusBar === false && <div style={styles.statusbar} />}
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
			<div style={styles.powerPortrait} />
		</div>
	);
}
