import * as React from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
} from 'antd';


import SettingsViewProfileEditTableContext from '../context/SettingsViewProfileEditTableContext';


export interface ISettingsViewProfileEditTableCellProps {
  // ? 当前单元格是否可编辑
  editable: boolean;
  // ? 当前单元格所处列的名称
  dataIndex: string;
  // ? 当前单元格所处的行的数据
  record: any;
  // ? 默认渲染的节点
  children: React.ReactChild;

  handleSave: (data: any) => void;
};
export interface ISettingsViewProfileEditTableCellState {
  // ? 标识当前单元格是否可编辑
  isEditable: boolean;
};

const SettingsViewProfileEditTableCell = React.memo((props: ISettingsViewProfileEditTableCellProps) => {

  const {
    editable,
    dataIndex,
    record,
    handleSave,
    children,
    ...restProps
  } = props;

  let oForm: any = null;

  const [state, setState] = React.useState<ISettingsViewProfileEditTableCellState>({
    isEditable: false,
  });


  /**
   * [初始化] - 单元格内容
   * @description 根据单元格的可编辑状态, 初始化其对应的内容
   * @param f 表单元素
   */
  function _initCell(f: Form) {
    oForm = f;

    const { isEditable } = state;

    return isEditable ? (
      <Form.Item style={{ margin: 0 }}>
        {
          oForm.getFieldDecorator(dataIndex, {
            rules: [],
            initialValue: record[dataIndex],
          })(_initFormInput())
        }
      </Form.Item>
    ) : (
        <div
          style={{
            width: '100%',
            minHeight: 35,
            paddingRight: 24,
          }}
          onClick={handleToggleEdit}
        >
          {children}
        </div>
      );
  }

  /**
   * [初始化] - 根据每一行不同的数据类型, 初始化不同类型的输入框
   * @param record 表格每一行的记录值
   */
  function _initFormInput(): JSX.Element {
    const type = record.key;

    const categoryDesign = {
      usergender() {
        return (
          <Radio.Group
            buttonStyle="solid"
            onMouseLeave={handleSend}
          >
            <Radio.Button value="male">男</Radio.Button>
            <Radio.Button value="female">女</Radio.Button>
          </Radio.Group>
        );
      },
      address() {
        return (
          <Select
            style={{ width: 120 }}
            onBlur={handleSend}
          >
            <Select.Option value="广东">广东</Select.Option>
            <Select.Option value="甘肃">甘肃</Select.Option>
            <Select.Option value="陕西">陕西</Select.Option>
            <Select.Option value="浙江">浙江</Select.Option>
            <Select.Option value="福建">福建</Select.Option>
            <Select.Option value="广西">广西</Select.Option>
            <Select.Option value="湖南">湖南</Select.Option>
          </Select>
        );
      },
      job() {
        return (
          <Select
            style={{ width: 120 }}
            onBlur={handleSend}
          >
            <Select.Option value="计算机软件">计算机软件</Select.Option>
            <Select.Option value="金融">金融</Select.Option>
            <Select.Option value="销售">销售</Select.Option>
            <Select.Option value="会计">会计</Select.Option>
            <Select.Option value="教师">教师</Select.Option>
            <Select.Option value="无业">无业</Select.Option>
            <Select.Option value="保密">保密</Select.Option>
          </Select>
        );
      },
      education() {
        return (
          <Select
            style={{
              width: 120,
            }}
            onBlur={handleSend}
          >
            <Select.Option value="中专">中专</Select.Option>
            <Select.Option value="大专">大专</Select.Option>
            <Select.Option value="专科">专科</Select.Option>
            <Select.Option value="本科">本科</Select.Option>
            <Select.Option value="研究生">研究生</Select.Option>
            <Select.Option value="博士">博士</Select.Option>
            <Select.Option value="教授">教授</Select.Option>
          </Select>
        );
      },
      website() {
        return (
          <Input
            placeholder="eg: https://blog.yyge.top"
            onPressEnter={handleSend}
            onBlur={handleSend}
          />
        );
      },
      introduction() {
        return (
          <Input.TextArea
            placeholder="eg: 我是一只程序员...世人皆称为码农, 但我还是喜欢以攻城狮自居"
            onPressEnter={handleSend}
            onBlur={handleSend}
          />
        );
      },
    };

    return categoryDesign[type] ? categoryDesign[type]() : null;
  }

  /**
   * [处理] - 切换单元格的可编辑状态
   */
  function handleToggleEdit() {
    setState({
      isEditable: !state.isEditable,
    });
  }

  /**
   * [处理] - 保存当前可编辑单元格的更改
   * @param e 事件对象
   */
  function handleSend(e: any) {
    oForm.validateFields((error: any, values: any) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }

      handleToggleEdit();

      handleSave({
        ...record,
        ...values,
      });
    });
  }

  return (
    <td {...restProps}>
      {
        editable
          ? (
            <SettingsViewProfileEditTableContext.Consumer>
              {_initCell}
            </SettingsViewProfileEditTableContext.Consumer>
          )
          : (
            children
          )
      }
    </td>
  );
});

export default SettingsViewProfileEditTableCell;