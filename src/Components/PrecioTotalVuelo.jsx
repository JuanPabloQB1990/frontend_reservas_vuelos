import React, { useEffect, useMemo, useState } from 'react'

const PrecioTotalVuelo = ({escala}) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        console.log("precio render");
    });

    useEffect(() => {
      const totalValue = escala.reduce((acum, value) => {
        return acum + value.precio
      },0)

      setTotal(totalValue)
    }, []);

  return (
    <p>
      {total.toFixed(3)} $
    </p>
  )
}

export default PrecioTotalVuelo
