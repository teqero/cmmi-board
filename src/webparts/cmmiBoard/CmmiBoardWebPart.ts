import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
	IPropertyPaneConfiguration,
	IPropertyPaneField,
	PropertyPaneFieldType,
	PropertyPaneTextField,
	PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CmmiBoardWebPartStrings';
import CmmiBoard from './components/CmmiBoard';
import { StageCardsPropertyControl } from './components/StageCardsPropertyControl';
import { PremiumCardsPropertyControl } from './components/PremiumCardsPropertyControl';
import { IPremiumCardConfig, IStageCardConfig } from './components/ICmmiBoardProps';

export interface ICmmiBoardWebPartProps {
	description: string;
	title: string;
	transversalText: string;
	allowLinks: boolean;
	stageCardsJson: string;
	premiumCardsJson: string;
}

const DEFAULT_STAGE_CARDS: IStageCardConfig[] = [
	{ title: 'Requisitos', line1: 'Levantamento', line2: 'Entradas e backlog', style: 'gradient', color: 'blue', enableLink: false, line1EnableLink: false, line2EnableLink: false },
	{ title: 'Arquitetura', line1: 'Solucao', line2: 'Padroes e design', style: 'gradient', color: 'blue', enableLink: false, line1EnableLink: false, line2EnableLink: false },
	{ title: 'Ambientes', line1: 'Preparacao', line2: 'Infra e esteira', style: 'solid', color: 'green', enableLink: false, line1EnableLink: false, line2EnableLink: false },
	{ title: 'Sprints Ageis', line1: 'Sprint 01', line2: 'Sprint 02', line3: 'Sprint', mode: 'pill', style: 'solid', color: 'indigo', enableLink: false, line1EnableLink: false, line2EnableLink: false, line3EnableLink: false },
	{ title: 'CI/CD', line1: 'Integracao', line2: 'Build e deploy', style: 'gradient', color: 'blue', enableLink: false, line1EnableLink: false, line2EnableLink: false },
	{ title: 'Testes', line1: 'Validacao', line2: 'Verificacao e evidencia', style: 'solid', color: 'cyan', enableLink: false, line1EnableLink: false, line2EnableLink: false }
];

const DEFAULT_PREMIUM_CARDS: IPremiumCardConfig[] = [
	{
		icon: 'Q',
		title: 'Qualidade',
		hint: 'PPQA · Auditoria e conformidade',
		bullets: [
			{ text: 'Aderencia ao processo', enableLink: true },
			{ text: 'Evidencias e auditorias', enableLink: true },
			{ text: 'Relatorios de conformidade', enableLink: true }
		],
		style: 'gradient',
		color: 'blue'
	},
	{
		icon: 'C',
		title: 'Configuracao',
		hint: 'CM · Controle de versoes e baseline',
		bullets: [
			{ text: 'Versionamento de artefatos', enableLink: true },
			{ text: 'Baselines e rastreabilidade', enableLink: true },
			{ text: 'Aprovacao de mudancas', enableLink: true }
		],
		style: 'gradient',
		color: 'purple'
	},
	{
		icon: 'D',
		title: 'Decisao',
		hint: 'DAR · Escolha estruturada',
		bullets: [
			{ text: 'Criterios e pesos claros', enableLink: true },
			{ text: 'Comparacao de alternativas', enableLink: true },
			{ text: 'Registro do racional tecnico', enableLink: true }
		],
		style: 'gradient',
		color: 'amber'
	},
	{
		icon: 'R',
		title: 'Causa Raiz',
		hint: 'CAR · Prevencao de recorrencia',
		bullets: [
			{ text: 'Investigacao de falhas', enableLink: true },
			{ text: 'Identificacao da origem real', enableLink: true },
			{ text: 'Plano de acao preventivo', enableLink: true }
		],
		style: 'gradient',
		color: 'red'
	}
];

export default class CmmiBoardWebPart extends BaseClientSideWebPart<ICmmiBoardWebPartProps> {
	private _onStageCardsChange = (updatedCards: IStageCardConfig[]): void => {
		this.properties.stageCardsJson = JSON.stringify(updatedCards, null, 2);
		this.context.propertyPane.refresh();
		this.render();
	};

	private _onPremiumCardsChange = (updatedCards: IPremiumCardConfig[]): void => {
		this.properties.premiumCardsJson = JSON.stringify(updatedCards, null, 2);
		this.context.propertyPane.refresh();
		this.render();
	};

	private _renderStageCardsEditor = (element: HTMLElement): void => {
		const stageCards = this._parseJsonArray<IStageCardConfig>(this.properties.stageCardsJson, DEFAULT_STAGE_CARDS);

		const control: React.ReactElement = React.createElement(StageCardsPropertyControl, {
			value: stageCards,
			onChange: this._onStageCardsChange
		});

		ReactDom.render(control, element);
	};

	private _renderPremiumCardsEditor = (element: HTMLElement): void => {
		const premiumCards = this._parseJsonArray<IPremiumCardConfig>(this.properties.premiumCardsJson, DEFAULT_PREMIUM_CARDS);

		const control: React.ReactElement = React.createElement(PremiumCardsPropertyControl, {
			value: premiumCards,
			onChange: this._onPremiumCardsChange
		});

		ReactDom.render(control, element);
	};

	private _disposeCustomEditor = (element: HTMLElement): void => {
		ReactDom.unmountComponentAtNode(element);
	};

	private _createCustomPropertyField(targetProperty: string, key: string, onRender: (element: HTMLElement) => void): IPropertyPaneField<any> {
		return {
			type: PropertyPaneFieldType.Custom,
			targetProperty,
			properties: {
				key,
				onRender: (element: HTMLElement): void => onRender(element),
				onDispose: (element: HTMLElement): void => this._disposeCustomEditor(element)
			}
		};
	}

	protected onInit(): Promise<void> {
		if (!this.properties.title) {
			this.properties.title = 'Desenvolvimento';
		}

		if (!this.properties.transversalText) {
			this.properties.transversalText = 'Qualidade · Configuracao · Decisao · Causa Raiz';
		}

		if (typeof this.properties.allowLinks !== 'boolean') {
			this.properties.allowLinks = true;
		}

		if (!this.properties.stageCardsJson) {
			this.properties.stageCardsJson = JSON.stringify(DEFAULT_STAGE_CARDS, null, 2);
		}

		if (!this.properties.premiumCardsJson) {
			this.properties.premiumCardsJson = JSON.stringify(DEFAULT_PREMIUM_CARDS, null, 2);
		}

		return Promise.resolve();
	}

	public render(): void {
		const stageCards = this._parseJsonArray<IStageCardConfig>(this.properties.stageCardsJson, DEFAULT_STAGE_CARDS);
		const premiumCards = this._parseJsonArray<IPremiumCardConfig>(this.properties.premiumCardsJson, DEFAULT_PREMIUM_CARDS);

		const element: React.ReactElement = React.createElement(CmmiBoard, {
			description: this.properties.description,
			title: this.properties.title,
			transversalText: this.properties.transversalText,
			allowLinks: this.properties.allowLinks,
			stageCards,
			premiumCards
		});

		ReactDom.render(element, this.domElement);
	}

	private _parseJsonArray<T>(jsonValue: string | undefined, fallback: T[]): T[] {
		if (!jsonValue) {
			return fallback;
		}

		try {
			const parsed = JSON.parse(jsonValue);
			return Array.isArray(parsed) && parsed.length > 0 ? (parsed as T[]) : fallback;
		} catch (error) {
			console.warn('CmmiBoard: invalid JSON in property pane, using fallback.', error);
			return fallback;
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('title', {
									label: strings.TitleFieldLabel
								}),
								PropertyPaneTextField('transversalText', {
									label: strings.TransversalTextFieldLabel,
									multiline: true
								}),
								PropertyPaneToggle('allowLinks', {
									label: strings.AllowLinksFieldLabel,
									onText: strings.AllowLinksOnText,
									offText: strings.AllowLinksOffText
								}),
								this._createCustomPropertyField('stageCardsJson', 'stageCardsUiEditor', this._renderStageCardsEditor),
								this._createCustomPropertyField('premiumCardsJson', 'premiumCardsUiEditor', this._renderPremiumCardsEditor),
								PropertyPaneTextField('description', {
									label: strings.DescriptionFieldLabel,
									multiline: true
								})
							]
						}
					]
				}
			]
		};
	}
}
