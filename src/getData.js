//Gets Information about languages spoken in the city of Chicago.
export default () => {
    return fetch("https://data.cityofchicago.org/resource/a2fk-ec6q.json")
        .then((response) => {
            return response.json();
        })
        .then(data => {
            console.log(data); //returns an array containing 31 json objects.
            return data;
        })
        .catch(error => {
            alert("Fetch was unsuccessful");
        });

}