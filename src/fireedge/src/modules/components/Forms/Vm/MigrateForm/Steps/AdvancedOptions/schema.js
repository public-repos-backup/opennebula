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
import { boolean, object, string } from 'yup'

import { INPUT_TYPES, T } from '@ConstantsModule'
import { DatastoresTable } from '@modules/components/Tables'
import { getValidationFromFields } from '@UtilsModule'

const ENFORCE = {
  name: 'enforce',
  label: T.EnforceCapacityChecks,
  tooltip: T.EnforceCapacityChecksConcept,
  type: INPUT_TYPES.SWITCH,
  validation: boolean().default(() => false),
  grid: { md: 12 },
}

const DATASTORE = {
  name: 'datastore',
  label: T.SelectTheNewDatastore,
  type: INPUT_TYPES.TABLE,
  Table: () => DatastoresTable.Table,
  fieldProps: {
    initialState: {
      filters: [{ id: 'type', value: 'SYSTEM_DS' }],
    },
  },
  validation: string()
    .trim()
    .notRequired()
    .default(() => undefined),
  grid: { md: 12 },
}

export const FIELDS = [ENFORCE, DATASTORE]

export const SCHEMA = object(getValidationFromFields(FIELDS))
