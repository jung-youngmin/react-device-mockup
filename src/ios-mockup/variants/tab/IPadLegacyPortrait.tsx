import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
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
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: widthAndFrame,
			height: mHeight + upperBezelHeight + lowerBezelHeight,
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
			borderTopLeftRadius: bezelRadius,
			borderTopRightRadius: bezelRadius,
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
			width: getSizeWithRatio(20),
			height: getSizeWithRatio(20),
			borderRadius: getSizeWithRatio(20),
			backgroundColor: statusbarColor,
		},
		lowerBezel: {
			display: "flex",
			flexDirection: "column",
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
	});
};

export default function IPadLegacyPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const { screenWidth, frameColor, statusbarColor, hideStatusBar } = props;
	const styles = useMemo(
		() => getStyles(screenWidth, frameColor, statusbarColor),
		[screenWidth, frameColor, statusbarColor],
	);

	return (
		<div style={styles.container}>
			<div style={styles.upperBezel}>
				<div style={styles.camSpeakerCont}>
					<div style={styles.camera} />
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
		</div>
	);
}
