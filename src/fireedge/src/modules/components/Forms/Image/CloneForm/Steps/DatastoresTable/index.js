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
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'

import { DatastoresTable } from '@modules/components/Tables'
import { SCHEMA } from '@modules/components/Forms/Image/CloneForm/Steps/DatastoresTable/schema'

import { Step, decodeBase64 } from '@UtilsModule'
import { T, DATASTORE_TYPES } from '@ConstantsModule'

export const STEP_ID = 'datastore'

const Content = ({ data, app }) => {
  const { NAME } = data?.[0] ?? {}
  const { setValue } = useFormContext()

  const isKernelType = useMemo(() => {
    const appTemplate = String(decodeBase64(app?.TEMPLATE?.APPTEMPLATE64, ''))

    return appTemplate.includes('TYPE="KERNEL"')
  }, [])

  const handleSelectedRows = (rows) => {
    const { original = {} } = rows?.[0] ?? {}

    setValue(STEP_ID, original.ID !== undefined ? [original] : [])
  }

  return (
    <DatastoresTable.Table
      singleSelect
      disableGlobalSort
      displaySelectedRows
      pageSize={5}
      filter={(datastores) =>
        // 0 = image
        datastores?.filter(({ TYPE }) => +TYPE === DATASTORE_TYPES.IMAGE.id) ??
        []
      }
      getRowId={(row) => String(row.NAME)}
      initialState={{
        selectedRowIds: { [NAME]: true },
        filters: [{ id: 'TYPE', value: isKernelType ? 'FILE' : 'IMAGE' }],
      }}
      onSelectedRowsChange={handleSelectedRows}
    />
  )
}

/**
 * Step to select the Datastore.
 *
 * @param {object} app - Marketplace App resource
 * @returns {Step} Datastore step
 */
const DatastoreStep = (app) => ({
  id: STEP_ID,
  label: T.SelectDatastoreImage,
  resolver: SCHEMA,
  content: (props) => Content({ ...props, app }),
})

Content.propTypes = {
  data: PropTypes.any,
  setFormData: PropTypes.func,
  app: PropTypes.object,
}

export default DatastoreStep
