/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function(s) {
    let balancedStrings = 0;

    let counter = 0, currentAlpha = s[0];

    for(let i = 0; i< s.length; i++) {
        let alpha = s[i];
        if(alpha === currentAlpha) {
            counter++;
        } else {
            counter--;
        }
        if(counter === 0) {
            balancedStrings++; 
        }
    }
    return balancedStrings
};
