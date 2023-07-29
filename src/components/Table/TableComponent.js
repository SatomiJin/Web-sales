import { Pagination, Space, Table } from "antd";
import { useState } from "react";
import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

import "./TableComponent.css";
import Loading from "../../loading/Loading";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

function TableComponent(props) {
  const tableRef = useRef(null);
  const { selectionType = "checkbox", data, columns, handleDeleteMutipleProducts, isLoading = false } = props;
  const [rowSelected, setRowSelected] = useState([]);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelected(selectedRowKeys);
      console.log("selectedRowKeys", selectedRowKeys);
    },
  };

  //xóa all
  const handleDeleteAll = () => {
    handleDeleteMutipleProducts(rowSelected);
  };

  return (
    <Loading isLoading={isLoading}>
      <div className="table-component-container">
        {rowSelected.length > 0 && (
          <div>
            <Space>
              <ButtonComponent
                onClick={handleDeleteAll}
                style={{ marginBottom: 10, marginLeft: 20 }}
                textButton="Xóa tất cả"
              />
            </Space>
          </div>
        )}
        <DownloadTableExcel filename="table-xls" sheet="users" currentTableRef={tableRef.current}>
          <ButtonComponent
            style={{ padding: 10, marginBottom: 10, marginLeft: 60 }}
            size="large"
            textButton="Tải về file excel"
          />
        </DownloadTableExcel>

        <Table
          ref={tableRef}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          {...props}
        />
      </div>
    </Loading>
  );
}

export default TableComponent;
