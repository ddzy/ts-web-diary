import * as React from 'react';
import {
  Form,
} from "antd";
import { FormComponentProps } from 'antd/lib/form';

import SettingsViewProfileEditTableContext from '../context/SettingsViewProfileEditTableContext';


const Provider = SettingsViewProfileEditTableContext.Provider as any;


export interface ISettingsViewProfileEditTableRowProps extends FormComponentProps {
  [key: string]: any;
};


const SettingsViewProfileEditTableRow = React.memo((
  props: ISettingsViewProfileEditTableRowProps
) => {
  return (
    <Provider value={props.form}>
      <tr {...props as any} />
    </Provider>
  );
});

export default Form.create()(SettingsViewProfileEditTableRow);