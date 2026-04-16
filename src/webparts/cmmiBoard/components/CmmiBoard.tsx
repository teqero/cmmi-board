import * as React from 'react';
import styles from './CmmiBoard.module.scss';
import { CardColor, CardStyle, IBulletConfig, ICmmiBoardProps, IPremiumCardConfig, IStageCardConfig } from './ICmmiBoardProps';

export default class CmmiBoard extends React.Component<ICmmiBoardProps> {
	private getToneClass(color?: CardColor): string {
		switch (color || 'blue') {
			case 'green':
				return styles.toneGreen;
			case 'indigo':
				return styles.toneIndigo;
			case 'cyan':
				return styles.toneCyan;
			case 'purple':
				return styles.tonePurple;
			case 'amber':
				return styles.toneAmber;
			case 'red':
				return styles.toneRed;
			case 'slate':
				return styles.toneSlate;
			default:
				return styles.toneBlue;
		}
	}

	private getStageStyleClass(styleType?: CardStyle): string {
		switch (styleType || 'gradient') {
			case 'solid':
				return styles.stageSolid;
			case 'outline':
				return styles.stageOutline;
			default:
				return styles.stageGradient;
		}
	}

	private getPremiumStyleClass(styleType?: CardStyle): string {
		switch (styleType || 'gradient') {
			case 'solid':
				return styles.premiumSolid;
			case 'outline':
				return styles.premiumOutline;
			default:
				return styles.premiumGradient;
		}
	}

	private isCardLinkEnabled(linkUrl?: string, enableLink?: boolean): boolean {
		return !!(this.props.allowLinks && linkUrl && enableLink !== false);
	}

	private isBulletLinkEnabled(linkUrl?: string, enableLink?: boolean): boolean {
		return !!(this.props.allowLinks && linkUrl && enableLink !== false);
	}

	private renderBullet(bullet: IBulletConfig, index: number, cardTitle: string): React.ReactNode {
		const isLink = this.isBulletLinkEnabled(bullet.linkUrl, bullet.enableLink);

		if (isLink) {
			return (
				<li key={`${cardTitle}-bullet-${index}`}>
					<a className={styles.bulletLink} href={bullet.linkUrl} target="_blank" rel="noopener noreferrer">
						{bullet.text}
					</a>
				</li>
			);
		}

		return <li key={`${cardTitle}-bullet-${index}`}>{bullet.text}</li>;
	}

	private renderStageContent(card: IStageCardConfig): React.ReactNode {
		const getLineLinkUrl = (lineIndex: number): string | undefined => {
			switch (lineIndex) {
				case 1:
					return card.line1LinkUrl;
				case 2:
					return card.line2LinkUrl;
				case 3:
					return card.line3LinkUrl;
				default:
					return undefined;
			}
		};

		const getLineEnableLink = (lineIndex: number): boolean | undefined => {
			switch (lineIndex) {
				case 1:
					return card.line1EnableLink;
				case 2:
					return card.line2EnableLink;
				case 3:
					return card.line3EnableLink;
				default:
					return undefined;
			}
		};

		const renderMenuText = (text: string, lineIndex: number, className: string): React.ReactNode => {
			const linkUrl = getLineLinkUrl(lineIndex);
			const enableLink = getLineEnableLink(lineIndex);
			const isLink = this.isCardLinkEnabled(linkUrl, enableLink);

			if (!isLink) {
				return <span className={className}>{text}</span>;
			}

			return (
				<a className={`${styles.menuLink} ${className}`} href={linkUrl} target="_blank" rel="noopener noreferrer">
					{text}
				</a>
			);
		};

		if (card.mode === 'pill') {
			return (
				<div className={styles.sprintStack}>
					{[card.line1, card.line2, card.line3].filter(Boolean).map((line: string, index: number) => (
						<span key={`${card.title}-${index}`} className={styles.sprintPill}>
							{renderMenuText(line, index + 1, styles.sprintPillText)}
						</span>
					))}
				</div>
			);
		}

		return (
			<div className={styles.stageBody}>
				<div>{renderMenuText(card.line1, 1, styles.stageStrong)}</div>
				{card.line2 ? <div>{renderMenuText(card.line2, 2, styles.stageSub)}</div> : null}
				{card.line3 ? <div>{renderMenuText(card.line3, 3, styles.stageSub)}</div> : null}
			</div>
		);
	}

	private renderStageCard(card: IStageCardConfig, index: number): React.ReactNode {
		const content = (
			<>
				<div className={`${styles.stageHead} ${this.getToneClass(card.color)} ${this.getStageStyleClass(card.style)}`}>
					{card.title}
				</div>
				{this.renderStageContent(card)}
			</>
		);

		const clickable = this.isCardLinkEnabled(card.linkUrl, card.enableLink);

		return (
			<article key={`${card.title}-${index}`} className={`${styles.stageCard} ${card.mode === 'pill' ? styles.sprintCard : ''}`}>
				{clickable ? (
					<a className={styles.cardLink} href={card.linkUrl} target="_blank" rel="noopener noreferrer">
						{content}
					</a>
				) : (
					content
				)}
			</article>
		);
	}

	private renderPremiumCard(card: IPremiumCardConfig, index: number): React.ReactNode {
		const clickable = this.isCardLinkEnabled(card.linkUrl, card.enableLink);
		const cardClasses = `${styles.premiumCard} ${this.getToneClass(card.color)} ${this.getPremiumStyleClass(card.style)}`;

		const content = (
			<>
				<div className={`${styles.iconCircle} ${card.style === 'outline' ? styles.iconCircleOutline : ''}`}>{card.icon}</div>
				<h3>{card.title}</h3>
				<p className={styles.cardHint}>{card.hint}</p>
				<ul>
					{card.bullets.map((bullet: IBulletConfig, bulletIndex: number) => this.renderBullet(bullet, bulletIndex, card.title))}
				</ul>
			</>
		);

		return (
			<article key={`${card.title}-${index}`} className={cardClasses}>
				{clickable ? (
					<a className={styles.cardLink} href={card.linkUrl} target="_blank" rel="noopener noreferrer">
						{content}
					</a>
				) : (
					content
				)}
			</article>
		);
	}

	public render(): React.ReactElement<ICmmiBoardProps> {
		const stageCards = this.props.stageCards.length > 0 ? this.props.stageCards : [];
		const premiumCards = this.props.premiumCards.length > 0 ? this.props.premiumCards : [];

		return (
			<section className={styles.cmmiBoard}>
				<div className={styles.devPanel}>
					<h2 className={styles.panelTitle}>{this.props.title}</h2>
					<div className={styles.stageGrid}>
						{stageCards.map((card: IStageCardConfig, index: number) => this.renderStageCard(card, index))}
					</div>

					<div className={styles.transversal}>{this.props.transversalText}</div>
				</div>

				<section className={styles.premiumSection}>
					<div className={styles.premiumGrid}>
						{premiumCards.map((card: IPremiumCardConfig, index: number) => this.renderPremiumCard(card, index))}
					</div>
				</section>
			</section>
		);
	}
}

