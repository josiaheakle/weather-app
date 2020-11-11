const TempHelper = (function () {
    // kelvin to farenheight 
    const toF = (kel) => {
        // (K − 273.15) × 9/5 + 32 = °F
        const far = (Math.floor(((kel - 273.15) * (9/5) + 32)*10))/10;
        return far;
    }  
    // kelvin to celcius
    const toC = (kel) => {
        // 0K − 273.15 = -273.1°C
        const cel = (Math.floor((kel - 273.25)*10))/10;

        return cel;

    }  
    // returns toF method or toC method if 'f' or 'c'
    const fOrC = (str) => {
        if(str === 'f') {
            return toF;
        } 
        else if (str === 'c') {
            return toC;
        }
    }
    return {toF, toC, fOrC}
})();

export default TempHelper;