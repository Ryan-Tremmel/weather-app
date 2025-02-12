export default function eliminateSpace(cityString) {
  let words = cityString.trim().split(/\s+/);
  return words.length === 2 ? words.join(' ') : cityString.trim();
}
