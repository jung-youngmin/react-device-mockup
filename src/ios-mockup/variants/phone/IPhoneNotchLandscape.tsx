import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 844);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(14);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 19.5) * 9);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const bezelRadius = getSizeWithRatio(64);

	const frameButtonHeight = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition =
		mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonHeight - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			flexDirection: "row",
			width: widthAndFrame,
			height: heightAndFrame,
			// borderRadius: bezelRadius,
			// backgroundColor: frameColor,
			paddingTop: frameButtonHeight - HALF_FRAME_WIDTH,
			paddingBottom: frameButtonHeight - HALF_FRAME_WIDTH,
		},
		frame: {
			display: "flex",
			flexDirection: "column",
			position: "relative",
			boxSizing: "border-box",
			backgroundColor: frameColor,
			// width: widthAndFrame,
			// height: heightAndFrame,
			borderRadius: bezelRadius,
			borderStyle: "solid",
			borderWidth: FRAME_WIDTH,
			borderColor: frameColor,
			overflow: "hidden",
		},
		screen: {
			display: "flex",
			flexDirection: "row",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		safeAreaRight: {
			width: getSizeWithRatio(44),
			height: "100%",
			backgroundColor: statusbarColor,
		},
		notchContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			width: getSizeWithRatio(44),
			height: "100%",
			justifyContent: "center",
			pointerEvents: "none",
		},
		notchContainer: {
			display: "flex",
			flexDirection: "column",
			width: getSizeWithRatio(44),
			height: "100%",
			backgroundColor: statusbarColor,
			justifyContent: "center",
		},
		notch: {
			width: getSizeWithRatio(31),
			height: getSizeWithRatio(160),
			backgroundColor: frameColor,
			borderTopRightRadius: getSizeWithRatio(20),
			borderBottomRightRadius: getSizeWithRatio(20),
		},
		swipeContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			bottom: 0,
			width: "100%",
			height: getSizeWithRatio(21),
			alignItems: "center",
			justifyContent: "flex-end",
			pointerEvents: "none",
		},
		swipeContainer: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			height: getSizeWithRatio(21),
			backgroundColor: statusbarColor,
			alignItems: "center",
			justifyContent: "flex-end",
		},
		swipeBar: {
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(100),
			width: "30%",
			height: getSizeWithRatio(7),
			marginBottom: getSizeWithRatio(5),
		},
		silenceSwitch: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(165),
			top: frameButtonPosition,
			width: getSizeWithRatio(34),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeUp: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(230),
			top: frameButtonPosition,
			width: getSizeWithRatio(65),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		volumeDown: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(315),
			top: frameButtonPosition,
			width: getSizeWithRatio(65),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		powerPortrait: {
			position: "absolute",
			borderRadius: FRAME_WIDTH,
			left: getSizeWithRatio(250),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(105),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
		notchPad: {
			alignSelf: "center",
			position: "absolute",
			left: HALF_FRAME_WIDTH,
			width: getSizeWithRatio(20),
			height: getSizeWithRatio(160),
			backgroundColor: frameColor,
		},
	});
};

export default function IPhoneNotchLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
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
					{hideStatusBar === false && (
						<div style={styles.notchContainer}>
							<div style={styles.notch} />
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
						<div
							style={{
								display: "flex",
								flex: 1,
								flexDirection: "column",
								overflow: "hidden",
							}}>
							{props.children}
						</div>
						{hideNavigationBar === false && transparentNavigationBar === false && (
							<div style={styles.swipeContainer}>
								<div style={styles.swipeBar} />
							</div>
						)}
					</div>
					{hideStatusBar === false && <div style={styles.safeAreaRight} />}
				</div>
				{hideStatusBar && (
					<div
						// TODO
						// pointerEvents="none"
						style={styles.notchContainerFullScreen}>
						<div style={styles.notch} />
					</div>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div
						// TODO
						// pointerEvents="none"
						style={styles.swipeContainerFullScreen}>
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
