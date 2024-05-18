import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 1080);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(35);

	const mHeight = Math.floor((screenWidth / 4) * 3);
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const upperBezelWidth = getSizeWithRatio(90);
	const lowerBezelWidth = getSizeWithRatio(90);

	const bezelRadius = getSizeWithRatio(40);

	return StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			flexDirection: "row",
			width: screenWidth + upperBezelWidth + lowerBezelWidth,
			height: heightAndFrame,
			// borderRadius: bezelRadius,
			// backgroundColor: frameColor,
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
			// borderWidth: FRAME_WIDTH,
			// borderColor: frameColor,
			// borderLeftWidth: 0,
			// borderRightWidth: 0,
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
			width: getSizeWithRatio(20),
			height: getSizeWithRatio(20),
			borderRadius: getSizeWithRatio(20),
			backgroundColor: statusbarColor,
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

export default function IPadLegacyLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
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
