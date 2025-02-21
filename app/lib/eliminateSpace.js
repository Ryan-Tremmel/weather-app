export default function eliminateSpace(cityString) {
  // As named, it takes in a string of words and ensures there is no extra added space
  // Example: las    vegas = las vegas
  let words = cityString.trim().split(/\s+/);
  return words.length === 2 ? words.join(' ') : cityString.trim();
}
