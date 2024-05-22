import moment from "moment";
import React, { CSSProperties, Suspense, useMemo } from "react";
import logo from "../logo.svg";
import demoStyle from "./demo.module.css";

interface IPackageInfoResp {
	readonly name: string;
	readonly "dist-tags": { readonly latest: string };
	readonly time: {
		readonly created: string;
		readonly modified: string;
	};
	readonly license: string;
	readonly homepage: string;
}
interface IPackageInfo {
	readonly packageName: string;
	readonly latestVer: string;
	readonly versionDate: string;
	readonly license: string;
	readonly githubLink: string;
}

const getPackageInfo = (apiResult: IPackageInfoResp) => {
	const { name, time, license, homepage, "dist-tags": distTags } = apiResult;
	const packageInfo: IPackageInfo = {
		packageName: "✅ " + name,
		latestVer: distTags.latest,
		versionDate: time.modified,
		license,
		githubLink: homepage,
	};
	return packageInfo;
};

const fetchReactPackage = () => {
	let reactInfo: IPackageInfo | undefined;
	const suspender = fetch("/react-device-mockup").then(response => {
		if (response.ok) {
			response.json().then((res: IPackageInfoResp) => {
				reactInfo = getPackageInfo(res);
			});
		}
	});

	return {
		read: () => {
			if (reactInfo === undefined) {
				throw suspender;
			} else {
				return reactInfo;
			}
		},
	};
};

const fetchRnPackage = () => {
	let reactInfo: IPackageInfo | undefined;
	const suspender = fetch("/react-native-device-mockup").then(response => {
		if (response.ok) {
			response.json().then((res: IPackageInfoResp) => {
				reactInfo = getPackageInfo(res);
			});
		} else {
			reactInfo = {
				packageName: "🙁 something went wrong",
				latestVer: "-",
				versionDate: "-",
				license: "-",
				githubLink: "-",
			};
		}
	});

	return {
		read: () => {
			if (reactInfo === undefined) {
				throw suspender;
			} else {
				return reactInfo;
			}
		},
	};
};

export default React.memo(_PackageDemo);
function _PackageDemo() {
	const DEFAULT_INFO = {
		packageName: "📦",
		latestVer: "-",
		versionDate: "-",
		license: "-",
		githubLink: "-",
	};
	return (
		<div className={demoStyle.flexRowWrap} style={{ justifyContent: "center", marginTop: 16 }}>
			<Suspense
				fallback={
					<>
						<PackageInfoComponent type="fetching" packageInfo={DEFAULT_INFO} />
						<PackageInfoComponent type="fetching" packageInfo={DEFAULT_INFO} />
					</>
				}>
				<PackageInfo type="React" data={fetchReactPackage()} />
				<PackageInfo type="React Native" data={fetchRnPackage()} />
			</Suspense>
		</div>
	);
}

const PackageInfo = (props: {
	readonly type: "React" | "React Native";
	readonly data: { readonly read: () => IPackageInfo };
	readonly style?: CSSProperties;
}) => {
	const packageInfo = props.data.read();

	return <PackageInfoComponent type={props.type} packageInfo={packageInfo} style={props.style} />;
};

const PackageInfoComponent = (props: {
	readonly type: "fetching" | "React" | "React Native";
	readonly packageInfo: IPackageInfo;
	readonly style?: CSSProperties;
}) => {
	const subLabelStlye = useMemo<CSSProperties>(() => {
		return {
			color: "slategray",
		};
	}, []);

	const mainLabelStlye = useMemo<CSSProperties>(() => {
		return {
			color: "#555555",
			fontSize: "1.3em",
			fontWeight: 500,
		};
	}, []);

	const isValidLink = useMemo(() => {
		return props.packageInfo.githubLink.startsWith("https://github.com");
	}, [props.packageInfo.githubLink]);

	const isValidDate = useMemo(() => {
		return moment(props.packageInfo.versionDate).isValid();
	}, [props.packageInfo.versionDate]);

	return (
		<div
			className={demoStyle.mh8}
			style={{
				display: "flex",
				flexDirection: "column",
				boxSizing: "border-box",
				maxWidth: 360,
				minWidth: 280,
				width: "90vw",
				opacity: props.type === "fetching" ? 0.6 : 1,
			}}>
			<div
				className={demoStyle.cardTitle}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginRight: 32,
					height: 32,
					marginBottom: 0,
				}}>
				<img src={logo} width={36} alt="react_logo" />
				<h4 style={{ margin: 0, whiteSpace: "nowrap" }}>{props.type}</h4>
			</div>
			<div
				className={demoStyle.card}
				style={{ display: "flex", flexDirection: "column", flex: 1, paddingTop: 8 }}>
				<h2 style={{ margin: 0 }}>{props.packageInfo.packageName}</h2>
				<div style={{ display: "flex", flexDirection: "column", marginLeft: 4 }}>
					<div className={demoStyle.flexRowWrap}>
						<div className={demoStyle.mt8} style={{ flex: 1 }}>
							<div style={subLabelStlye}>version</div>
							<div style={mainLabelStlye}>{props.packageInfo.latestVer}</div>
						</div>
						<div className={demoStyle.mt8} style={{ flex: 1 }}>
							<div style={subLabelStlye}>last publish</div>
							<div style={mainLabelStlye}>
								{isValidDate
									? moment(props.packageInfo.versionDate).fromNow()
									: props.packageInfo.versionDate}
							</div>
						</div>
					</div>
					<div className={demoStyle.flexRowWrap + " " + demoStyle.mt8}>
						<div className={demoStyle.mt8} style={{ flex: 1 }}>
							<div style={subLabelStlye}>repository</div>
							{isValidLink ? (
								<a
									href={props.packageInfo.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									className={demoStyle.repoLink}
									style={{
										display: "block",
										fontSize: mainLabelStlye.fontSize,
									}}>
									{"github"}
								</a>
							) : (
								<div style={mainLabelStlye}>{props.packageInfo.githubLink}</div>
							)}
						</div>
						<div className={demoStyle.mt8} style={{ flex: 1 }}>
							<div style={subLabelStlye}>license</div>
							<div style={mainLabelStlye}>{props.packageInfo.license}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
