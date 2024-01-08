export function getOne<T>(array: T[], propertyName: keyof T, value: T[keyof T]): T | undefined {
    const matchingObjects = array.filter((obj) => obj[propertyName] === value);
  
    if (matchingObjects.length === 0 || matchingObjects.length > 1) {
      return undefined;
    } 
  
    return matchingObjects[0];
  }


  export function generateRandomString(length: number): string {
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      // Generate a random index within the possible characters string
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      result += possibleCharacters.charAt(randomIndex);
    }
  
    return result;
  }
  