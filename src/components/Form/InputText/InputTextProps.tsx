export interface IInputTextProps {
  name: string;
  control: any;
  label: string | JSX.Element;
  defaultValue?: string | JSX.Element,
  handleChange?: any,
  setValue?: any;
  [key:string]: any;
}
