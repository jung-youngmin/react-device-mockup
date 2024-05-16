import React, { PropsWithChildren, useMemo } from "react";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";
import IPadLegacyPortrait from "./variants/tab/IPadLegacyPortrait";
import IPadLegacyLandscape from "./variants/tab/IPadLegacyLandscape";
import IPadModernPortrait from "./variants/tab/IPadModernPortrait";
import IPadModernLandscape from "./variants/tab/IPadModernLandscape";

interface IiPadMockupProps {
	readonly screenWidth: number;
	/** default: "modern" */
	readonly screenType?: "legacy" | "modern";
	/** default: false */
	readonly isLandscape?: boolean;
	readonly containerStlye?: StyleProp<ViewStyle>;
	/** default: "#666666" */
	readonly frameColor?: ColorValue;
	/** default: "#CCCCCC" */
	readonly statusbarColor?: ColorValue;
	/** default: false */
	readonly hideStatusBar?: boolean;
	/** default: false */
	readonly transparentNavBar?: boolean;
	/** default: false */
	readonly hideNavBar?: boolean;
}

export type IPadMockupProps = PropsWithChildren<IiPadMockupProps>;
export default function IPadMockup(props: IPadMockupProps) {
	const screenType = useMemo(() => {
		return props.screenType === undefined ? "modern" : props.screenType;
	}, [props.screenType]);

	const isLandscape = useMemo(() => {
		return props.isLandscape === undefined ? false : props.isLandscape;
	}, [props.isLandscape]);

	const frameColor = useMemo(() => {
		return props.frameColor === undefined ? "#666666" : props.frameColor;
	}, [props.frameColor]);

	const statusbarColor = useMemo(() => {
		return props.statusbarColor === undefined ? "#CCCCCC" : props.statusbarColor;
	}, [props.statusbarColor]);

	const hideStatusBar = useMemo(() => {
		return props.hideStatusBar === undefined ? false : props.hideStatusBar;
	}, [props.hideStatusBar]);

	const transparentNavigationBar = useMemo(() => {
		return props.transparentNavBar === undefined ? false : props.transparentNavBar;
	}, [props.transparentNavBar]);

	const hideNavigationBar = useMemo(() => {
		return props.hideNavBar === undefined ? false : props.hideNavBar;
	}, [props.hideNavBar]);

	const Mockup = useMemo(() => {
		switch (screenType) {
			case "legacy":
				// 무시
				// hideNavigationBar,
				// transparentNavigationBar,
				if (isLandscape) {
					return IPadLegacyLandscape;
				} else {
					return IPadLegacyPortrait;
				}
			case "modern":
			default:
				if (isLandscape) {
					return IPadModernLandscape;
				} else {
					return IPadModernPortrait;
				}
		}
	}, [isLandscape, screenType]);

	return (
		<View style={props.containerStlye}>
			<Mockup
				screenWidth={props.screenWidth}
				frameColor={frameColor}
				statusbarColor={statusbarColor}
				hideStatusBar={hideStatusBar}
				transparentNavigationBar={transparentNavigationBar}
				hideNavigationBar={hideNavigationBar}>
				{props.children}
			</Mockup>
		</View>
	);
}
