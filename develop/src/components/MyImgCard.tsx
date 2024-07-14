import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import demoStyle from "../demo/demo.module.css";
import ButtonGroup from "./ButtonGroup";
import ColorButton from "./ColorButton";

export interface IMyImgCardProps {
	// readonly uploadRef: React.RefObject<HTMLInputElement>;
	// readonly imgRef: React.RefObject<HTMLImageElement>;
	readonly onChangeImg: (img: string | ArrayBuffer | null) => void;
	readonly onChangeResizeMode: (
		resizeMode: "fill" | "contain" | "cover" | "none" | "scale-down",
	) => void;
	readonly onPressArrow: (direction: "up" | "bottom" | "left" | "right" | "reset") => void;
}

export default function MyImgCard(props: IMyImgCardProps) {
	const { onChangeImg, onChangeResizeMode } = props;
	const [resizeMode, setResizeMode] = useState<
		"fill" | "contain" | "cover" | "none" | "scale-down"
	>("fill");

	const uploadRef = useRef<HTMLInputElement>(null);

	const saveImgFile = useCallback(() => {
		if (uploadRef.current === null || uploadRef.current.files === null) {
			return;
		}

		const file = uploadRef.current.files[0];
		if (file === undefined) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			onChangeImg(reader.result);
		};
	}, [onChangeImg]);

	useEffect(() => {
		onChangeResizeMode(resizeMode);
	}, [onChangeResizeMode, resizeMode]);

	const arrowStyle: CSSProperties = {
		width: 40,
		height: 40,
		justifyContent: "center",
	};

	return (
		<div>
			<h3 className={demoStyle.cardTitle}>Use My Img for Demo</h3>
			<div
				className={demoStyle.subLabel}
				style={{
					display: "block",
					marginLeft: 8,
					marginBottom: 8,
				}}>
				The photo demo is <strong>not included</strong> in the npm package. (only for this
				site)
				<br />
				Your Photos only works in your local browser, ⚠️ It is{" "}
				<strong>not transmitted or stored</strong> anywhere.
			</div>
			<div className={`${demoStyle.card} ${demoStyle.flexColWrap}`}>
				<input
					ref={uploadRef}
					style={{ display: "none" }}
					type="file"
					accept="image/*"
					onChange={saveImgFile}
				/>
				<ColorButton
					label="🏞️ Use My Image"
					isActive={false}
					showIcon={false}
					style={{
						paddingTop: 8,
						paddingBottom: 8,
						justifyContent: "center",
					}}
					onClick={() => {
						uploadRef.current?.click();
					}}
				/>
				<ButtonGroup
					className={demoStyle["mt8"]}
					allowButtonWrap
					title="Resize mode"
					buttonSize={80}
					buttonData={[
						{
							label: "fill",
							isActive: resizeMode === "fill",
							onClick: () => setResizeMode("fill"),
						},
						{
							label: "contain",
							isActive: resizeMode === "contain",
							onClick: () => setResizeMode("contain"),
						},
						{
							label: "cover",
							isActive: resizeMode === "cover",
							onClick: () => setResizeMode("cover"),
						},
						{
							label: "none",
							isActive: resizeMode === "none",
							onClick: () => setResizeMode("none"),
						},
						{
							label: "scale-down",
							isActive: resizeMode === "scale-down",
							onClick: () => setResizeMode("scale-down"),
						},
					]}
				/>
				<div
					style={{
						width: 150,
						height: 150,
						backgroundColor: "#FCFCFC",
						borderRadius: 30,
						marginTop: 16,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<ColorButton
						label="⬆️"
						isActive={false}
						showIcon={false}
						style={arrowStyle}
						onClick={() => props.onPressArrow("up")}
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							marginTop: 8,
							marginBottom: 8,
						}}>
						<ColorButton
							label="⬅️"
							isActive={false}
							showIcon={false}
							style={arrowStyle}
							onClick={() => props.onPressArrow("left")}
						/>
						<ColorButton
							label="🔵"
							isActive={false}
							showIcon={false}
							style={{ ...arrowStyle, marginLeft: 8, marginRight: 8 }}
							onClick={() => props.onPressArrow("reset")}
						/>
						<ColorButton
							label="➡️"
							isActive={false}
							showIcon={false}
							style={arrowStyle}
							onClick={() => props.onPressArrow("right")}
						/>
					</div>
					<ColorButton
						label="⬇️"
						isActive={false}
						showIcon={false}
						style={{
							width: 40,
							height: 40,
							justifyContent: "center",
						}}
						onClick={() => props.onPressArrow("bottom")}
					/>
				</div>
			</div>
		</div>
	);
}
