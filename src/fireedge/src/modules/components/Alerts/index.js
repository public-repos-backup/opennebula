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
import PropTypes from 'prop-types'

import { Box, Alert } from '@mui/material'
import { Tr } from '@modules/components/HOC'

export const AlertError = ({ children, ...props }) => (
  <Box pt={3} display="flex" justifyContent="center" {...props}>
    <Alert severity="error" icon={false} variant="filled">
      {typeof children === 'string' ? Tr(children) : children}
    </Alert>
  </Box>
)

AlertError.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

AlertError.defaultProps = {
  children: 'Error!',
}

export default AlertError
