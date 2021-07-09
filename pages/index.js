import React from 'react';
import {Mercator, Graticule} from '@visx/geo';
import * as topojson from 'topojson-client';
// import topology from '../brazil.json';

export default function Home({data}) {
  // const topology = fetch("https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/uf/topojson/uf.json").then(d => d.json())

  // const world = topojson.feature(topology, topology.objects.units)


  return (
    <div>
        <p>{JSON.stringify(data)}</p>
    </div>
  )
}

function csvJSON(csv){

    let lines = csv.split("\n");

    let result = [];

    let headers=lines[0].split(",");

    for(let i=1;i<lines.length;i++){

        let obj = {};
        let currentline=lines[i].split(",");

        for(let j=0;j<headers.length;j++){
            if(typeof currentline[j] === 'undefined'){
                obj[headers[j]] = null
            }else{
                obj[headers[j]] = currentline[j];
            }
        }
        result.push(obj);
    }

    //return result; //JavaScript object
    return result; //JSON
}

export async function getStaticProps(context) {
    const res = await fetch(`https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv`)
    const data = await csvJSON(await res.text())
    console.log(data[0])
    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: { data: data } // will be passed to the page component as props
    }
}
