class Validate {
    static isDate(date: string) {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        return dateRegex.test(date);
    }
}

export default Validate;