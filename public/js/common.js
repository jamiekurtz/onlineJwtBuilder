function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
};

Array.prototype.clear = function() {
    while (this.length > 0) {
        this.pop();
    }
};

function createKey(charCount)
{
    var key = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < charCount; i++ ) {
        key += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return key;
}
