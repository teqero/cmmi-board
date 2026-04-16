import * as React from 'react';
import styles from './PremiumCardBulletsEditor.module.scss';
import { IBulletConfig, IPremiumCardConfig } from './ICmmiBoardProps';
import { BulletEditor } from './BulletEditor';
import { PrimaryButton, TextField, Toggle } from '@fluentui/react';

export interface IPremiumCardBulletsEditorProps {
	card: IPremiumCardConfig;
	onUpdate: (card: IPremiumCardConfig) => void;
}

export const PremiumCardBulletsEditor: React.FC<IPremiumCardBulletsEditorProps> = (props) => {
	const { card, onUpdate } = props;

	const handleBulletUpdate = (index: number, updatedBullet: IBulletConfig) => {
		const newBullets = [...card.bullets];
		newBullets[index] = updatedBullet;
		onUpdate({ ...card, bullets: newBullets });
	};

	const handleBulletRemove = (index: number) => {
		const newBullets = card.bullets.filter((_, i) => i !== index);
		onUpdate({ ...card, bullets: newBullets });
	};

	const handleAddBullet = () => {
		const newBullet = { text: 'Novo bullet', enableLink: false };
		const newBullets = [...card.bullets, newBullet];
		onUpdate({ ...card, bullets: newBullets });
	};

	return (
		<div className={styles.cardEditorContainer}>
			<div className={styles.cardHeader}>
				<span className={styles.cardIcon}>{card.icon}</span>
				<div className={styles.cardInfo}>
					<h4>{card.title}</h4>
					<p>{card.hint}</p>
				</div>
			</div>

			<div className={styles.cardLinkSection}>
				<TextField
					label="URL do card"
					placeholder="https://exemplo.com"
					value={card.linkUrl || ''}
					onChange={(_, nextValue) => onUpdate({ ...card, linkUrl: nextValue || '' })}
				/>
				<Toggle
					label="Ativar link no card"
					checked={card.enableLink !== false}
					onChange={(_, checked) => onUpdate({ ...card, enableLink: checked })}
				/>
			</div>

			<div className={styles.bulletsSection}>
				<h5>Links dos bullets</h5>
				{card.bullets.map((bullet, index) => (
					<BulletEditor
						key={`${card.title}-bullet-${index}`}
						bullet={bullet}
						index={index}
						onUpdate={handleBulletUpdate}
						onRemove={handleBulletRemove}
					/>
				))}

				<PrimaryButton
					text="+ Adicionar bullet"
					onClick={handleAddBullet}
					className={styles.addButton}
				/>
			</div>
		</div>
	);
};
