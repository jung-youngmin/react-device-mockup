import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useMemo } from "react";
import AndroidPortrait from "./variants/phone/AndroidPortrait";
import AndroidLandscape from "./variants/phone/AndroidLandscape";

interface IAndroidMockupProps {
	readonly screenWidth: number;
	/** default: false */
	readonly noRoundedScreen?: boolean;
	/** default: false */
	readonly isLandscape?: boolean;
	readonly containerStlye?: CSSProperties;
	/** default: "#666666" */
	readonly frameColor?: Property.Color;
	/** default: "#CCCCCC" */
	readonly statusbarColor?: Property.Color;
	/** default: false */
	readonly hideStatusBar?: boolean;
	/** default: "swipe" */
	readonly navBar?: "swipe" | "bhr" | "rhb";
	/** default: "#CCCCCC" */
	readonly navBarcolor?: Property.Color;
	/** default: false */
	readonly transparentNavBar?: boolean;
	/** default: false */
	readonly hideNavBar?: boolean;
	/** default: false. Landscape only */
	readonly transparentCamArea?: boolean;
}

export type AndroidMockupProps = PropsWithChildren<IAndroidMockupProps>;
export default function AndroidMockup(props: AndroidMockupProps) {
	const noRoundedScreen = useMemo(
		() => (props.noRoundedScreen === undefined ? false : props.noRoundedScreen),
		[props.noRoundedScreen],
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

	const navigationBar = useMemo(
		() => (props.navBar === undefined ? "swipe" : props.navBar),
		[props.navBar],
	);

	const navigationBarcolor = useMemo(
		() => (props.navBarcolor === undefined ? "#CCCCCC" : props.navBarcolor),
		[props.navBarcolor],
	);

	const hideStatusBar = useMemo(
		() => (props.hideStatusBar === undefined ? false : props.hideStatusBar),
		[props.hideStatusBar],
	);

	const transparentCamArea = useMemo(
		() => (props.transparentCamArea === undefined ? false : props.transparentCamArea),
		[props.transparentCamArea],
	);

	const transparentNavigationBar = useMemo(
		() => (props.transparentNavBar === undefined ? false : props.transparentNavBar),
		[props.transparentNavBar],
	);

	const hideNavigationBar = useMemo(
		() => (props.hideNavBar === undefined ? false : props.hideNavBar),
		[props.hideNavBar],
	);

	return (
		<div style={props.containerStlye}>
			{isLandscape ? (
				<AndroidLandscape
					screenWidth={props.screenWidth}
					screenRounded={!noRoundedScreen}
					frameColor={frameColor}
					statusbarColor={statusbarColor}
					navigationBar={navigationBar}
					navigationBarcolor={navigationBarcolor}
					hideStatusBar={hideStatusBar}
					transparentCamArea={transparentCamArea}
					transparentNavigationBar={transparentNavigationBar}
					hideNavigationBar={hideNavigationBar}>
					{props.children}
				</AndroidLandscape>
			) : (
				<AndroidPortrait
					screenWidth={props.screenWidth}
					screenRounded={!noRoundedScreen}
					frameColor={frameColor}
					statusbarColor={statusbarColor}
					navigationBar={navigationBar}
					navigationBarcolor={navigationBarcolor}
					hideStatusBar={hideStatusBar}
					transparentNavigationBar={transparentNavigationBar}
					hideNavigationBar={hideNavigationBar}>
					{props.children}
				</AndroidPortrait>
			)}
		</div>
	);
}
