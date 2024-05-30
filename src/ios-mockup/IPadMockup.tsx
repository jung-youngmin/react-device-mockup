import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useMemo } from "react";
import IPadLegacyLandscape from "./variants/tab/IPadLegacyLandscape";
import IPadLegacyPortrait from "./variants/tab/IPadLegacyPortrait";
import IPadModernLandscape from "./variants/tab/IPadModernLandscape";
import IPadModernPortrait from "./variants/tab/IPadModernPortrait";

interface IiPadMockupProps {
	readonly screenWidth: number;
	/** default: "modern" */
	readonly screenType?: "legacy" | "modern";
	/** default: false */
	readonly isLandscape?: boolean;
	readonly containerStlye?: CSSProperties;
	/** default: "#666666" */
	readonly frameColor?: Property.Color;
	/** default: false */
	readonly frameOnly?: boolean;
	/** default: "#CCCCCC" */
	readonly statusbarColor?: Property.Color;
	/** default: false */
	readonly hideStatusBar?: boolean;
	/** default: false */
	readonly transparentNavBar?: boolean;
	/** default: false */
	readonly hideNavBar?: boolean;
}

export type IPadMockupProps = PropsWithChildren<IiPadMockupProps>;
export default function IPadMockup(props: IPadMockupProps) {
	const {
		screenWidth,
		screenType = "modern",
		isLandscape = false,
		frameColor = "#666666",
		frameOnly = false,
		statusbarColor = "#CCCCCC",
		hideStatusBar = false,
		transparentNavBar = false,
		hideNavBar = false,
	} = props;
	// const screenType = useMemo(
	// 	() => (props.screenType === undefined ? "modern" : props.screenType),
	// 	[props.screenType],
	// );

	// const isLandscape = useMemo(
	// 	() => (props.isLandscape === undefined ? false : props.isLandscape),
	// 	[props.isLandscape],
	// );

	// const frameColor = useMemo(
	// 	() => (props.frameColor === undefined ? "#666666" : props.frameColor),
	// 	[props.frameColor],
	// );

	// const statusbarColor = useMemo(
	// 	() => (props.statusbarColor === undefined ? "#CCCCCC" : props.statusbarColor),
	// 	[props.statusbarColor],
	// );

	// const hideStatusBar = useMemo(
	// 	() => (props.hideStatusBar === undefined ? false : props.hideStatusBar),
	// 	[props.hideStatusBar],
	// );

	// const transparentNavigationBar = useMemo(
	// 	() => (props.transparentNavBar === undefined ? false : props.transparentNavBar),
	// 	[props.transparentNavBar],
	// );

	// const hideNavigationBar = useMemo(
	// 	() => (props.hideNavBar === undefined ? false : props.hideNavBar),
	// 	[props.hideNavBar],
	// );

	const Mockup = useMemo(() => {
		switch (screenType) {
			case "legacy":
				// 무시
				// hideNavigationBar,
				// transparentNavigationBar,
				if (isLandscape) {
					return IPadLegacyLandscape;
				}
				return IPadLegacyPortrait;
			case "modern":
			default:
				if (isLandscape) {
					return IPadModernLandscape;
				}
				return IPadModernPortrait;
		}
	}, [isLandscape, screenType]);

	return (
		<div style={props.containerStlye}>
			<Mockup
				screenWidth={screenWidth}
				frameColor={frameColor}
				frameOnly={frameOnly}
				statusbarColor={statusbarColor}
				hideStatusBar={hideStatusBar}
				transparentNavigationBar={transparentNavBar}
				hideNavigationBar={hideNavBar}>
				{props.children}
			</Mockup>
		</div>
	);
}
