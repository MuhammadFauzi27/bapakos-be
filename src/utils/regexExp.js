const isValidEmail = (email) => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return EMAIL_REGEX.test(email);
}

export default {
  isValidEmail,
}