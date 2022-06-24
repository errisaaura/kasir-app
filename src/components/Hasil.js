import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup, Row, Badge, Modal, Button, Card } from "react-bootstrap";
import swal from "sweetalert";
import { numberWithCommas } from "../utils/utils";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constanst";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga : 0
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan : menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  //ini buat + - jumlah pada form modal itu
  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
    })
  }
  kurang = () => {
    if(this.state.jumlah !== 1 ){ 
        this.setState({
          jumlah: this.state.jumlah - 1,
          totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah - 1)
        })
      
    }
  }

  changeHandler = (event) => {
    this.setState({
      keterangan : event.target.value
    })
  }

  hapusPesanan = (id) => {

    this.handleClose()

    axios.delete(API_URL + "keranjangs/"+id)
      .then((res) => {
        this.props.getListKeranjang()
        swal({
          title: "Hapus Pesanan",
          text: "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 2000
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.handleClose()

    const data = {
      jumlah: this.state.jumlah,
      total_harga : this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    }

    axios.put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang()
        swal({
          title: "Update Pesanan",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 2000
        })
      })

    // console.log("Hai", this.state.keterangan)
  }

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
          <ListGroup>
            {keranjangs.map((menuKeranjang) => (
              
                <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h6>{menuKeranjang.product.nama}</h6>
                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      <p>Rp. {numberWithCommas(menuKeranjang.total_harga)}</p>
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              
              
            ))}

          </ListGroup>
          </Card>
        )}

        <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan}/> 
        {/* ini untuk manggil form nya  */}

        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
