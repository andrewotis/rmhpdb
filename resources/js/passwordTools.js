import passwordValidator from 'password-validator';

export const createPasswordValidatorSchema = (setSchema) => {
    var s = new passwordValidator();
    s
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits(1)
        .has().not().spaces()
    return setSchema(s);
}