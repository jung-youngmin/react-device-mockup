import React from "react";
import { Property } from "csstype";

export interface IAndroidMockupVariantProps {
	readonly screenWidth: number;
	/** default: true */
	readonly screenRounded: boolean;
	/** default: "#666666" */
	readonly frameColor: Property.Color;
	/** default: "#CCCCCC" */
	readonly statusbarColor: Property.Color;
	/** default: "#CCCCCC" */
	readonly navigationBarcolor: Property.Color;
	/** default: "swipe" */
	readonly navigationBar: "swipe" | "bhr" | "rhb";
	/** default: false */
	readonly hideStatusBar: boolean;
	/** default: false */
	readonly transparentNavigationBar: boolean;
	/** default: false */
	readonly hideNavigationBar: boolean;
}

type CSSProperties = {
	[key: string]: React.CSSProperties;
};

export class StyleSheet {
	static create<Styles extends CSSProperties>(styles: Styles): Styles {
		return styles;
	}
}
