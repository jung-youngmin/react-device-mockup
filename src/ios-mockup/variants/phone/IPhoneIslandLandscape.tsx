import { Property } from "csstype";
import { PropsWithChildren, useMemo } from "react";
import { IIosMockupVariantProps, StyleSheet } from "../../../shared-types/variants-interface";

export default function IPhoneIslandLandscape(props: PropsWithChildren<IIosMockupVariantProps>) {
	const {
		frameColor,
		statusbarColor,
		hideStatusBar,
		hideNavigationBar,
		transparentNavigationBar,
	} = props;
	const styles = useMemo(() => {
		return getStyles(props.screenWidth, frameColor, statusbarColor);
	}, [props.screenWidth, frameColor, statusbarColor]);

	return (
		<div style={styles.container}>
			{/* frame */}
			<div style={styles.frame}>
				{/* screen */}
				<div style={styles.screen}>
					{hideStatusBar === false && (
						<div style={styles.notchContainer}>
							<div style={styles.island}></div>
						</div>
					)}
					{/* screen content */}
					<div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
						<div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
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
					<div style={styles.notchContainerFullScreen}>
						<div style={styles.island}></div>
					</div>
				)}
				{hideNavigationBar === false && transparentNavigationBar && (
					<div style={styles.swipeContainerFullScreen}>
						<div style={styles.swipeBar} />
					</div>
				)}
			</div>
			<div style={styles.silenceSwitch} />
			<div style={styles.volumeUp} />
			<div style={styles.volumeDown} />
			<div style={styles.powerPortrait} />
		</div>
	);
}

const getStyles = (
	screenWidth: number,
	frameColor: Property.Color,
	statusbarColor: Property.Color,
) => {
	const getSizeWithRatio = (size: number) => {
		const sizeRatio = Math.floor((screenWidth * size) / 844);
		return Math.max(sizeRatio, 1);
	};

	const FRAME_WIDTH = getSizeWithRatio(10);
	const HALF_FRAME_WIDTH = Math.floor(FRAME_WIDTH / 2);

	const mHeight = Math.floor((screenWidth / 19.5) * 9);
	const widthAndFrame = screenWidth + FRAME_WIDTH * 2;
	const heightAndFrame = mHeight + FRAME_WIDTH * 2;

	const bezelRadius = getSizeWithRatio(68);

	const frameButtonHeight = Math.floor(FRAME_WIDTH * 0.9);
	const frameButtonPosition =
		mHeight + FRAME_WIDTH + HALF_FRAME_WIDTH + frameButtonHeight - HALF_FRAME_WIDTH;

	return StyleSheet.create({
		container: {
			display: "flex",
			position: "relative",
			width: widthAndFrame,
			height: heightAndFrame,
			paddingTop: frameButtonHeight - HALF_FRAME_WIDTH,
			paddingBottom: frameButtonHeight - HALF_FRAME_WIDTH,
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
			flexDirection: "row",
			position: "relative",
			width: screenWidth,
			height: mHeight,
			backgroundColor: "whitesmoke",
			overflow: "hidden",
		},
		safeAreaRight: {
			width: getSizeWithRatio(59),
			height: "100%",
			backgroundColor: statusbarColor,
		},
		notchContainerFullScreen: {
			display: "flex",
			flexDirection: "column",
			position: "absolute",
			width: getSizeWithRatio(59),
			height: "100%",
			justifyContent: "center",
			pointerEvents: "none",
		},
		notchContainer: {
			display: "flex",
			flexDirection: "column",
			width: getSizeWithRatio(59),
			height: "100%",
			backgroundColor: statusbarColor,
			justifyContent: "center",
		},
		island: {
			width: getSizeWithRatio(35),
			height: getSizeWithRatio(128),
			backgroundColor: frameColor,
			borderRadius: getSizeWithRatio(50),
			marginLeft: getSizeWithRatio(13),
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
			width: getSizeWithRatio(230),
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
			left: getSizeWithRatio(280),
			bottom: frameButtonPosition,
			width: getSizeWithRatio(105),
			height: frameButtonHeight,
			backgroundColor: frameColor,
		},
	});
};
