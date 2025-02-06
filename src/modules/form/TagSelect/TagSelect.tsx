// Libraries
import { useRef, useState, useMemo, MouseEvent, KeyboardEvent, ChangeEvent, MouseEventHandler, ReactNode } from 'react';
import { ChevronDown, X } from 'lucide-react';

// Application
import './tag-select.scss';
import { FormHandler } from '../form.types';
import { MapOptionFn, MappedOption, ValidOption } from '../Select/Select.types';
import Options from './Options/Options';

interface Props<Value, Option extends ValidOption> {
    label?: string;
    name: string;
    values: Value[];
    onChange: FormHandler<Value[]>;
    options: Option[];
    isSelected: (option: MappedOption<Value>, value: Value) => boolean;
    mapOption: MapOptionFn<Value, Option>;
    mapSearch?: (option: Option) => string;
    keepFocus?: boolean;
}

const TagSelect = <Value, Option extends ValidOption>({
    label = '',
    name,
    values,
    options,
    onChange,
    isSelected,
    mapOption,
    mapSearch,
    keepFocus = true
}: Props<Value, Option>) => {

    const mappedOptions = useMemo(() => options.map(mapOption) || [], [options]);

    const selectRef = useRef<HTMLDivElement | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);

    const [search, setSearch] = useState('');

    const handleToggleIsSelecting = () => setIsSelecting(prev => !prev);
    const handleStartSelecting = () => setIsSelecting(true);

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        if (text !== undefined) setSearch(text);
    };

    const handleOnKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!values.length) return;
        if (event.code !== 'Backspace' || search)
            return;

        let newValues = [...values];
        newValues.splice(newValues.length - 1, 1);
        onChange({
            name,
            value: newValues,
            base: event
        });
    }

    const handleSelect = (event: MouseEvent<HTMLButtonElement | HTMLDivElement>, selectedOption: Value) => {
        onChange({
            name,
            value: [...values, selectedOption],
            base: event
        });

        search && setSearch('');
        !keepFocus && setIsSelecting(false);
    }

    const handleUnselect = (
        event: MouseEvent<HTMLButtonElement | HTMLDivElement>,
        removedOption: MappedOption<Value>
    ) => {
        // Here "isSelected" is used to check if the value is the removed option
        const newValue = values.filter(value =>
            isSelected
                ? !isSelected(removedOption, value)
                : removedOption !== value
        );

        onChange({
            name,
            value: newValue,
            base: event
        });
    }

    const displaySelectedOptions = () => {
        if (!values.length)
            return [];

        return values.map((value, index) => {
            const correspondingOption = mappedOptions.find(option => {
                return isSelected
                    ? isSelected(option, value)
                    : option.value === value;
            });

            if (!correspondingOption) return;

            return (
                <div key={index} className='selected-value'>
                    <p>{correspondingOption?.label}</p>
                    <button
                        className='remove-button'
                        onClick={event => handleUnselect(event, correspondingOption)}
                    >
                        <X />
                    </button>
                </div>
            );
        });
    }

    const getOptions = () => {
        if (!options.length)
            return <EmptyOption />;

        let displayedOptions = [];
        const loweredSearch = search.toLowerCase();
        for (const option of options) {
            const mappedOption = mapOption(option);
            const searchValue = mapSearch
                ? mapSearch(option)
                : getSearchValueFromLabel(mappedOption.label);

            if (loweredSearch && !searchValue.includes(loweredSearch))
                continue;

            const selected = isSelected
                ? values.some(value => isSelected(mappedOption, value))
                : values.includes(mappedOption.value);

            const action: MouseEventHandler<HTMLDivElement> = selected
                ? (event) => handleUnselect(event, mappedOption)
                : (event) => handleSelect(event, mappedOption.value)

            displayedOptions.push(
                <div
                    key={mappedOption.key}
                    className={'option' + (selected ? ' selected' : '')}
                    onClick={action}
                >
                    {mappedOption.label}
                </div>
            )
        }

        return displayedOptions.length
            ? displayedOptions
            : <EmptyOption />;
    }

    return (
        <div className={'tag-select' + (isSelecting ? ' active' : '')}>
            <label>
                {label}
            </label>
            <div
                ref={selectRef}
                onClick={handleStartSelecting}
                className='select-button'
            >
                <div className='selected-values'>
                    {displaySelectedOptions()}
                    <div className='input-wrapper'>
                        <input
                            type="text"
                            value={search}
                            onChange={handleChangeSearch}
                            onKeyDown={handleOnKeydown}
                        />
                    </div>
                </div>
                <button
                    className='select-icon-button'
                    onClick={handleToggleIsSelecting}
                    type='button'
                >
                    <ChevronDown size={20} strokeWidth={2} />
                </button>
                {(isSelecting && selectRef.current) &&
                    <Options
                        anchor={selectRef.current}
                        options={getOptions()}
                        onOptionClick={handleToggleIsSelecting}
                    />
                }
            </div>
        </div>
    );
};

const EmptyOption = () => {
    return (
        <div className='empty-option'>
            Aucune option
        </div>
    );
}

const getSearchValueFromLabel = (label: ReactNode) => {
    if (!label) return '';
    return label.toString().toLowerCase();
}

export default TagSelect;