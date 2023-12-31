class DateUtils {
    static leftPad(value) {
        if (value >= 10) {
            return value;
        }

        return `0${value}`;
    }

    // Date의 년, 월, 일 => yyyy-mm-dd로 변환
    static toStringByFormatting(date) {
        const year = date.getFullYear();
        const month = this.leftPad(date.getMonth() + 1);
        const day = this.leftPad(date.getDate());

        return [year, month, day].join("-");
    }
}