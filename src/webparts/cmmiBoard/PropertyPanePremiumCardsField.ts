import {
	IPropertyPaneField,
	PropertyPaneFieldType,
	IPropertyPaneCustomFieldProps
} from '@microsoft/sp-property-pane';
import { IPremiumCardConfig } from './components/ICmmiBoardProps';

export interface IPropertyPanePremiumCardsFieldProps extends IPropertyPaneCustomFieldProps {
	value: IPremiumCardConfig[];
	onPropertyChange: (propertyPath: string, newValue: any) => void;
	key: string;
}

export class PropertyPanePremiumCardsField implements IPropertyPaneField<IPropertyPanePremiumCardsFieldProps> {
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyPanePremiumCardsFieldProps;

	constructor(
		targetProperty: string,
		properties: IPropertyPanePremiumCardsFieldProps
	) {
		this.targetProperty = targetProperty;
		this.properties = properties;
	}

	public render(): void {
		// Rendering is done in the custom field component
	}
}

export const createPremiumCardsField = (
	targetProperty: string,
	value: IPremiumCardConfig[],
	onPropertyChange: (propertyPath: string, newValue: any) => void,
	key: string
): IPropertyPaneField<IPropertyPanePremiumCardsFieldProps> => {
	return {
		type: PropertyPaneFieldType.Custom,
		targetProperty,
		onRender: (element: HTMLElement, context?: any) => {
			// Custom rendering handled by PropertyPaneCustomField
		},
		properties: {
			key,
			onRender: (element: HTMLElement, context?: any) => {
				// Custom rendering
			},
			onDispose: () => {
				// Cleanup
			},
			onPropertyChange,
		}
	} as any;
};
