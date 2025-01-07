class HTTP {
    get = (url, data = {}) => {
        return new Promise((resolve, reject) => {
            const _url = `${url}?${Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&')}`;
            fetch(_url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json()).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }

}

const http = new HTTP();

export default http;