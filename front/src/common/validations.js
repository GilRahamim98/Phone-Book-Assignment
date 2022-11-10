export const validate = (name, value, validations) => {
    const errors = []

    if (validations.required) {
        if (value.length === 0) {
            errors.push({
                value: `${name} is required`
            })
        }
    }

    // if (validations.pattern) {
    //     if (!value.endsWith()) {
    //         errors.push({ value: `${name} is invalid` })
    //     }
    // }

    return errors
}