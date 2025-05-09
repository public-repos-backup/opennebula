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
import { string, object } from 'yup'

import { GroupsTable } from '@modules/components/Tables'
import { getValidationFromFields } from '@UtilsModule'
import { T, INPUT_TYPES } from '@ConstantsModule'

const GROUP = {
  name: 'group',
  label: T.SelectTheNewGroup,
  type: INPUT_TYPES.TABLE,
  Table: () => GroupsTable.Table,
  validation: string()
    .trim()
    .required()
    .default(() => undefined),
  grid: { md: 12 },
}

export const FIELDS = [GROUP]

export const SCHEMA = object(getValidationFromFields(FIELDS))
