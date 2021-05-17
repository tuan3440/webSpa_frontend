import React, { Component } from 'react';
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default class Statistical extends Component {

    constructor() {
        super();
        this.state = {
            stasticOrder : [],
            stasticBill : [],
            bestService : [],
            bestProduct : []
        }
    }

    componentDidMount() {
        axios.get("/order/stastic").then(res => {
            this.setState({
                stasticOrder: res.data
            });

        });

        axios.get("/service/stastic").then(res => {
            this.setState({
                stasticBill: res.data
            });

        });

        axios.get("/service/stasticCount").then(res => {
            this.setState({
                bestService: res.data
            });

        });

        axios.get("/order/stasticCount").then(res => {
            this.setState({
                bestProduct: res.data
            });

        });



    }

    render() {
       return(
           <LayoutTableAdmin>
               <div>
                   <h1 className="text-danger" style={{textAlign: "center"}}>THỐNG KÊ</h1>
                   <div style={{ width: '100%' }}>
                       <ResponsiveContainer width="100%" height={200}>
                           <LineChart
                               width={500}
                               height={200}
                               data={this.state.stasticOrder}
                               margin={{
                                   top: 10,
                                   right: 30,
                                   left: 0,
                                   bottom: 0,
                               }}
                           >
                               <CartesianGrid strokeDasharray="3 3" />
                               <XAxis dataKey="month" />
                               <YAxis />
                               <Tooltip />
                               <Line connectNulls type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                           </LineChart>
                       </ResponsiveContainer>
                       <h2 style={{textAlign: 'center'}}>Doanh thu bán hàng theo tháng</h2>
                   </div>
                   <hr/>
                   <div style={{ width: '100%' }}>
                       <ResponsiveContainer width="100%" height={200}>
                           <LineChart
                               width={500}
                               height={200}
                               data={this.state.stasticBill}
                               margin={{
                                   top: 10,
                                   right: 30,
                                   left: 0,
                                   bottom: 0,
                               }}
                           >
                               <CartesianGrid strokeDasharray="3 3" />
                               <XAxis dataKey="month" />
                               <YAxis />
                               <Tooltip />
                               <Line connectNulls type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                           </LineChart>
                       </ResponsiveContainer>
                   </div>
                       <h2 style={{textAlign: 'center'}}>Doanh thu từ dịch vụ làm đẹp theo tháng</h2>
                       <br/>
                       <hr/>
                       <div className="row">
                           <div className="col-sm-2"></div>
                           <div className="col-sm-4">
                               <p className="text-danger">Dịch vụ hot nhất ({this.state.bestService[1]} lần)</p>
                               <div className="card" style={{width: "100%"}}>
                                   <img className="card-img-top" src={this.state.bestService[0]?.img} alt="Card image cap" style={{width: "100%"}}/>
                                   <div className="card-body">
                                       <p className="card-text">{this.state.bestService[0]?.name}</p>
                                   </div>
                               </div>
                           </div>
                           <div className="col-sm-4">
                               <p className="text-danger">Sản phẩm bán chạy nhất(Đã bán {this.state.bestProduct[1]})</p>
                               <div className="card" style={{width: "18rem"}}>
                                   <img className="card-img-top" src={this.state.bestProduct[0]?.imgUrl} alt="Card image cap" style={{maxWidth: "100%"}}/>
                                   <div className="card-body">
                                       <p className="card-text">{this.state.bestProduct[0]?.name}</p>
                                   </div>
                               </div>
                           </div>
                       </div>
               </div>


           </LayoutTableAdmin>

       )
   }
}