/* ------------------------------------------------------------------------- *
 * Copyright 2002-2025, OpenNebula Project, OpenNebula Systems               *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may   *
 * not use this file except in compliance with the License. You may obtain   *
 * a copy of the License at                                                  *
 *                                                                           *
 * http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 * ------------------------------------------------------------------------- */
import { Alert } from '@mui/material'
import {
  STEP_ID as EXTRA_ID,
  TabType,
} from '@modules/components/Forms/VnTemplate/CreateForm/Steps/ExtraConfiguration'
import {
  FIELDS,
  SECTIONS,
} from '@modules/components/Forms/VnTemplate/CreateForm/Steps/ExtraConfiguration/qos/schema'
import { Translate } from '@modules/components/HOC'
import QoSIcon from 'iconoir-react/dist/DataTransferBoth'
import PropTypes from 'prop-types'

import FormWithSchema from '@modules/components/Forms/FormWithSchema'
import { T } from '@ConstantsModule'

const QoSContent = ({ oneConfig, adminGroup }) => (
  <>
    <Alert severity="info" variant="outlined">
      <Translate word={T.MessageQos} />
    </Alert>
    {SECTIONS(oneConfig, adminGroup).map(({ id, ...section }) => (
      <FormWithSchema
        key={id}
        id={EXTRA_ID}
        cy={`${EXTRA_ID}-${id}`}
        {...section}
      />
    ))}
  </>
)

QoSContent.propTypes = {
  oneConfig: PropTypes.object,
  adminGroup: PropTypes.bool,
}

/** @type {TabType} */
const TAB = {
  id: 'qos',
  name: T.QoS,
  icon: QoSIcon,
  Content: QoSContent,
  getError: (error) => FIELDS().some(({ name }) => error?.[name]),
}

export default TAB
