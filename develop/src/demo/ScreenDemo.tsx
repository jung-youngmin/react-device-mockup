import React, { CSSProperties, useMemo } from "react";
import demoStyle from "./demo.module.css";

const _ScreenDemo = ({
	screenWidth,
	isLandscape,
	style,
}: {
	screenWidth: number;
	isLandscape: boolean;
	style?: CSSProperties;
}) => {
	const iconStyle = useMemo<CSSProperties>(() => {
		const size = isLandscape ? Math.floor(screenWidth / 9) : Math.floor(screenWidth / 5);
		return {
			width: size,
			height: size,
			backgroundColor: "#777777",
			borderRadius: size / 4,
			marginTop: size / 2,
		};
	}, [screenWidth, isLandscape]);

	const containerPadding = useMemo<CSSProperties>(() => {
		const paddingSize = Math.floor(screenWidth / 20);
		return {
			paddingLeft: paddingSize,
			paddingRight: paddingSize,
		};
	}, [screenWidth]);

	return (
		<div className={demoStyle.screenContainer} style={{ ...containerPadding, ...style }}>
			<div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
				<div className={demoStyle.appRow}>
					<div style={iconStyle} />
					<div style={iconStyle} />
					<div style={iconStyle} />
					<div style={iconStyle} />
				</div>
				<div className={demoStyle.appRow}>
					<div style={iconStyle} />
					<div style={iconStyle} />
					<div style={iconStyle} />
					<div style={iconStyle} />
				</div>
				<div className={demoStyle.appRow}>
					<div style={iconStyle} />
					<div style={iconStyle} />
					<div style={iconStyle} />
					<div style={iconStyle} />
				</div>
			</div>
		</div>
	);
};
const ScreenDemo = React.memo(_ScreenDemo);
export default ScreenDemo;
