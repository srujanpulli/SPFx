import { CompoundButton } from 'office-ui-fabric-react';

export interface ICustomColorPickerProps {
    label: string,
    selectedColor: string,
    disabled: boolean,
    showColorDialog: boolean,
    onClick(selectedColor: string) : void
}