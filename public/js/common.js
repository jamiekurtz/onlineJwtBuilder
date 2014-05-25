function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
};

Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop();
    }
};