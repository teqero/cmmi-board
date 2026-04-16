import * as React from 'react';
import styles from './BulletEditor.module.scss';
import { IBulletConfig } from './ICmmiBoardProps';
import { TextField, Toggle, IconButton } from '@fluentui/react';

export interface IBulletEditorProps {
	bullet: IBulletConfig;
	index: number;
	onUpdate: (index: number, bullet: IBulletConfig) => void;
	onRemove: (index: number) => void;
}

export const BulletEditor: React.FC<IBulletEditorProps> = (props) => {
	const { bullet, index, onUpdate, onRemove } = props;

	const handleTextChange = (value?: string) => {
		onUpdate(index, { ...bullet, text: value || '' });
	};

	const handleUrlChange = (value?: string) => {
		onUpdate(index, { ...bullet, linkUrl: value || '' });
	};

	const handleEnableLinkChange = (checked?: boolean) => {
		onUpdate(index, { ...bullet, enableLink: checked });
	};

	return (
		<div className={styles.bulletEditorContainer}>
			<div className={styles.bulletRow}>
				<TextField
					label="Texto do bullet"
					value={bullet.text}
					onChange={(_, value) => handleTextChange(value)}
					className={styles.textField}
				/>
				<TextField
					label="URL do link"
					placeholder="https://exemplo.com"
					value={bullet.linkUrl || ''}
					onChange={(_, value) => handleUrlChange(value)}
					className={styles.urlField}
				/>
				<div className={styles.bulletControls}>
					<div className={styles.toggleContainer}>
						<Toggle
							label="Ativar link"
							checked={bullet.enableLink !== false}
							onChange={(_, checked) => handleEnableLinkChange(checked)}
						/>
					</div>
					<IconButton
						iconProps={{ iconName: 'Delete' }}
						title="Remover bullet"
						onClick={() => onRemove(index)}
						className={styles.deleteButton}
					/>
				</div>
			</div>
		</div>
	);
};
