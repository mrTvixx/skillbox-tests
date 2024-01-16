import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/react"
import { CreateForm } from '..';
import { TDough, TSize } from '../../../types/pizza';

const handleNameChangeMock = jest.fn();
const handleSizeMock = jest.fn();
const handleDoughMock = jest.fn();
const handleIngredientsMock = jest.fn();
const onCreateMock = jest.fn();

const defaultProps = {
  name: '',
  size: 10 as TSize,
  dough: 'толстое' as TDough,
  ingredientsIds: [],
  disabled: true,
  handleNameChange: handleNameChangeMock,
  handleSize: handleSizeMock,
  handleDough: handleDoughMock,
  handleIngredients: handleIngredientsMock,
  onCreate: onCreateMock,
}

const renderComponent = (props: any = {}) => {
  return render(<CreateForm {...defaultProps} {...props} />);
}

describe('CreateForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Проверяем, что кнопка недоступна при рендере с дефолтными значениями', async () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId('CreateButton')).toBeDisabled();
  })

  it('Проверяем, что состояние кнопки меняется при смене disabled на false', async () => {
    const { getByTestId, rerender } = renderComponent();

    expect(getByTestId('CreateButton')).toBeDisabled();

    rerender(<CreateForm {...defaultProps} disabled={false} />)
    
    expect(getByTestId('CreateButton')).not.toBeDisabled();
  })

  it('Проверяем, что вызывается метод отправки формы при нажатии кнопки', async () => {
    const { getByTestId } = renderComponent({ name: 'Супер пицца', disabled: false });
    
    await fireEvent.click(getByTestId('CreateButton'));

    expect(onCreateMock).toBeCalled();
  })

  it('Проверяем, что вызывается метод отправки формы при нажатии Enter в поле ввода', async () => {
    const { getByTestId } = renderComponent({ name: 'Супер пицца', disabled: false });
    
    await fireEvent.submit(getByTestId('NameInput'));

    expect(onCreateMock).toBeCalled();
  })
});
