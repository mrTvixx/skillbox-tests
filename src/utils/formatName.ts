export const formatName = (name: string) => {
  if (!name) {
    return 'Вкусная пицца ❤️'
  }

  return name[0].toUpperCase() + name.slice(1);
}