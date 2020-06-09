//Gets neighborhood name and returns image

import React from 'react';

export default (community = undefined) => {
    let imgPath = "/images/";

    if (community === "Rogers Park") {
        imgPath = imgPath + "rogers-park.jpg";
    } else if (community === "West Ridge") {
        imgPath = imgPath + "west-ridge.jpg";
    } else if (community === "Uptown") {
        imgPath = imgPath + "uptown.jpg";
    } else if (community === "Lincoln Square") {
        imgPath = imgPath + "lincoln-square.jpeg";
    } else if (community === "North Center") {
        imgPath = imgPath + "north-center.jpg";
    } else if (community === "Lake View") {
        imgPath = imgPath + "lake-view.jpg";
    } else if (community === "Lincoln Park") {
        imgPath = imgPath + "lincoln-park.jpg";
    } else if (community === "Near North Side") {
        imgPath = imgPath + "near-north-side.jpg";
    } else if (community === "Edison Park") {
        imgPath = imgPath + "edison-park.jpg";
    } else if (community === "Norwood Park") {
        imgPath = imgPath + "norwood-park.jpg";
    } else if (community === "Jefferson Park") {
        imgPath = imgPath + "jefferson-park.jpg";
    } else if (community === "Forest Glen") {
        imgPath = imgPath + "forest-glen.jpg";
    } else if (community === "North Park") {
        imgPath = imgPath + "north-park.jpg";
    } else if (community === "Albany Park") {
        imgPath = imgPath + "albany-park.jpg";
    } else if (community === "Portage Park") {
        imgPath = imgPath + "portage-park.jpeg";
    } else if (community === "Irving Park") {
        imgPath = imgPath + "irving-park.jpeg";
    } else if (community === "Dunning") {
        imgPath = imgPath + "dunning.jpeg";
    } else if (community === "Montclaire") {
        imgPath = imgPath + "montclaire.jpg";
    } else if (community === "Belmont Cragin") {
        imgPath = imgPath + "belmont-cragin.jpg";
    } else if (community === "Hermosa") {
        imgPath = imgPath + "hermosa.jpg";
    } else if (community === "Avondale") {
        imgPath = imgPath + "avondale.jpg";
    } else if (community === "Logan Square") {
        imgPath = imgPath + "logan-square.jpg";
    } else if (community === "Humboldt Park") {
        imgPath = imgPath + "humboldt-park.jpg";
    } else if (community === "West Town") {
        imgPath = imgPath + "west-town.jpg";
    } else if (community === "Austin") {
        imgPath = imgPath + "Austin.jpeg";
    } else if (community === "West Garfield Park") {
        imgPath = imgPath + "west-garfield-park.jpg";
    } else if (community === "East Garfield Park") {
        imgPath = imgPath + "east-garfield-park.jpeg";
    } else if (community === "Near West Side") {
        imgPath = imgPath + "near-west-side.jpeg";
    } else if (community === "North Lawndale") {
        imgPath = imgPath + "north-lawndale.jpg";
    } else if (community === "South Lawndale") {
        imgPath = imgPath + "south-lawndale.jpg";
    } else if (community === "Lower West Side") {
        imgPath = imgPath + "lower-west-side.jpg";
    } else if (community === "Loop") {
        imgPath = imgPath + "loop.jpg";
    } else if (community === "Near South Side") {
        imgPath = imgPath + "near-south-side.jpeg";
    } else if (community === "Armour Square") {
        imgPath = imgPath + "armour-square.JPG";
    } else if (community === "Douglas") {
        imgPath = imgPath + "douglas.jpg";
    } else if (community === "Oakland") {
        imgPath = imgPath + "oakland.jpg";
    } else if (community === "Fuller Park") {
        imgPath = imgPath + "fuller-park.jpg";
    } else if (community === "Grand Boulevard") {
        imgPath = imgPath + "grand-boulevard.jpg";
    } else if (community === "Kenwood") {
        imgPath = imgPath + "kenwood.jpg";
    } else if (community === "Washington Park") {
        imgPath = imgPath + "washington-park.jpg";
    } else if (community === "Hyde Park") {
        imgPath = imgPath + "hyde-park.jpg";
    } else if (community === "Woodlawn") {
        imgPath = imgPath + "woodlawn.jpg";
    } else if (community === "South Shore") {
        imgPath = imgPath + "south-shore.jpg";
    } else if (community === "Chatham") {
        imgPath = imgPath + "chatham.png";
    } else if (community === "Avalon Park") {
        imgPath = imgPath + "avalon-park.jpg";
    } else if (community === "South Chicago") {
        imgPath = imgPath + "south-chicago.jpg";
    } else if (community === "Burnside") {
        imgPath = imgPath + "burnside.jpeg";
    } else if (community === "Calumet Heights") {
        imgPath = imgPath + "calumet-heights.jpg";
    } else if (community === "Roseland") {
        imgPath = imgPath + "roseland.jpg";
    } else if (community === "Pullman") {
        imgPath = imgPath + "pullman.jpg";
    } else if (community === "South Deering") {
        imgPath = imgPath + "south-deering.jpeg";
    } else if (community === "East Side") {
        imgPath = imgPath + "east-side.jpg";
    } else if (community === "West Pullman") {
        imgPath = imgPath + "west-pullman.jpg";
    } else if (community === "Riverdale") {
        imgPath = imgPath + "riverdale.jpg";
    } else if (community === "Hegewisch") {
        imgPath = imgPath + "hegewisch.jpg";
    } else if (community === "Garfield Ridge") {
        imgPath = imgPath + "garfield-ridge.jpg";
    } else if (community === "Archer Heights") {
        imgPath = imgPath + "archer-heights.jpg";
    } else if (community === "Brighton Park") {
        imgPath = imgPath + "brighton-park.jpg";
    } else if (community === "McKinley Park") {
        imgPath = imgPath + "mckinley-park.jpg";
    } else if (community === "Bridgeport") {
        imgPath = imgPath + "bridgeport.jpg";
    } else if (community === "New City") {
        imgPath = imgPath + "new-city.jpg";
    } else if (community === "West Elsdon") {
        imgPath = imgPath + "west-elsdon.jpeg";
    } else if (community === "Gage Park") {
        imgPath = imgPath + "gage-park.jpg";
    } else if (community === "Clearing") {
        imgPath = imgPath + "clearing.jpg";
    } else if (community === "West Lawn") {
        imgPath = imgPath + "west-lawn.jpg";
    } else if (community === "Chicago Lawn") {
        imgPath = imgPath + "chicago-lawn.jpeg";
    } else if (community === "Douglas") {
        imgPath = imgPath + "douglas.jpg";
    } else if (community === "West Englewood") {
        imgPath = imgPath + "west-englewood.jpg";
    } else if (community === "Englewood") {
        imgPath = imgPath + "englewood.jpg";
    } else if (community === "Greater Grand Crossing") {
        imgPath = imgPath + "greater-grand-crossing.png";
    } else if (community === "Ashburn") {
        imgPath = imgPath + "ashburn.jpg";
    } else if (community === "Auburn Gresham") {
        imgPath = imgPath + "auburn-gresham.jpg";
    } else if (community === "Beverly") {
        imgPath = imgPath + "beverly.jpg";
    } else if (community === "Washington Heights") {
        imgPath = imgPath + "washington-heights.jpg";
    } else if (community === "Mount Greenwood") {
        imgPath = imgPath + "mount-greenwood.png";
    } else if (community === "Morgan Park") {
        imgPath = imgPath + "morgan-park.jpg";
    } else if (community === "O'Hare") {
        imgPath = imgPath + "ohare.jpg";
    } else if (community === "Edgewater") {
        imgPath = imgPath + "edgewater.jpg";
    } else if (community === "Chicago") {
        imgPath = imgPath + "chicago.jpg";
    }

    return imgPath;
}