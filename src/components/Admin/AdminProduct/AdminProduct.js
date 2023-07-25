import { Button, Form, Modal, Upload, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { UserMutationHook } from "../../../hooks/UseMutationHook";
import TableComponent from "../../Table/TableComponent";
import InputComponent from "../../InputComponent/InputComponent";
import { getBase64 } from "../../../utils";
import * as ProductService from "../../../Services/ProductService";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import "./AdminProduct.css";
import Loading from "../../../loading/Loading";

function AdminProduct() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const renderActions = () => {
    return (
      <div className="actions-product-admin-page">
        <ButtonComponent type="primary" icon={<EditOutlined />} />
        &nbsp;
        <ButtonComponent danger icon={<DeleteOutlined />} />
      </div>
    );
  };
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: 0,
    type: "",
    description: "",
    rating: 0,
    image: "",
    countInStock: "",
    discount: 0,
  });

  const mutation = UserMutationHook((data) => {
    const { name, price, type, description, rating, image, countInStock, discount } = data;
    const res = ProductService.createProduct({ name, price, type, description, rating, image, countInStock, discount });
    return res;
  });
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá bán",
      dataIndex: "price",
    },
    {
      title: "đánh giá",
      dataIndex: "rating",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },
    {
      title: "Tồn kho",
      dataIndex: "countInStock",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderActions,
    },
  ];

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const { data, isLoading, isSuccess, isError } = mutation;
  const { isLoading: isLoadingProduct, data: products } = useQuery(["products"], getAllProduct);
  console.log("products:", products);
  const dataProduct = products?.data?.map((product) => {
    return { ...product, key: product._id };
  });
  useEffect(() => {
    if (isSuccess && data?.status === "Ok") {
      message.success();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  const handleCancel = () => {
    setStateProduct({
      name: "",
      price: 0,
      type: "",
      description: "",
      rating: 0,
      image: "",
      countInStock: "",
      discount: 0,
    });
    setIsModalOpen(false);
    form.resetFields();
  };
  const onFinish = () => {
    mutation.mutate(stateProduct);
    handleCancel();
  };
  //truyền dữ liệu
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  //image-product
  const handleOnchangeImageProduct = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  console.log("product.data:", products?.data);
  return (
    <div className="product-management-admin-container">
      <h1>Quản lý sản phẩm</h1>
      <Button className="btn-product-admin-management add" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        Thêm
      </Button>
      <div className="table-content-management-product">
        <TableComponent columns={columns} data={dataProduct} isLoading={isLoadingProduct} />
      </div>
      {/* countInStock, description, image, name, price, rating, type, discount, sold */}
      <Modal title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>
          <Form
            name="create-product-form"
            className="create-product-form"
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="product-name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm!",
                },
              ]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại sản phẩm"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập loại sản phẩm!",
                },
              ]}
            >
              <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá sản phẩm!",
                },
              ]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả sản phẩm!",
                },
              ]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
            </Form.Item>
            <Form.Item
              label="giảm giá"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá giảm của sản phẩm!",
                },
              ]}
            >
              <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
            </Form.Item>
            <Form.Item
              label="Số hàng trong kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số sản phẩm có trong kho!",
                },
              ]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải ảnh lên!",
                },
              ]}
            >
              <Upload maxCount={1} className="upload-file-image-product" onChange={handleOnchangeImageProduct}>
                <ButtonComponent icon={<UploadOutlined />} textButton="Tải ảnh lên"></ButtonComponent>
              </Upload>
              {stateProduct.image && (
                <img src={stateProduct.image} alt="productimage" className="product-image-management" />
              )}
            </Form.Item>
            <Form.Item
              label="Đánh giá"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số sao của sản phẩm!",
                },
              ]}
            >
              <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <ButtonComponent
                type="primary"
                htmlType="submit"
                className="btn-submit-create-product"
                textButton="Tạo sản phẩm"
              ></ButtonComponent>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
}

export default AdminProduct;
