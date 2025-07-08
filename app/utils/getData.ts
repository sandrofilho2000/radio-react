import { iRadio } from "../interfaces";
import api from "./api";

async function getData() {
  const radioStationsDataUrl = `./radio_stations.json`;
  try {
    const radioStations = await api<iRadio[]>(radioStationsDataUrl);
    console.log("🚀 ~ getData ~ radioStations:", radioStations)
    return radioStations ?? [] 
  } catch (error) {
    console.error("Erro ao buscar estações de rádio:", error);
    return []; 
  }
}

export default getData;
