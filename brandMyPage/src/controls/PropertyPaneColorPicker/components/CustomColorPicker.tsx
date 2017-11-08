import * as React from 'react';
import { CompoundButton, PrimaryButton, DefaultButton, ColorPicker, Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react';

import { ICustomColorPickerProps } from './ICustomColorPickerProps';
import { ICustomColorPickerState } from './ICustomColorPickerState';

export default class CustomColorPicker extends React.Component<ICustomColorPickerProps, ICustomColorPickerState> {
    
    constructor(props: ICustomColorPickerProps, state: ICustomColorPickerState) {
        super(props);
    
        this.state = {
            selectedColor: "#ffffff",
            showColorDialog: false
        };
    }
    public componentDidMount(): void {
    // this.loadOptions();
        }

    public componentDidUpdate(prevProps: ICustomColorPickerProps, prevState: ICustomColorPickerState): void {
    // if (this.props.disabled !== prevProps.disabled ||
    //     this.props.stateKey !== prevProps.stateKey) {
    //     this.loadOptions();
    //     }
    }
    private onClick(): void {
        this.setState({
        })        
    }
    private _onSelectedColorChanged(selectedColor: string) {
        this.setState({ selectedColor: selectedColor });
      }

    private _showDialog() {
        this.setState({ showColorDialog: true });
      }
    
      private _closeDialog() {
        this.setState({ showColorDialog: false });
        // this.props.save(this.state.script);
      }
    
      private _cancelDialog() {
        this.setState({ showColorDialog: false });
        // this.state.script = this.state.loaded;
      }
    public render(): React.ReactElement<ICustomColorPickerProps> {
        return (<span>
            <Dialog
                isOpen={this.state.showColorDialog}
                type={DialogType.normal}
                onDismiss={this._closeDialog.bind(this)}
                title='Embed'
                subText='Paste your script, markup or embed code below. Note that scripts will only run in view mode.'
                isBlocking={true}
                className={'ScriptPart'}
                >
                {/* <TextField multiline rows={15} onChanged={this._onScriptEditorTextChanged.bind(this)} value={this.state.script} /> */}
                <ColorPicker color="$ffffff" onColorChanged={this._onSelectedColorChanged.bind(this)}/>

                <DialogFooter>
                    <PrimaryButton onClick={this._closeDialog.bind(this)}>Save</PrimaryButton>
                    <DefaultButton onClick={this._cancelDialog.bind(this)}>Cancel</DefaultButton>
                </DialogFooter>
                {/* {viewMode} */}
                </Dialog>
            </span>)
    }

}   // end class 