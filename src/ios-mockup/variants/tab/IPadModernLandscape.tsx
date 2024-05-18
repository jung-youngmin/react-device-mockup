import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 1194);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(35);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 4) * 3);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const bezelRadius = getSizeWithRatio(50);

	const frameButtonHeight = Math.floor(FRAME_WIDTH * 0.65);
	const frameButtonPosition =
		mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonHeight - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingTop: frameButtonHeight - HALF_FRAME_WIDTH,
			paddingLeft: frameButtonHeight - HALF_FRAME_WIDTH,
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
			overflow: "hidden",
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
			boxSizing: "border-box",
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(20),
			paddingTop: getSizeWithRatio(4),
			alignItems: "center",
			justifyContent: "center",
			pointerEvents: "none",
		},
		swipeContainer: {
			display: "flex",
			flexDirection: "column",
			boxSizing: "border-box",
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
			width: "25%",
			height: getSizeWithRatio(8),
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(75),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(50),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(130),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(50),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		power: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			right:
				screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonHeight - HALF_FRAME_WIDTH,
			bottom: mHeight - FRAME_WIDTH - HALF_FRAME_WIDTH,
			width: frameButtonHeight,
			height: getSizeWithRatio(60),
			backgroundColor: frameColor,
		},
	});
};

export default function IPadModernLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
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
