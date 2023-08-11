import { ChangeEvent, useCallback, useEffect, useState, MouseEvent } from 'react';

import { getPizzas, savePizzas } from "../../utils/localStorage";
import { IPizza, TDough, TSize } from "../../types/pizza";
import { CreateForm } from "../../components/CreateForm";
import { INGREDIENTS } from '../../constants';
import { PizzasList } from '../../components/PizzasList';
import { isNameValid } from '../../utils/isNameValid';
import { sendAnalytics } from '../../utils/sendAnalytics';
import { getCurrentTime } from '../../utils/getCurrentTime';


export const MainPageContainer = () => {
  const [name, setName] = useState('');
  const [size, setSize] = useState<TSize>(10);
  const [dough, setDough] = useState<TDough>('толстое');
  const [ingredientsIds, setIngredientsIds] = useState<string[]>([]);
  const [pizzasList, setPizzasList] = useState<IPizza[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const isValid = isNameValid(name);
    setIsDisabled(!isValid);
  }, [name]);

  const handleNameChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  }, [setName]);

  const handleSize = useCallback(({ target }: ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(target.value) as TSize);
  }, [setSize]);

  const handleDough = useCallback(({ target }: ChangeEvent<HTMLSelectElement>) => {
    setDough(target.value as TDough);
  }, [setDough]);

  const handleIngredients = useCallback(({ target }: ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = [...target.selectedOptions].map((item: HTMLOptionElement) => item.value);

    setIngredientsIds(selectedIds);
  }, [setIngredientsIds]);

  const resetForm = useCallback(() => {
    setName('');
    setSize(10);
    setDough('толстое');
    setIngredientsIds([]);
  }, []);

  const onCreate = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const ingredients = INGREDIENTS.filter((item) => ingredientsIds.includes(String(item.id)));
    const pizza: IPizza = {
      id: pizzasList.length,
      name,
      size,
      dough,
      ingredients,
    };

    const updatedList = [pizza, ...pizzasList];

    setPizzasList(updatedList);
    savePizzas(updatedList);
    sendAnalytics({ pizza, time: getCurrentTime() });
    resetForm();
  }, [size, name, dough, ingredientsIds, pizzasList, setPizzasList, resetForm])

  useEffect(() => {
    setPizzasList(getPizzas())
  }, [])

  return (
    <>
      <CreateForm
        name={name}
        size={size}
        disabled={isDisabled}
        dough={dough}
        ingredientsIds={ingredientsIds}
        handleDough={handleDough}
        handleIngredients={handleIngredients}
        handleNameChange={handleNameChange}
        handleSize={handleSize}
        onCreate={onCreate}
      />
      <PizzasList 
        pizzasList={pizzasList}
      />
    </>
  )
};
