import { Button, Form, Modal, Select, Space, Upload, message } from "antd";
import { PlusOutlined, UploadOutlined, SearchOutlined, StarTwoTone } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
//import { useSelector } from "react-redux";

import { UserMutationHook } from "../../../hooks/UseMutationHook";
import TableComponent from "../../Table/TableComponent";
import InputComponent from "../../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../../utils";
import * as ProductService from "../../../Services/ProductService";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import "./AdminProduct.css";
import Loading from "../../../loading/Loading";
import DrawerComponent from "../../Drawer/DrawerComponent";
import ModalComponent from "../../Modal/ModalComponent";

function AdminProduct() {
  const [form] = Form.useForm();
  //const user = useSelector((state) => state.user);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [typeProduct, setTypeProduct] = useState([]);
  const [typeSelect, setTypeSelect] = useState("");
  const searchInput = useRef(null);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const renderActions = () => {
    return (
      <div className="actions-product-admin-page">
        <ButtonComponent type="primary" icon={<EditOutlined />} onClick={handleEditProduct} />
        &nbsp;
        <ButtonComponent danger icon={<DeleteOutlined />} onClick={() => setIsModalOpenDelete(true)} />
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
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    price: 0,
    type: "",
    description: "",
    rating: 0,
    image: "",
    countInStock: "",
    discount: 0,
  });
  //create sản phẩm
  const mutation = UserMutationHook((data) => {
    const { name, price, type, description, rating, image, countInStock, discount } = data;
    const res = ProductService.createProduct({ name, price, type, description, rating, image, countInStock, discount });

    return res;
  });

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();

    return res;
  };
  //lấy loại sản phầm
  const fetchGetAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res.data);
    }
    return res;
  };
  //update product
  const mutationUpdate = UserMutationHook((data) => {
    const { id, ...rests } = data;
    const res = ProductService.updateProduct(id, { ...rests });
    return res;
  });
  //mutation xóa sản phẩm
  const mutationDelete = UserMutationHook((data) => {
    const { id } = data;
    const res = ProductService.deleteProduct(id);

    return res;
  });
  //xóa nhìu
  const mutationDeleteMutiple = UserMutationHook((data) => {
    const { ...ids } = data;
    const res = ProductService.deleteMutipleProduct(ids);

    return res;
  });
  //dữ liệu để đổ vào bảng
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: `Từ 5.000.000 VNĐ`,
          value: `>=`,
        },
        {
          text: `Nhỏ hơn 5.000.000 VNĐ`,
          value: `<=`,
        },
      ],
      onFilter: (value, record) => {
        if (value === `>=`) return record.price >= 5000000;
        if (value === `<=`) return record.price <= 5000000;
      },
    },
    {
      title: "đánh giá",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: `từ 3 sao trở lên`,
          value: `>=`,
        },
        {
          text: `dưới 3 sao`,
          value: `<=`,
        },
      ],
      onFilter: (value, record) => {
        if (value === `>=`) return record.rating >= 3;
        if (value === `<=`) return record.rating <= 3;
      },
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

  //create
  const { data, isLoading, isSuccess, isError } = mutation;
  //update
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  //delete
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  const {
    data: dataDeletedMutiple,
    isLoading: isLoadingDeletedMutiple,
    isSuccess: isSuccessDeletedMutiple,
    isError: isErrorDeletedMutiple,
  } = mutationDeleteMutiple;

  //query
  const queryTypeProduct = useQuery(["type-product"], fetchGetAllTypeProduct);
  const queryProduct = useQuery(["products"], getAllProduct);
  const { isLoading: isLoadingProduct, data: products } = queryProduct;
  const dataProduct =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });
  useEffect(() => {
    if (isSuccess && data?.status === "Ok") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  //update
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "Ok") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);
  //deleted
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "Ok") {
      message.success();
      handleCancelDelete();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMutiple && dataDeletedMutiple?.status === "Ok") {
      message.success();
    } else if (isErrorDeletedMutiple) {
      message.error();
    }
  }, [isSuccessDeletedMutiple]);

  const handleCancel = () => {
    setIsModalOpen(false);
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

    form.resetFields();
  };

  // delete sản phẩm
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    handleCancelDelete();
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetail({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    console.log("state", stateProduct);
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
    handleCancel();
  };
  const handleDeleteMutipleProducts = (ids) => {
    mutationDeleteMutiple.mutate(
      { id: ids },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
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
  const handleOnchangeImageProductDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview,
    });
  };

  //OnClick update productt
  const fetchGetDetailProduct = async () => {
    const res = await ProductService.getDetailProduct(rowSelected);
    if (res?.data) {
      setStateProductDetail({
        name: res?.data.name,
        price: res?.data.price,
        type: res?.data.type,
        description: res?.data.description,
        rating: res?.data.rating,
        image: res?.data.image,
        countInStock: res?.data.countInStock,
        discount: res?.data.discount,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateProductDetail);
  }, [form, stateProductDetail]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailProduct(rowSelected);
    }
    setIsLoadingUpdate(false);
  }, [rowSelected]);

  const handleEditProduct = () => {
    setIsOpenDrawer(true);
  };
  const handleOnchangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
  };
  //update product
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, ...stateProductDetail },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    handleCloseDrawer();
  };
  //loại sản phẩm
  const handleOnchangeSelect = (value) => {
    if (value !== "add-type") {
      setStateProduct({
        ...stateProduct,
        type: value,
      });
    } else {
      setTypeSelect(value);
    }
  };
  return (
    <div className="product-management-admin-container">
      <h1>Quản lý sản phẩm</h1>
      <Button className="btn-product-admin-management add" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
        Thêm
      </Button>
      <div className="table-content-management-product">
        <TableComponent
          columns={columns}
          handleDeleteMutipleProducts={handleDeleteMutipleProducts}
          data={dataProduct}
          isLoading={isLoadingProduct}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              }, // click row
            };
          }}
        />
      </div>
      {/* bảng sản phẩm */}
      <ModalComponent forceRender title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>
          <Form
            form={form}
            name="formProduct"
            className="create-product-form"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            autoComplete="on"
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              valuePropName="field"
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
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại sản phẩm!",
                },
              ]}
              label="Loại sản phẩm"
              name="type"
            >
              <Select
                name="type"
                value={typeSelect}
                onChange={handleOnchangeSelect}
                style={{
                  width: 200,
                }}
                options={renderOptions(typeProduct)}
              />
              {typeSelect === "add-type" && (
                <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
              )}
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

            <Form.Item label="Ảnh">
              <Upload
                maxCount={1}
                name="image"
                className="upload-file-image-product"
                onChange={handleOnchangeImageProduct}
              >
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
      </ModalComponent>
      {/* sửa sản phẩm */}
      <DrawerComponent
        width="80vw"
        title="Chi tiết sản phẩm"
        placement="left"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            form={form}
            name="productForm"
            className="create-product-form"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: "100%",
            }}
            onFinish={onUpdateProduct}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm!",
                },
              ]}
            >
              <InputComponent value="name" onChange={handleOnchangeDetail} name="name" />
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
              <InputComponent value={stateProductDetail.type} onChange={handleOnchangeDetail} name="type" />
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
              <InputComponent value={stateProductDetail.price} onChange={handleOnchangeDetail} name="price" />
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
              <InputComponent
                value={stateProductDetail.description}
                onChange={handleOnchangeDetail}
                name="description"
              />
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
              <InputComponent value={stateProductDetail.discount} onChange={handleOnchangeDetail} name="discount" />
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
              <InputComponent
                value={stateProductDetail.countInStock}
                onChange={handleOnchangeDetail}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item label="Ảnh" name="image">
              <Upload maxCount={1} className="upload-file-image-product" onChange={handleOnchangeImageProductDetail}>
                <ButtonComponent icon={<UploadOutlined />} textButton="Tải ảnh lên"></ButtonComponent>
              </Upload>
              {stateProductDetail.image && (
                <img src={stateProductDetail.image} alt="productimage" className="product-image-management" />
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
              <InputComponent value={stateProductDetail.rating} onChange={handleOnchangeDetail} name="rating" />
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
                textButton="Cập nhật"
              ></ButtonComponent>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      {/* xóa sản phẩm */}
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onOk={handleDeleteProduct}
        onCancel={handleCancelDelete}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div className="question-when-delete-product">
            <p className="content-questions">Bạn có chắc muốn xóa sản phẩm không ?</p>
          </div>
        </Loading>
      </ModalComponent>
    </div>
  );
}

export default AdminProduct;
