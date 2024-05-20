import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useMemo } from "react";
import IPhoneNotchPortrait from "./variants/phone/IPhoneNotchPortrait";
import IPhoneNotchLandscape from "./variants/phone/IPhoneNotchLandscape";
import IPhoneIslandPortrait from "./variants/phone/IPhoneIslandPortrait";
import IPhoneIslandLandscape from "./variants/phone/IPhoneIslandLandscape";
import IPhoneLegacyPortrait from "./variants/phone/IPhoneLegacyPortrait";
import IPhoneLegacyLandscape from "./variants/phone/IPhoneLegacyLandscape";

interface IiPhoneMockupProps {
	readonly screenWidth: number;
	/** default: "island" */
	readonly screenType?: "legacy" | "notch" | "island";
	/** default: false */
	readonly isLandscape?: boolean;
	readonly containerStlye?: CSSProperties;
	/** default: "#666666" */
	readonly frameColor?: Property.Color;
	/** default: "#CCCCCC" */
	readonly statusbarColor?: Property.Color;
	/** default: false */
	readonly hideStatusBar?: boolean;
	/** default: false */
	readonly transparentNavBar?: boolean;
	/** default: false */
	readonly hideNavBar?: boolean;
}

export type IPhoneMockupProps = PropsWithChildren<IiPhoneMockupProps>;
export default function IPhoneMockup(props: IPhoneMockupProps) {
	const screenType = useMemo(
		() => (props.screenType === undefined ? "island" : props.screenType),
		[props.screenType],
	);

	const isLandscape = useMemo(
		() => (props.isLandscape === undefined ? false : props.isLandscape),
		[props.isLandscape],
	);

	const frameColor = useMemo(
		() => (props.frameColor === undefined ? "#666666" : props.frameColor),
		[props.frameColor],
	);

	const statusbarColor = useMemo(
		() => (props.statusbarColor === undefined ? "#CCCCCC" : props.statusbarColor),
		[props.statusbarColor],
	);

	const hideStatusBar = useMemo(
		() => (props.hideStatusBar === undefined ? false : props.hideStatusBar),
		[props.hideStatusBar],
	);

	const transparentNavigationBar = useMemo(
		() => (props.transparentNavBar === undefined ? false : props.transparentNavBar),
		[props.transparentNavBar],
	);

	const hideNavigationBar = useMemo(
		() => (props.hideNavBar === undefined ? false : props.hideNavBar),
		[props.hideNavBar],
	);

	const Mockup = useMemo(() => {
		switch (screenType) {
			case "legacy":
				// 무시
				// hideNavigationBar,
				// transparentNavigationBar,
				if (isLandscape) {
					// hideStatusBar 무시
					return IPhoneLegacyLandscape;
				}
				return IPhoneLegacyPortrait;

			case "notch":
				if (isLandscape) {
					return IPhoneNotchLandscape;
				}
				return IPhoneNotchPortrait;
			case "island":
			default:
				if (isLandscape) {
					return IPhoneIslandLandscape;
				}
				return IPhoneIslandPortrait;
		}
	}, [isLandscape, screenType]);

	return (
		<div style={props.containerStlye}>
			<Mockup
				screenWidth={props.screenWidth}
				frameColor={frameColor}
				statusbarColor={statusbarColor}
				hideStatusBar={hideStatusBar}
				transparentNavigationBar={transparentNavigationBar}
				hideNavigationBar={hideNavigationBar}>
				{props.children}
			</Mockup>
		</div>
	);
}
