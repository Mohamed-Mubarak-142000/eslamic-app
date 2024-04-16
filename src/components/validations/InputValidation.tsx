import { Form } from "react-bootstrap";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

type InputProps<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  type?: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
};

const InputStyle = styled(Form.Control)`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  &:focus {
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.background};
  }
`;
const InputValidation = <TFieldValues extends FieldValues>({
  label,
  type = "text",
  name,
  register,
  error,
}: InputProps<TFieldValues>) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label> {label}:</Form.Label>
      <InputStyle
        type={type}
        {...register(name)}
        isInvalid={error ? true : false}
      />

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputValidation;
