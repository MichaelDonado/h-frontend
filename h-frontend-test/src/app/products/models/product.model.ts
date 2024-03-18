export interface Product {
  id: string;
  title: string;
  type: string;
  priority: string;
}

export type FieldErrorMessages = {
  required: string;
  minlength: string;
  maxlength: string;
  idExist: string;
};
