import DataTable from "react-data-table-component";
import {useEffect, useState, useMemo} from "react";
import FiltradoTabla from "./FiltradoTabla.jsx";


export function TablaGasMercado({datos, titulo}) {

    const [columnas, setColumnas] = useState(null);
    const [filas, setFilas] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = filas?.filter(item => item["Mercado"]
        && item['Mercado'].toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return <FiltradoTabla onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
							  filterText={filterText}/>;
    }, [filterText, resetPaginationToggle])

    const customStyles = {

        headCells: {
            style: {
                fontWeight: 500,
                fontSize: '14px'
            },
        },
    };


    useEffect(() => {
        // columnas
        const columnas = ["Mercado", "2015",	"2016",	"2017",	"2018",	"2019",	"TACC 2015-2019", "Variacion 2018-2019"]
        // const columnasOrdenadas = ordenarArray()
        const estruc = columnas.map((col) => {
            return {
                name: col,
                selector: row => row[col]
            }
        })
        // filas
        const columnasConId = datos.map((row, index) => {
            return {
                id: index,
                ...row
            }
        })
        setColumnas(estruc)
        setFilas(columnasConId)

    }, [])

    return (
        <>
            {
                !filas || !columnas && <div className="my-auto mx-auto w-52">Cargando tabla...</div>
            }
            {
                filas && columnas ? (
                    <DataTable
                        title={titulo}
                        columns={columnas}
                        data={filteredItems}
                        pagination
                        selectableRows
                        customStyles={customStyles}
                        paginationResetDefaultPage={resetPaginationToggle}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        persistTableHead
                        striped
                    />
                ) : null
            }
        </>
    )
};