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
import { DATASTORE_TYPES, INPUT_TYPES, T } from '@ConstantsModule'
import { Field } from '@UtilsModule'
import { array, boolean, number, string } from 'yup'
import { isCeph, isLvm, isShared, isSsh, typeIsOneOf } from '../../functions'

/** @type {Field} - Options field */
const RESTRICTED_DIRS = {
  name: 'RESTRICTED_DIRS',
  label: T.RestrictedDirs,
  tooltip: [T.PressKeysToAddAValue, ['ENTER']],
  type: INPUT_TYPES.AUTOCOMPLETE,
  multiple: true,
  validation: array(string().trim()).default(() => []),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    !typeIsOneOf(type, [isShared, isSsh, isCeph, isLvm]) && INPUT_TYPES.HIDDEN,
  fieldProps: {
    freeSolo: true,
  },
  grid: { xs: 12, md: 12 },
}

/** @type {Field} - Options field */
const SAFE_DIRS = {
  name: 'SAFE_DIRS',
  label: T.SafeDirs,
  tooltip: [T.PressKeysToAddAValue, ['ENTER']],
  type: INPUT_TYPES.AUTOCOMPLETE,
  multiple: true,
  validation: array(string().trim()).default(() => []),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    !typeIsOneOf(type, [isShared, isSsh, isCeph, isLvm]) && INPUT_TYPES.HIDDEN,
  fieldProps: {
    freeSolo: true,
  },
  grid: { xs: 12, md: 12 },
}

const STAGING_DIR = {
  name: 'STAGING_DIR',
  label: T.StagingDirectoryForImageRegistration,
  type: INPUT_TYPES.TEXT,
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    !typeIsOneOf(type, [isShared, isSsh, isCeph]) && INPUT_TYPES.HIDDEN,
  validation: string().trim().notRequired(),
  grid: { xs: 12, md: 12 },
}

/** @type {Field} - Storage limit field */
const LIMIT_MB = {
  name: 'LIMIT_MB',
  label: T.StorageUsageLimit,
  type: INPUT_TYPES.TEXT,
  validation: number(),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    typeIsOneOf(type, [isShared, isSsh, isCeph, isLvm])
      ? 'number'
      : INPUT_TYPES.HIDDEN,
  grid: { xs: 12, md: 6 },
}

/** @type {Field} - Transfer limit field */
const LIMIT_TRANSFER_BW = {
  name: 'LIMIT_TRANSFER_BW',
  label: T.TransferBandwidthLimit,
  type: INPUT_TYPES.TEXT,
  validation: number(),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    typeIsOneOf(type, [isShared, isSsh, isCeph, isLvm])
      ? 'number'
      : INPUT_TYPES.HIDDEN,
  grid: { xs: 12, md: 6 },
}

/** @type {Field} - LVM_THIN_ENABLE field */
const LVM_THIN_ENABLE = {
  name: 'LVM_THIN_ENABLE',
  label: T.LvmThin,
  type: INPUT_TYPES.SWITCH,
  validation: boolean().yesOrNo().default(true),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) => !typeIsOneOf(type, [isLvm]) && INPUT_TYPES.HIDDEN,
  grid: { xs: 12, md: 12 },
}

/** @type {Field} - No decompress field */
const NO_DECOMPRESS = {
  name: 'NO_DECOMPRESS',
  label: T.DoNotTryToUntarOrDecompress,
  type: INPUT_TYPES.SWITCH,
  validation: boolean().yesOrNo(),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    !typeIsOneOf(type, [isShared, isSsh, isCeph, isLvm]) && INPUT_TYPES.HIDDEN,
  grid: { xs: 12, md: 6 },
}

/** @type {Field} - Check capacity field */
const DATASTORE_CAPACITY_CHECK = {
  name: 'DATASTORE_CAPACITY_CHECK',
  label: T.CheckDSCapacityBeforeCreatingImage,
  type: INPUT_TYPES.SWITCH,
  validation: boolean().yesOrNo(),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    !typeIsOneOf(type, [isShared, isSsh, isCeph, isLvm]) && INPUT_TYPES.HIDDEN,
  grid: { xs: 12, md: 6 },
}

/** @type {Field} - Host bridge field */
const BRIDGE_LIST = {
  name: 'BRIDGE_LIST',
  label: T.HostBridgeList,
  tooltip: [T.PressKeysToAddAValue, ['ENTER']],
  type: INPUT_TYPES.AUTOCOMPLETE,
  multiple: true,
  validation: array(string().trim())
    .compact()
    .default(() => [])
    .when('$general.STORAGE_BACKEND', (storageBackend, schema) =>
      isCeph(storageBackend)
        ? schema.min(1, 'Is a required field').required()
        : schema.notRequired()
    ),
  dependOf: '$general.STORAGE_BACKEND',
  htmlType: (type) =>
    !typeIsOneOf(type, [isShared, isSsh, isCeph]) && INPUT_TYPES.HIDDEN,
  fieldProps: {
    freeSolo: true,
  },
  grid: { xs: 12, md: 12 },
}

/** @type {Field} - Qcow2 standalone field */
const QCOW2_STANDALONE = {
  name: 'QCOW2_STANDALONE',
  label: T.StandaloneQcow2Clone,
  tooltip: T.StandaloneQcow2CloneConcept,
  type: INPUT_TYPES.SWITCH,
  validation: boolean().yesOrNo(),
  htmlType: (_, context) => {
    const { general: { STORAGE_BACKEND, TYPE } = {} } =
      context?.getValues() || {}
    if (
      !typeIsOneOf(STORAGE_BACKEND, [isShared]) &&
      TYPE === DATASTORE_TYPES.IMAGE.value
    ) {
      return INPUT_TYPES.HIDDEN
    }
  },
  grid: { xs: 12, md: 6 },
}

/** @type {Field} - NFS_AUTO_ENABLE field */
const NFS_AUTO_ENABLE = {
  name: 'NFS_AUTO_ENABLE',
  label: T.NfsAutoEnable,
  tooltip: T.NfsAutoEnableConcept,
  type: INPUT_TYPES.SWITCH,
  dependOf: ['$general.STORAGE_BACKEND', '$general.TYPE'],
  htmlType: ([STORAGE_BACKEND, TYPE] = []) => {
    if (
      !typeIsOneOf(STORAGE_BACKEND, [isShared]) ||
      TYPE !== DATASTORE_TYPES.IMAGE.value
    ) {
      return INPUT_TYPES.HIDDEN
    }
  },
  validation: boolean().yesOrNo(),
  grid: { xs: 12, md: 6 },
}

const NFS_AUTO_HOST = {
  name: 'NFS_AUTO_HOST',
  label: T.NfsAutoHost,
  tooltip: T.NfsAutoHostConcept,
  type: INPUT_TYPES.TEXT,
  dependOf: ['$general.STORAGE_BACKEND', '$general.TYPE', NFS_AUTO_ENABLE.name],
  htmlType: ([STORAGE_BACKEND, TYPE, NFS_AUTO_ENABLE_VALUE] = []) => {
    if (
      !typeIsOneOf(STORAGE_BACKEND, [isShared]) ||
      TYPE !== DATASTORE_TYPES.IMAGE.value ||
      !NFS_AUTO_ENABLE_VALUE
    ) {
      return INPUT_TYPES.HIDDEN
    }
  },
  validation: string()
    .trim()
    .when(['$general.STORAGE_BACKEND', '$general.TYPE', NFS_AUTO_ENABLE.name], {
      is: (STORAGE_BACKEND, TYPE, NFS_AUTO_ENABLE_VALUE) =>
        typeIsOneOf(STORAGE_BACKEND, [isShared]) &&
        TYPE === DATASTORE_TYPES.IMAGE.value &&
        NFS_AUTO_ENABLE_VALUE,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.strip(),
    }),
  grid: { xs: 12, md: 6 },
}

const NFS_AUTO_PATH = {
  name: 'NFS_AUTO_PATH',
  label: T.NfsAutoPath,
  tooltip: T.NfsAutoPathConcept,
  type: INPUT_TYPES.TEXT,
  dependOf: ['$general.STORAGE_BACKEND', '$general.TYPE', NFS_AUTO_ENABLE.name],
  htmlType: ([STORAGE_BACKEND, TYPE, NFS_AUTO_ENABLE_VALUE] = []) => {
    if (
      !typeIsOneOf(STORAGE_BACKEND, [isShared]) ||
      TYPE !== DATASTORE_TYPES.IMAGE.value ||
      !NFS_AUTO_ENABLE_VALUE
    ) {
      return INPUT_TYPES.HIDDEN
    }
  },
  validation: string()
    .trim()
    .when(['$general.STORAGE_BACKEND', '$general.TYPE', NFS_AUTO_ENABLE.name], {
      is: (STORAGE_BACKEND, TYPE, NFS_AUTO_ENABLE_VALUE) =>
        typeIsOneOf(STORAGE_BACKEND, [isShared]) &&
        TYPE === DATASTORE_TYPES.IMAGE.value &&
        NFS_AUTO_ENABLE_VALUE,
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.strip(),
    }),
  grid: { xs: 12, md: 6 },
}

const NFS_AUTO_OPTS = {
  name: 'NFS_AUTO_OPTS',
  label: T.NfsAutoOpts,
  tooltip: [T.PressKeysToAddAValue, ['ENTER']],
  type: INPUT_TYPES.AUTOCOMPLETE,
  multiple: true,
  dependOf: ['$general.STORAGE_BACKEND', '$general.TYPE', NFS_AUTO_ENABLE.name],
  htmlType: ([STORAGE_BACKEND, TYPE, NFS_AUTO_ENABLE_VALUE] = []) => {
    if (
      !typeIsOneOf(STORAGE_BACKEND, [isShared]) ||
      TYPE !== DATASTORE_TYPES.IMAGE.value ||
      !NFS_AUTO_ENABLE_VALUE
    ) {
      return INPUT_TYPES.HIDDEN
    }
  },
  validation: array(string().trim())
    .default(() => undefined)
    .afterSubmit((value, { context }) =>
      context?.confAttributes ? value?.join(',') : undefined
    ),
  fieldProps: {
    freeSolo: true,
  },
  grid: { xs: 12, md: 6 },
}

/** @type {Field[]} - Common fields */
export const COMMON_FIELDS = [
  RESTRICTED_DIRS,
  SAFE_DIRS,
  BRIDGE_LIST,
  STAGING_DIR,
  LIMIT_MB,
  LIMIT_TRANSFER_BW,
  LVM_THIN_ENABLE,
  NO_DECOMPRESS,
  DATASTORE_CAPACITY_CHECK,
  QCOW2_STANDALONE,
  NFS_AUTO_ENABLE,
  NFS_AUTO_HOST,
  NFS_AUTO_PATH,
  NFS_AUTO_OPTS,
]
