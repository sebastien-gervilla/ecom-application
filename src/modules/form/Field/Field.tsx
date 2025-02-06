// Libraries
import { FC, ChangeEvent, ReactNode, HTMLInputTypeAttribute } from 'react';

// Application
import './field.scss';
import { FormHandler } from '../form.types';

interface Props {
    label?: string;
    name: string;
    value: string;
    onChange: FormHandler<string, ChangeEvent<HTMLInputElement>>;
    type?: HTMLInputTypeAttribute;
    className?: string;
    startElement?: ReactNode;
    endElement?: ReactNode;
}

const FormField: FC<Props> = ({ label, name, value, onChange, type, className, startElement, endElement }) => {

    const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            name,
            value: event.target.value,
            base: event,
        });
    }

    return (
        <div className={'form-field' + (className ? ` ${className}` : '')}>
            {(label && (
                <label htmlFor={name}>
                    {label}
                </label>
            ))}
            <div className="input">
                {startElement}
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChanges}
                    type={type}
                />
                {endElement}
            </div>
        </div>
    );
};

export default FormField;