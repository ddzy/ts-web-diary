import * as React from 'react';

import {
  EditWrapper,
  EditMain,
} from './style';
import SettingsViewProfileEditTable from './table/SettingsViewProfileEditTable';


export interface ISettingsViewProfileEditProps { };
export interface ISettingsViewProfileEditState { }


const SettingsViewProfileEdit = React.memo((props: ISettingsViewProfileEditProps) => {
  return (
    <EditWrapper>
      <EditMain>
        <SettingsViewProfileEditTable />
      </EditMain>
    </EditWrapper>
  );
});

export default SettingsViewProfileEdit;