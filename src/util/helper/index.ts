export function getOne<T>(array: T[], propertyName: keyof T, value: T[keyof T]): T | undefined {
    const matchingObjects = array.filter((obj) => obj[propertyName] === value);
  
    if (matchingObjects.length === 0 || matchingObjects.length > 1) {
      return undefined;
    } 
  
    return matchingObjects[0];
  }
  