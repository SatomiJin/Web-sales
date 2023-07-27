import { Table } from "antd";

import "./TableComponent.css";
import Loading from "../../loading/Loading";

function TableComponent(props) {
  const { selectionType = "checkbox", data, columns, isLoading = false } = props;

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Loading isLoading={isLoading}>
      <div className="table-component-container">
        <Table
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
