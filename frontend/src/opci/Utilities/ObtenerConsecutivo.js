import axios from "../../api/axios";
import { RoutesURLRoot } from "../../contants";

const ObtenerConsecutivo = async () => {
  try {
    const response = await axios.get(
      `${RoutesURLRoot.OPCI}/${RoutesURLRoot.CONSECUTIVO}`
    );

    return response.data;
  } catch (error) {
    console.error("Error en numero consecutivo:=>", error);
  }
};

export default ObtenerConsecutivo;
