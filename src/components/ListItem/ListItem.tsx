import { IPizza } from '../../types/pizza';
import { formatName } from '../../utils/formatName';

interface IProps {
  pizza: IPizza;
}

export const ListItem = ({ pizza }: IProps) => {
  return (
    <tr key={pizza.id} className="list-item">
      <td>
        {formatName(pizza.name)}
      </td>
      <td>
        {pizza.size}
      </td>
      <td data-testid="TotalKcal">
        {pizza.ingredients.reduce((acc, item) => acc + item.kcal, 0)}
      </td>
      <td>
        <ul>
          {pizza.ingredients.map((item) => (
            <li key={item.id}>{`${item.name} (ккал ${item.kcal})`}</li>
          ))}
        </ul>
      </td>
    </tr>
  )
};
