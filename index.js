const getWords = () => termowords;

const filterByLettersInAnyPlace = (words, letters) => {
  const lettersArray = letters.split('');
  const filtered = words.filter((word) => {
    for (let index = 0;index < lettersArray.length; index++) {
      const regex = new RegExp(`^.*${lettersArray[index]}.*$`);
      if (!!regex.exec(word)) {
        continue;
      }
      return false;
    }
    return true;
  });
  return filtered;
};

const filterByLetterInEspecificPlace = (words, obj) => {
  const filtered = words.filter((word) => {
    return word.split('')[obj.position - 1] === obj.letter;
  });
  return filtered;
};

const filterByLetterNotInEspecificPlace = (words, obj) => {
  const filtered = words.filter((word) => {
    return word.split('')[obj.position - 1] !== obj.letter;
  });
  return filtered;
};

const filterByLettersNotInAnyPlace = (words, letters) => {
  const lettersArray = letters.split('');
  const filtered = words.filter((word) => {
    for (let index = 0;index < lettersArray.length; index++) {
      const regex = new RegExp(`^.*${lettersArray[index]}.*$`);
      if (!regex.exec(word)) {
        continue;
      }
      return false;
    }
    return true;
  });
  return filtered;
};

const filterByLettersInEspecificPlace = (words, searchText) => {
  const searchObjects = searchText.split(',').map((text) => {
    const splittedText = text.split('');
    return {
      position: Number(splittedText[0]),
      letter: splittedText[1],
    };
  });
  let internalWords = words;
  for (let index = 0;index < searchObjects.length;index++) {
    internalWords = filterByLetterInEspecificPlace(internalWords, searchObjects[index]);
  }
  return internalWords;
};

const filterByLettersNotInEspecificPlace = (words, searchText) => {
  const searchObjects = searchText.split(',').map((text) => {
    const splittedText = text.split('');
    return {
      position: Number(splittedText[0]),
      letter: splittedText[1],
    };
  });
  let internalWords = words;
  for (let index = 0;index < searchObjects.length;index++) {
    internalWords = filterByLetterNotInEspecificPlace(internalWords, searchObjects[index]);
  }
  return internalWords;
};

const main = (givenArgs) => {
  let words = getWords();
  const arguments = givenArgs.split('|');
  console.log(arguments)
  if (arguments[0]) {
    words = filterByLettersInAnyPlace(words, arguments[0]);
  }
  if (arguments[1]) {
    words = filterByLettersNotInAnyPlace(words, arguments[1]);
  } 
  if (arguments[2]) {
    words = filterByLettersInEspecificPlace(words, arguments[2]);
  }
  if (arguments[3]) {
    words = filterByLettersNotInEspecificPlace(words, arguments[3]);
  }
  return words;
};
