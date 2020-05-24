
export default (community, data, ) => {
    return fetch('https://data.cityofchicago.org/resource/a2fk-ec6q.json?')//+{community})
        .then((response) => {
            console.dir(response);
            return response.json;
        })
        .then((res) => {
            console.dir(res);
            return res
        })
        .catch(err => {
            console.error("Request failed", err);
        });
}