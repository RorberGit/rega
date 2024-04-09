import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { GridActionsCellItem } from "@mui/x-data-grid";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import Titles from "../../../Component/Titles";
import { RoutesURL } from "../../../Contants/Routes.contants";
import { messageAlert } from "../../../../utilities";
import { useShowMessage } from "../../../../hooks/useShowMessage";
import Tabla from "../../../../Component/mui/Tabla";
import useAxiosToken from "../../../../hooks/useAxiosToken";
import { useFetch } from "../../../../hooks/useFetch";

export default function View() {
  const [data, setData] = useState(false);
  const [Message] = useShowMessage();

  const axiosToken = useAxiosToken();

  const clasificacion = useFetch(RoutesURL.DOCCLASIFICACION);

  useEffect(() => {
    setData(clasificacion.data);
  }, [clasificacion.data]);

  const deleteRow = useCallback(
    (id) => () => {
      messageAlert().then((result) => {
        if (result.isConfirmed) {
          axiosToken
            .delete(`${RoutesURL.DOCCLASIFICACION}/${id}`)
            .then(() => {
              setData((prev) => prev.filter((row) => row.id !== id));

              Message("Registro eliminado exitosamente", "success");
            })
            .catch((error) => {
              Message(error?.response?.data?.message, "error");
            });
        }
      });
    },
    [Message, axiosToken]
  );

  const columns = useMemo(
    () => [
      {
        field: "actions",
        type: "actions",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            key={1}
            icon={<Visibility color="info" />}
            label="Datail"
            component={Link}
            to={`${RoutesURL.DETAIL}/${params.row.id}`}
          />,
          <GridActionsCellItem
            key={2}
            icon={<Edit color="warning" />}
            label="Edit"
            component={Link}
            to={`${RoutesURL.FORMULARIO}?action=update&id=${params.row.id}`}
          />,
          <GridActionsCellItem
            key={3}
            icon={<Delete color="error" />}
            label="Delete"
            onClick={deleteRow(params.id)}
          />,
        ],
      },
      { field: "nombre", headerName: "Clasificación", width: 300 },
    ],
    [deleteRow]
  );

  return clasificacion.loading ? (
    <>
      <Titles title="Clasificación de Documentos" />
      <Box m={2}>
        <Box m={1}>
          <Button
            size="small"
            variant="contained"
            component={Link}
            to={`${RoutesURL.FORMULARIO}?action=create`}
          >
            NUEVA CLASIFICACIÓN
          </Button>
        </Box>
        <Box>
          <Tabla rows={data} columns={columns} />
        </Box>
      </Box>
    </>
  ) : (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!clasificacion.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
