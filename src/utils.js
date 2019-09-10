export const sortCategory = category => {
  if (category.indexOf('root') === -1) category.push('root');
  const result = category.sort((a, b) => {
    if (a === 'root') {
      return -1;
    }
    if (b === 'root') {
      return 1;
    }
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  return result;
};

export default [sortCategory];
