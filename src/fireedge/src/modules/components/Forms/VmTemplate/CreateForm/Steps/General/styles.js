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
import { css } from '@emotion/css'

const useStyles = (theme) => ({
  root: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    gap: theme.spacing(1),
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  }),
  osprofiles: css({
    gridColumn: '1 / span 2',
    gridRow: '2',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1 / -1',
    },
  }),
  hypervisor: css({
    gridColumn: '1 / span 2',
    gridRow: '1',
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1 / -1',
    },
  }),
})

export default useStyles
