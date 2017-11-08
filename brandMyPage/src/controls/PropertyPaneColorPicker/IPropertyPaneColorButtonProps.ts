import { CompoundButton } from 'office-ui-fabric-react';

export interface IPropertyPaneColorButtonProps {
    key: string,    
    label: string,
    selectedColor: string,
    disabled: boolean,
    showColorDialog: boolean,
    onClick(selectedColor: string) : void
}