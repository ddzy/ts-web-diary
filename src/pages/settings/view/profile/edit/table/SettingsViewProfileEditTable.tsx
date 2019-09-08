import * as React from 'react';
import {
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import {
  Table,
  notification,
} from 'antd';

import {
  TableWrapper,
  TableMain,
} from './style';
import SettingsViewProfileEditTableRow from './row/SettingsViewProfileEditTableRow';
import SettingsViewProfileEditTableCell from './cell/SettingsViewProfileEditTableCell';
import { query } from 'services/request';


export interface ISettingsViewProfileEditTableProps extends RouteComponentProps { };
export interface ISettingsViewProfileEditTableState {
  // ? 表格的数据
  tableData: any;
  // ? 是否显示表格首次获取数据时的loading
  isShowFirstlyLoading: boolean;
}


const SettingsViewProfileEditTable = React.memo((props: ISettingsViewProfileEditTableProps) => {

  const [state, setState] = React.useState<ISettingsViewProfileEditTableState>({
    tableData: [],
    isShowFirstlyLoading: false,
  });

  React.useEffect(() => {
    _getAndInitTableData();
  }, []);


  /**
   * [获取] - 获取用户的可以编辑的信息
   */
  function _getAndInitTableData() {
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    setState({
      ...state,
      isShowFirstlyLoading: true,
    });

    query({
      method: 'GET',
      url: '/api/user/info/detail',
      jsonp: false,
      data: {
        userId,
      },
    }).then((res) => {
      const { code } = res;
      const { userInfo } = res.data;
      const {
        usergender,
        address,
        website,
        introduction,
        job,
        education,
      } = userInfo;

      let tableData: any[] = [];

      if (code === 0) {
        tableData = [
          {
            key: 'usergender',
            name: '性别',
            value: usergender,
          },
          {
            key: 'address',
            name: '居住地',
            value: address
          },
          {
            key: 'website',
            name: '个人网站',
            value: website,
          },
          {
            key: 'introduction',
            name: '个人简介',
            value: introduction,
          },
          {
            key: 'job',
            name: '所处行业',
            value: job,
          },
          {
            key: 'education',
            name: '学历',
            value: education,
          },
        ];
      }

      setState({
        ...state,
        isShowFirstlyLoading: false,
        tableData,
      });
    });
  }

  /**
   * [初始化] - 表格的列
   */
  function _initTableColumn() {
    return [
      {
        title: 'name',
        dataIndex: 'name',
      },
      {
        title: 'value',
        dataIndex: 'value',
        editable: true,
        onCell(record: any) {
          return {
            record,
            editable: this.editable,
            dataIndex: this.dataIndex,
            handleSave,
          };
        },
      },
      {
        title: 'edit',
        dataIndex: 'edit',
        render: () => {
          return (
            <a style={{ color: '#1da57a' }}>Edit</a>
          );
        },
      },
    ];
  }

  /**
   * [初始化] - 自定义表格组件
   */
  function _initTableComponents() {
    return {
      body: {
        row: SettingsViewProfileEditTableRow,
        cell: SettingsViewProfileEditTableCell,
      },
    };
  }

  /**
   * [处理] - 保存每一个单元格编辑后的值, 并更新源数据
   * @param row 表格的每一行
   */
  function handleSave(row: any) {
    const newTableData = [...state.tableData];
    const foundRowIndex = newTableData.findIndex(item => row.key === item.key);
    const foundRow = newTableData[foundRowIndex];

    newTableData.splice(foundRowIndex, 1, {
      ...foundRow,
      ...row,
    });

    // 用户鉴权
    const userId = localStorage.getItem('userid');

    if (!userId) {
      notification.error({
        message: '错误',
        description: '用户凭证已过期, 请重新登录!',
      });

      return props.history.push('/login');
    }

    // 组装数据
    const composedUserInfo = {
      userId,
    };
    newTableData.forEach((v) => {
      composedUserInfo[v.key] = v.value;
    });

    // 更新数据库
    query({
      url: '/api/user/update/profile',
      method: 'POST',
      jsonp: false,
      data: {
        ...composedUserInfo,
      },
    }).then((res) => {
      const { code } = res;

      if (code === 0) {
        setState({
          ...state,
          tableData: newTableData,
        });
      }
    });
  }

  return (
    <TableWrapper>
      <TableMain>
        <Table
          showHeader={false}
          bordered={false}
          pagination={false}
          loading={state.isShowFirstlyLoading}
          dataSource={state.tableData}
          columns={_initTableColumn()}
          components={_initTableComponents()}
        />
      </TableMain>
    </TableWrapper>
  );
});

export default withRouter(SettingsViewProfileEditTable);