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
/* eslint-disable jsdoc/require-jsdoc */
import { T } from '@ConstantsModule'

const getTotalOfResources = (resources) =>
  [resources?.ID ?? []].flat().length || 0

export default [
  { Header: T.ID, accessor: 'ID', sortType: 'number' },
  { Header: T.Name, accessor: 'NAME' },
  { Header: T.Owner, accessor: 'UNAME' },
  { Header: T.Group, accessor: 'GNAME' },
  {
    Header: T.TotalVms,
    id: 'VMS',
    accessor: (row) => getTotalOfResources(row?.VMS),
    sortType: 'number',
  },
  {
    Header: T.Label,
    id: 'label',
    accessor: 'TEMPLATE.LABELS',
    filter: 'inclusiveArrayMatch',
  },
]
