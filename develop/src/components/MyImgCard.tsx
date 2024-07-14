import { useCallback, useEffect, useState } from "react";
import demoStyle from "../demo/demo.module.css";
import ButtonGroup from "./ButtonGroup";
import ColorButton from "./ColorButton";

export interface IMyImgCardProps {
	readonly uploadRef: React.RefObject<HTMLInputElement>;
	readonly onChangeImg: (img: string | ArrayBuffer | null) => void;
	readonly onChangeResizeMode: (
		resizeMode: "fill" | "contain" | "cover" | "none" | "scale-down",
	) => void;
}

export default function MyImgCard(props: IMyImgCardProps) {
	const { onChangeImg, onChangeResizeMode } = props;
	const [resizeMode, setResizeMode] = useState<
		"fill" | "contain" | "cover" | "none" | "scale-down"
	>("fill");

	const saveImgFile = useCallback(() => {
		if (props.uploadRef.current === null || props.uploadRef.current.files === null) {
			return;
		}

		const file = props.uploadRef.current.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			onChangeImg(reader.result);
		};
	}, [onChangeImg, props.uploadRef]);

	useEffect(() => {
		onChangeResizeMode(resizeMode);
	}, [onChangeResizeMode, resizeMode]);

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
			<div className={`${demoStyle.card} ${demoStyle.flexColWrap} ${demoStyle.pt8}`}>
				<input
					ref={props.uploadRef}
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
						props.uploadRef.current?.click();
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
			</div>
		</div>
	);
}
