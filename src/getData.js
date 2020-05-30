//Gets Information about languages spoken in the city of Chicago.
export default (community = undefined) => {
    let str;
    (community) ? (str = 'https://data.cityofchicago.org/resource/a2fk-ec6q.json?community_area_name=' + community) :
        (str = "https://data.cityofchicago.org/resource/a2fk-ec6q.json");
    return fetch(str)
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