export interface FormFields {
    name: string;
    type: string;
    templateOptions: TemplateOptions;   
}


export interface TemplateOptions {
    label: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    options?: any;
}
