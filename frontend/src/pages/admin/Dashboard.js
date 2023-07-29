import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Dashboard = () => {
    const [pData, setPData] = useState(null)
    const [products, setProducts] = useState(null)
    const [stats, setStats] = useState(null)
    const [filter, setFilter] = useState("")





    const getStats = async () => {
        console.log(filter)
        const res = await fetch(`${process.env.REACT_APP_API_KEY}/admin/stats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                filter: filter
            })
        })
        const data = await res.json();

        if (res.status === 400 || !data) {
            console.log(data)
            window.alert("Error ")
        } else {
            setPData(data.persentages)
            if (filter === "")
                setProducts(data.products)
            else
                setStats(data.products)
            // console.log(pData)
            console.log("products")
            console.log(products)
        }
    }


    useEffect(() => {
        getStats();

    }, [filter])



    return (
        <>
            <div className="container fd-flex align-items-center justify-content-center h-75">
                <h5 className="text-center my-3">Sales Statistics</h5>
                <BarChart
                    width={500}
                    height={400}
                    data={pData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="solditems" fill="#ff3f34" />
                    <Bar dataKey="totalitems" fill="#ffa801" />
                </BarChart>
            </div>
            <div className="container">
                <div className="filter-div my-3 d-flex justify-content-between">
                    <h5>Product Wise Sales</h5>
                    <div className="">
                        <p>Filter: </p>
                        <form action="/admin/stats" method="post">
                            <select className="form-select" name="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="">Stock Data</option>
                                <option value="all">All Sales</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                            </select>
                        </form>
                    </div>
                </div>
                <table className="table" id="statsTable">
                    <thead>
                        <tr>
                            <th className="border text-center">Product</th>
                            <th className="border text-center">Name</th>
                            <th className="border text-center">Category</th>
                            <th className="border text-center">Total Qty.</th>
                            <th className="border text-center">Stock <i className="bi bi-arrow-bar-down text-primary"></i></th>
                            <th className="border text-center">Sold <i className="bi bi-arrow-bar-up text-success"></i></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (filter === "" || filter === "stock") ?
                                products ? products.map(product => <tr key={product._id}>
                                    <td className="border px-4 py-2 text-left">
                                        <img src={`http://localhost:4000/${product.image}`} style={{ width: "4rem", maxHeight: "6rem" }}
                                            alt="Product" />

                                    </td>
                                    <td className="border px-4 py-2 text-left" style={{ width: "18rem" }}>
                                        <h6>
                                            {product.name}
                                        </h6>
                                    </td>
                                    <td className="border px-4 py-2 text-left">
                                        {product.category}
                                    </td>
                                    <td className="border px-4 py-2 text-left">
                                        {product.initialItems} pcs.
                                    </td>
                                    <td className="border px-4 py-2 text-left">
                                        {product.stock} pcs.
                                    </td>
                                    <td className="border px-4 py-2 text-left">
                                        {product.initialItems - product.stock} pcs. <i
                                            className="bi bi-arrow-bar-up text-success"></i>
                                    </td>
                                </tr>)
                                    :
                                    <tr>
                                        <td>No Data</td>
                                    </tr>
                                :
                                stats ?
                                    stats.map(product => <tr>
                                        <td className="border px-4 py-2 text-left">
                                            <img src={`http://localhost:4000/${product.item.image}`} style={{ width: "5rem", height: "5rem" }}
                                                alt="Product" />

                                        </td>
                                        <td className="border px-4 py-2 text-left" style={{ width: "18rem" }}>
                                            <h6>
                                                {product.item.name}
                                            </h6>
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {product.item.category}
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {product.item.initialItems} pcs.
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {product.item.stock} pcs.
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {product.qty} pcs. <i className="bi bi-arrow-bar-up text-success"></i>
                                        </td>
                                    </tr>
                                    )
                                    :
                                    <tr>
                                        <td>No Data</td>
                                    </tr>

                        }
                    </tbody>


                </table>
            </div>
        </>

    )
}

export default Dashboard
