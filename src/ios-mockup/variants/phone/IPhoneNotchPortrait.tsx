import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 390);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(14);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 9) * 19.5);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const bezelRadius = getSizeWithRatio(64);

	const frameButtonWidth = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition =
		screenWidth + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonWidth - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			flexDirection: "column",
			boxSizing: "content-box",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingRight: frameButtonWidth - HALF_FRAME_WIDTH,
			paddingLeft: frameButtonWidth - HALF_FRAME_WIDTH,
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
			height: getSizeWithRatio(44),
			alignItems: "center",
			pointerEvents: "none",
		},
		notchContainer: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: getSizeWithRatio(44),
			backgroundColor: statusbarColor,
			alignItems: "center",
		},
		notch: {
			width: getSizeWithRatio(160),
			height: getSizeWithRatio(31),
			backgroundColor: frameColor,
			borderBottomLeftRadius: getSizeWithRatio(20),
			borderBottomRightRadius: getSizeWithRatio(20),
		},
		swipeContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(34),
			alignItems: "center",
			justifyContent: "flex-end",
			pointerEvents: "none",
		},
		swipeContainer: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: getSizeWithRatio(34),
			backgroundColor: statusbarColor,
			alignItems: "center",
			justifyContent: "flex-end",
		},
		swipeBar: {
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(100),
			width: "35%",
			height: getSizeWithRatio(7),
			marginBottom: getSizeWithRatio(10),
		},
		silenceSwitch: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(165),
			right: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(34),
			backgroundColor: frameColor,
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(230),
			right: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(65),
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(315),
			right: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(65),
			backgroundColor: frameColor,
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			top: getSizeWithRatio(250),
			left: frameButtonPosition,
			width: frameButtonWidth,
			height: getSizeWithRatio(105),
			backgroundColor: frameColor,
		},
		notchPad: {
			alignSelf: "center",
			position: "absolute",
			top: HALF_FRAME_WIDTH,
			width: getSizeWithRatio(160),
			height: getSizeWithRatio(20),
			backgroundColor: frameColor,
		},
	});
};

export default function IPhoneNotchPortrait(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		screenWidth,
		frameColor,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(
		() => getStyles(screenWidth, frameColor, statusbarColor),
		[screenWidth, frameColor, statusbarColor],
	);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && (
						<div style={styles.notchContainer}>
							<div style={styles.notch} />
						</div>
					)}
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
				{hideStatusBar && (
					<div style={styles.notchContainerFullScreen}>
						<div style={styles.notch} />
					</div>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			<div style={styles.notchPad} />
			<div style={styles.silenceSwitch} />
			<div style={styles.volumeUp} />
			<div style={styles.volumeDown} />
			<div style={styles.powerPortrait} />
		</div>
	);
}
