export const idValid = (str: string) => {
  return /[a-z0-9]{6,}/g.test(str);
};

export const pwValid = (str: string) => {
  return /[a-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,}/g.test(str);
};
