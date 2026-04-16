export type CardStyle = 'gradient' | 'solid' | 'outline';
export type CardColor = 'blue' | 'green' | 'indigo' | 'cyan' | 'purple' | 'amber' | 'red' | 'slate';
export type StageCardMode = 'standard' | 'pill';

export interface IStageCardConfig {
	title: string;
	line1: string;
	line2?: string;
	line3?: string;
	line1LinkUrl?: string;
	line2LinkUrl?: string;
	line3LinkUrl?: string;
	line1EnableLink?: boolean;
	line2EnableLink?: boolean;
	line3EnableLink?: boolean;
	mode?: StageCardMode;
	style?: CardStyle;
	color?: CardColor;
	linkUrl?: string;
	enableLink?: boolean;
}

export interface IBulletConfig {
	text: string;
	linkUrl?: string;
	enableLink?: boolean;
}

export interface IPremiumCardConfig {
	icon: string;
	title: string;
	hint: string;
	bullets: IBulletConfig[];
	style?: CardStyle;
	color?: CardColor;
	linkUrl?: string;
	enableLink?: boolean;
}

export interface ICmmiBoardProps {
	description: string;
	title: string;
	transversalText: string;
	allowLinks: boolean;
	stageCards: IStageCardConfig[];
	premiumCards: IPremiumCardConfig[];
}
