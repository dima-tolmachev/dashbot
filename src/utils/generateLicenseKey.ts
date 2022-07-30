const ch = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ0123456789';

export default (): string => {
    var license = '';

    for (let i = 0; i < 20; i++) {
        var n = Math.floor(Math.random() * ch.length);
        if (i !== 0 && i % 5 === 0) license += '-';
        license += ch.substring(n, n + 1);
    }

    return license;
};
