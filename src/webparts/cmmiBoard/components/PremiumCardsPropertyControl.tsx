import * as React from 'react';
import styles from './PremiumCardsPropertyControl.module.scss';
import { IPremiumCardConfig } from './ICmmiBoardProps';
import { PremiumCardBulletsEditor } from './PremiumCardBulletsEditor';

export interface IPremiumCardsPropertyControlProps {
	value: IPremiumCardConfig[];
	onChange: (value: IPremiumCardConfig[]) => void;
}

export const PremiumCardsPropertyControl: React.FC<IPremiumCardsPropertyControlProps> = (props) => {
	const { value, onChange } = props;

	const handleCardUpdate = (index: number, updatedCard: IPremiumCardConfig) => {
		const newCards = [...value];
		newCards[index] = updatedCard;
		onChange(newCards);
	};

	return (
		<div className={styles.propertyControlContainer}>
			<div className={styles.header}>
				<h3>Editar Links dos Premium Cards</h3>
				<p>Configure os links para cada item nos cards de Qualidade, Configuracao, Decisao e Causa Raiz</p>
			</div>

			<div className={styles.cardsGrid}>
				{value.map((card, index) => (
					<PremiumCardBulletsEditor
						key={`premium-card-${index}`}
						card={card}
						onUpdate={(updatedCard) => handleCardUpdate(index, updatedCard)}
					/>
				))}
			</div>
		</div>
	);
};
