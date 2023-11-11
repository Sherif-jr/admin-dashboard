function generatePassword(): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "@$!%*?&";

  const allChars = lowercase + uppercase + numbers + specialChars;

  let password = "";

  // Ensure at least one character from each character set
  password += getRandomChar(lowercase);
  password += getRandomChar(uppercase);
  password += getRandomChar(numbers);
  password += getRandomChar(specialChars);

  // Fill the rest of the password
  for (let i = password.length; i < 8; i++) {
    password += getRandomChar(allChars);
  }

  return password;
}

function getRandomChar(charSet: string): string {
  const randomIndex = Math.floor(Math.random() * charSet.length);
  return charSet.charAt(randomIndex);
}

export default generatePassword;
