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
import { Alert, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import { memo, useMemo } from 'react'
import { OpenNebulaLogo } from '@modules/components/Icons'

import { RESOURCE_NAMES } from '@ConstantsModule'
import { useViews, DatastoreAPI } from '@FeaturesModule'
import { getAvailableInfoTabs } from '@ModelsModule'

import { BaseTab as Tabs } from '@modules/components/Tabs'
import Clusters from '@modules/components/Tabs/Datastore/Clusters'
import Images from '@modules/components/Tabs/Datastore/Images'
import Info from '@modules/components/Tabs/Datastore/Info'

const getTabComponent = (tabName) =>
  ({
    info: Info,
    images: Images,
    clusters: Clusters,
  }[tabName])

const DatastoreTabs = memo(({ id }) => {
  const { view, getResourceView } = useViews()
  const { isError, error, status, data } = DatastoreAPI.useGetDatastoreQuery({
    id,
  })

  const tabsAvailable = useMemo(() => {
    const resource = RESOURCE_NAMES.DATASTORE
    const infoTabs = getResourceView(resource)?.['info-tabs'] ?? {}

    return getAvailableInfoTabs(infoTabs, getTabComponent, id)
  }, [view, id])

  if (isError) {
    return (
      <Alert severity="error" variant="outlined">
        {error.data}
      </Alert>
    )
  }

  if (status === 'fulfilled' || id === data?.ID) {
    return <Tabs addBorder tabs={tabsAvailable ?? []} />
  }

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <OpenNebulaLogo width={150} height={150} spinner />
    </Stack>
  )
})

DatastoreTabs.propTypes = { id: PropTypes.string.isRequired }
DatastoreTabs.displayName = 'DatastoreTabs'

export default DatastoreTabs
