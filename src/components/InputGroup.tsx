import { css } from '@emotion/react';
import InputTitle from './InputTitle';
import Input from './Input';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { SectionType } from '../types/cardType';
import { CARD_NUMBER, CARD_OWNER, CARD_PERIOD } from '../constants/inputInformation';

interface InputGroupType {
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  section: SectionType;
}

type PeriodType = 'month' | 'year';

function InputGroup({ setState, section }: InputGroupType) {
  const getType = (section: SectionType) => {
    const getTypeTable = {
      number: CARD_NUMBER,
      period: CARD_PERIOD,
      owner: CARD_OWNER,
    };
    return getTypeTable[section];
  };

  const { title, subtitle, label, placeholders } = getType(section);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const updateState = (value: string, index: number) => {
    setState((prevState: string[]) => {
      const updatedState = [...prevState];
      updatedState[index] = value;
      return updatedState;
    });
  };

  const inputGroupStyle = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  const inputTitleStyle = css`
    display: flex;
    flex-direction: column;
  `;

  const labelStyle = css`
    font-size: 12px;
    color: #0a0d13;
  `;

  const inputContainerStyle = css`
    display: flex;
    gap: 8px;
    flex-direction: column;
    width: 100%;
  `;

  const inputBoxStyle = css`
    display: flex;
    gap: 10px;
  `;

  return (
    <div css={inputGroupStyle}>
      <div css={inputTitleStyle}>
        <InputTitle title={title} subtitle={subtitle} />
      </div>

      <div css={inputContainerStyle}>
        <label css={labelStyle} htmlFor={section}>
          {label}
        </label>
        <div css={inputBoxStyle}>
          {placeholders.map((placeholder: string, index: number) => {
            const test: PeriodType[] = ['month', 'year'];
            return (
              <Input
                keyProp={section + index.toString()}
                type={section === 'period' ? test[index] : section}
                placeholder={placeholder}
                setState={(s) => updateState(s, index)}
                setErrorMessage={setErrorMessage}
              />
            );
          })}
        </div>
      </div>

      <ErrorMessage value={errorMessage}></ErrorMessage>
    </div>
  );
}

export default InputGroup;
