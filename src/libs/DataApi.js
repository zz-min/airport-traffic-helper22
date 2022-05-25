import React from "react";
import axios from "axios";

function DataApi() {
    
    const getAirlineId = async(inputAirlineNm)=>{   
        const r = await axios.get(
            "https://apis.data.go.kr/1613000/DmstcFlightNvgInfoService/getAirmanList?serviceKey=fhy41313p5usuDFdab0hFuBpAm0r2ByZwbHyFOFtRnOVjvXRYSJVdLJ64xx7FFryhq3fk9%2B6fuiLaBaoF9EZqg%3D%3D&_type=json"
        );
        var list = r.data.response.body.items.item;
        list.map((item)=>{
            if(item.airlineNm===inputAirlineNm){
                return item.airlineid;
            }
        });
    }
}

export default DataApi;
