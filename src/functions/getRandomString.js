export default function getRandomString(size) {
  var letters = 'abcdefghijklmnopqrstuvwxyz';
    var randomString = '';
    for (var i = 0; i < size; i++) {
        var randomIndex = Math.floor(Math.random() * letters.length);
        randomString += letters.charAt(randomIndex);
    }
  return randomString;
}