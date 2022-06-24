import React, { Component } from "react";
import { Row, Col, Button,  } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { API_URL } from "../utils/constanst";

// import { withRouter } from 'react-router-dom'

// function Header(props){
//   return(
//     props.history.push('/sukses')
//   )
// }
// export default withRouter(Header);


export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }
  
        axios.post(API_URL+"pesanans", pesanan)
          .then((res) => {
            
            // this.history.push('/sukses')
            window.location = "./sukses";
        })
    };
  render() {
    //untuk menghitung total harga ini menggunakan map reduce
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h5>
              Total Harga :{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h5>
            <Button variant="success" className="mb-2 mt-1 mr-2 " onClick={() => this.submitTotalBayar(totalBayar)}  >
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
            </Button>

          </Col>
        </Row>
      </div>
    );
  }
}
