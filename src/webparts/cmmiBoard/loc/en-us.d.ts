declare interface ICmmiBoardWebPartStrings {
	PropertyPaneDescription: string;
	BasicGroupName: string;
	DescriptionFieldLabel: string;
	TitleFieldLabel: string;
	TransversalTextFieldLabel: string;
	AllowLinksFieldLabel: string;
	AllowLinksOnText: string;
	AllowLinksOffText: string;
	StageCardsJsonFieldLabel: string;
	PremiumCardsJsonFieldLabel: string;
}

declare module 'CmmiBoardWebPartStrings' {
	const strings: ICmmiBoardWebPartStrings;
	export = strings;
}
