export const getRuGuitarType = (guitarType: string): string => {
  switch (guitarType) {
    case 'acoustic':
      return 'Акустическая гитара';
    case 'electric':
      return 'Электрогитара';
    case 'ukulele':
      return 'Укулеле';
    default:
      return guitarType;
  }
};
