import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constanst";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {} from '@fortawesome/fontawesome-svg-core'
import {
  faCoffee,
  faUtensils,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} />;
  return <FontAwesomeIcon icon={faUtensils} className="" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data; //ini memasukkan data kedlam array menus
        this.setState({ categories }); // ini juga bisa {categories(nama var) : categories(nama array)}
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // console.log("categories", this.state.categories)
    const { categories } = this.state;
    const { changeCategory, categoryYangDipilih } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup >
          {categories &&
            categories.map((category) => (
              <ListGroup.Item 
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  categoryYangDipilih === category.nama && "bg-success text-white"
                }
                variant="success"
                style={{ cursor: "pointer"}}
              >
                <h5>
                  <Icon nama={category.nama} /> {category.nama}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
