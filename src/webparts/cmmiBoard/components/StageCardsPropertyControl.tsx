import * as React from 'react';
import { TextField, Toggle } from '@fluentui/react';
import styles from './StageCardsPropertyControl.module.scss';
import { IStageCardConfig } from './ICmmiBoardProps';

export interface IStageCardsPropertyControlProps {
	value: IStageCardConfig[];
	onChange: (value: IStageCardConfig[]) => void;
}

export const StageCardsPropertyControl: React.FC<IStageCardsPropertyControlProps> = (props) => {
	const { value, onChange } = props;

	const handleCardUpdate = (cardIndex: number, updates: Partial<IStageCardConfig>) => {
		const updatedCards = [...value];
		updatedCards[cardIndex] = {
			...updatedCards[cardIndex],
			...updates
		};
		onChange(updatedCards);
	};

	const renderLineEditor = (card: IStageCardConfig, cardIndex: number, lineNumber: 1 | 2 | 3): React.ReactNode => {
		const text = lineNumber === 1 ? card.line1 : lineNumber === 2 ? (card.line2 || '') : (card.line3 || '');
		const linkUrl = lineNumber === 1 ? card.line1LinkUrl : lineNumber === 2 ? card.line2LinkUrl : card.line3LinkUrl;
		const enableLink = lineNumber === 1 ? card.line1EnableLink : lineNumber === 2 ? card.line2EnableLink : card.line3EnableLink;

		const lineLabel = lineNumber === 1 ? 'Menu 1' : lineNumber === 2 ? 'Menu 2 (opcional)' : 'Menu 3 (opcional)';

		return (
			<div key={`${card.title}-line-${lineNumber}`} className={styles.lineEditor}>
				<div className={styles.lineHeader}>{lineLabel}</div>
				<div className={styles.lineForm}>
					<TextField
						label="Texto do menu"
						placeholder="ex: Levantamento"
						value={text}
						onChange={(_, nextValue) => {
							if (lineNumber === 1) {
								handleCardUpdate(cardIndex, { line1: nextValue || '' });
							} else if (lineNumber === 2) {
								handleCardUpdate(cardIndex, { line2: nextValue || '' });
							} else {
								handleCardUpdate(cardIndex, { line3: nextValue || '' });
							}
						}}
					/>
					<TextField
						label="URL do menu"
						placeholder="https://exemplo.com"
						value={linkUrl || ''}
						onChange={(_, nextValue) => {
							if (lineNumber === 1) {
								handleCardUpdate(cardIndex, { line1LinkUrl: nextValue || '' });
							} else if (lineNumber === 2) {
								handleCardUpdate(cardIndex, { line2LinkUrl: nextValue || '' });
							} else {
								handleCardUpdate(cardIndex, { line3LinkUrl: nextValue || '' });
							}
						}}
					/>
					<Toggle
						label="Ativar link"
						checked={enableLink !== false}
						onChange={(_, checked) => {
							if (lineNumber === 1) {
								handleCardUpdate(cardIndex, { line1EnableLink: checked });
							} else if (lineNumber === 2) {
								handleCardUpdate(cardIndex, { line2EnableLink: checked });
							} else {
								handleCardUpdate(cardIndex, { line3EnableLink: checked });
							}
						}}
					/>
				</div>
			</div>
		);
	};

	return (
		<div className={styles.propertyControlContainer}>
			<div className={styles.header}>
				<h3>Links dos Menus (Cards Superiores)</h3>
				<p>Configure os links para cada menu: Requisitos, Arquitetura, Ambientes, Sprints Ageis, CI/CD e Testes.</p>
			</div>

			<div className={styles.cardsGrid}>
				{value.map((card, index) => (
					<div key={`${card.title}-${index}`} className={styles.cardEditorContainer}>
						<div className={styles.cardTitle}>{card.title || `Card ${index + 1}`}</div>

						<TextField
							label="Título do card"
							value={card.title}
							onChange={(_, nextValue) => handleCardUpdate(index, { title: nextValue || '' })}
							styles={{ root: { marginBottom: 8 } }}
						/>

						<div className={styles.lineEditor}>
							<div className={styles.lineHeader}>Card inteiro</div>
							<div className={styles.lineForm}>
								<TextField
									label="URL do card"
									placeholder="https://exemplo.com"
									value={card.linkUrl || ''}
									onChange={(_, nextValue) => handleCardUpdate(index, { linkUrl: nextValue || '' })}
								/>
								<Toggle
									label="Ativar link no card"
									checked={card.enableLink !== false}
									onChange={(_, checked) => handleCardUpdate(index, { enableLink: checked })}
								/>
							</div>
						</div>

						{renderLineEditor(card, index, 1)}
						{renderLineEditor(card, index, 2)}
						{renderLineEditor(card, index, 3)}
					</div>
				))}
			</div>
		</div>
	);
};
