import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import { DefaultButton, ColorPicker } from 'office-ui-fabric-react';
import { IPropertyPaneColorButtonProps } from './IPropertyPaneColorButtonProps';
import { IPropertyPaneColorButtonInternalProps } from './IPropertyPaneColorButtonInternalProps';

import CustomColorPicker from './components/CustomColorPicker';
import { ICustomColorPickerProps } from './components/ICustomColorPickerProps';

export class PropertyPaneColorButton implements IPropertyPaneField<IPropertyPaneColorButtonProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneColorButtonInternalProps;
    private elem: HTMLElement;
    
    constructor(targetProperty: string, properties: IPropertyPaneColorButtonProps) {
      this.storedValue = "";
  
      this.targetProperty = targetProperty;
      this.properties = {
        key: properties.key,
        label: properties.label,
        selectedColor: properties.selectedColor,
        disabled: properties.disabled,
        showColorDialog: properties.showColorDialog,
        onClick : this.onClick.bind(this),
        onRender: this.onRender.bind(this),
      };
    }
    //dirty way to store current value of this property
    private storedValue: string;   
    private onClick():void
    {

    }
    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
          this.elem = elem;
        }
    
        const element: React.ReactElement<ICustomColorPickerProps> = React.createElement(CustomColorPicker, {
          label: this.properties.label,
          onClick: this.properties.onClick,
        //   onChanged: this.onChanged.bind(this),
          selectedColor: this.properties.selectedColor,
          disabled: this.properties.disabled,
          // required to allow the component to be re-rendered by calling this.render() externally
        //   stateKey: new Date().toString()
          showColorDialog: this.properties.showColorDialog,
        });
        ReactDom.render(element, elem);
      }
    
      private onChanged(option: ColorPicker, index?: number): void {   
        //set the old value to what was the new value;
        // var oldValue : any = this.storedValue;
    
        // //now reset new to what was just selected
        // this.storedValue = <string>option.key;
    
        // //finally trigger this custom properties on change method
        // this.properties.onPropertyChange(this.targetProperty, oldValue, this.storedValue);
      }
}