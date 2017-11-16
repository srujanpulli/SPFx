import {IBrandMyPageWebPartProps} from "./../../IBrandMyPageWebPartProps"

export interface IConfigLandingProps {
  configureWebPart: () => void;
  editMode: number;  
  configOptions: IBrandMyPageWebPartProps["configOptions"];  
  //state props
  save(configOptions: object): void;  

}
  