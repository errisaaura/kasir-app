// import logo from './logo.svg';
// import './App.css';
import React, { Component } from 'react'
import { Col, Row, Container } from "react-bootstrap";
import {Hasil, ListCategories, NavbarComponents, Menus} from "../components";
import { API_URL } from '../utils/constanst';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
       categoryYangDipilih : 'Makanan',
       keranjangs: []

    }
  }

  componentDidMount() {
    axios.get(API_URL + "products?category.nama="+this.state.categoryYangDipilih)
      .then(res => {
        const menus = res.data; //ini memasukkan data kedlam array menus
        this.setState({menus}) // ini juga bisa {menus(nama var) : menus(nama array)}
      })
      .catch(error => {
        console.log(error)
      })

    this.getListKeranjang()

    

  }

    //mengecek apa ada perubahan, jadi langsung otomatis tanpa reload dulu
    // ini gakdipakai soalnya mengakibatkan infinitif loop
  // componentDidUpdate(prevState){ 
  //   if(this.state.keranjangs !== prevState.keranjangs){
  //     axios.get(API_URL + "keranjangs")
  //     .then((res) => {
  //       const keranjangs = res.data
  //       this.setState({keranjangs})
        
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  //   }

  // }

  getListKeranjang = () => {
    axios.get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data
        this.setState({keranjangs})
        
      })
      .catch(error => {
        console.log(error)
      })

  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: []
    })

    axios.get(API_URL + "products?category.nama="+value)
      .then(res => {
        const menus = res.data; //ini memasukkan data kedlam array menus
        this.setState({menus}) // ini juga bisa {menus(nama var) : menus(nama array)}
      })
      .catch(error => {
        console.log(error)
      })
  }

  masukKeranjang = (value) => {
    // console.log("Menu", value)

    axios.get(API_URL + "keranjangs?product.id=" + value.id)
      .then(res => {
        if(res.data.length === 0){
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
      
          axios.post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang()
              swal({
                title: "Sukses Masuk Keranjang",
                text: keranjang.product.nama + " Sukses Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 2000,
              })
            })
            .catch(error => {
              console.log(error)
            })

        }else {
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          }

          axios.put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: keranjang.product.nama + " Sukses Masuk Keranjang",
                icon: "success",
                button: false,
                timer: 2000,
              })
            })
            .catch(error => {
              console.log(error)
            })



        }
      })
      .catch(error => {
        console.log(error)
      })

    
  }

  render() {
    // console.log(this.state.menus)
    const {menus, categoryYangDipilih, keranjangs} = this.state
    return (
      
      
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} categoryYangDipilih={categoryYangDipilih} />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus && menus.map((menu) => (
                  <Menus 
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
          </Row>
        </Container>
      </div>
    
    )
  }
}

