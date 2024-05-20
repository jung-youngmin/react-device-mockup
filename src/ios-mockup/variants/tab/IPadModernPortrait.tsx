import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
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
	const frameButtonPosition =
		screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonWidth - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingTop: frameButtonWidth - HALF_FRAME_WIDTH,
			paddingRight: frameButtonWidth - HALF_FRAME_WIDTH,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			backgroundColor: frameColor,
			borderRadius: bezelRadius,
			borderStyle: "solid",
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			overflow: "hidden",
		},
		screen: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
		},
		notchContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			width: "100%",
			height: getSizeWithRatio(24),
			alignItems: "center",
			pointerEvents: "none",
		},
		notchContainer: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: getSizeWithRatio(24),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
		swipeContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(20),
			alignItems: "center",
			justifyContent: "center",
			pointerEvents: "none",
		},
		swipeContainer: {
			display: "flex",
			flexDirection: "column",
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
			bottom: mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonWidth - HALF_FRAME_WIDTH,
			left: screenWidth - FRAME_WIDTH - HALF_FRAME_WIDTH,
			width: getSizeWithRatio(60),
			height: frameButtonWidth,
			backgroundColor: frameColor,
		},
	});
};

export default function IPadModernPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		frameColor,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(
		() => getStyles(props.screenWidth, frameColor, statusbarColor),
		[props.screenWidth, frameColor, statusbarColor],
	);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && <div style={styles.notchContainer} />}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
						{props.children}
					</div>
					{hideNavigationBar === false && transparentNavigationBar === false && (
						<div style={styles.swipeContainer}>
							<div style={styles.swipeBar} />
						</div>
					)}
				</div>
				{hideStatusBar && <div style={styles.notchContainerFullScreen} />}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			<div style={styles.volumeUp} />
			<div style={styles.volumeDown} />
			<div style={styles.power} />
		</div>
	);
}
