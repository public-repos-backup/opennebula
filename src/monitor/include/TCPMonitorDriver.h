/* -------------------------------------------------------------------------- */
/* Copyright 2002-2025, OpenNebula Project, OpenNebula Systems                */
/*                                                                            */
/* Licensed under the Apache License, Version 2.0 (the "License"); you may    */
/* not use this file except in compliance with the License. You may obtain    */
/* a copy of the License at                                                   */
/*                                                                            */
/* http://www.apache.org/licenses/LICENSE-2.0                                 */
/*                                                                            */
/* Unless required by applicable law or agreed to in writing, software        */
/* distributed under the License is distributed on an "AS IS" BASIS,          */
/* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.   */
/* See the License for the specific language governing permissions and        */
/* limitations under the License.                                             */
/* -------------------------------------------------------------------------- */

#ifndef TCP_MONITOR_DRIVER_H_
#define TCP_MONITOR_DRIVER_H_

#include "MonitorDriverMessages.h"
#include "MonitorDriverProtocol.h"
#include "TCPStream.h"

class TCPMonitorDriver : public TCPStream<monitor_msg_t>
{
public:

    TCPMonitorDriver(const std::string& a, unsigned int p)
        :TCPStream(a, p)
    {
        register_action(MonitorDriverMessages::UNDEFINED,
                        &MonitorDriverProtocol::_undefined);

        register_action(MonitorDriverMessages::MONITOR_VM,
                        &MonitorDriverProtocol::_monitor_vm);

        register_action(MonitorDriverMessages::BEACON_HOST,
                        &MonitorDriverProtocol::_beacon_host);

        register_action(MonitorDriverMessages::MONITOR_HOST,
                        &MonitorDriverProtocol::_monitor_host);

        register_action(MonitorDriverMessages::SYSTEM_HOST,
                        &MonitorDriverProtocol::_system_host);

        register_action(MonitorDriverMessages::STATE_VM,
                        &MonitorDriverProtocol::_state_vm);
    };

    ~TCPMonitorDriver() = default;
};

#endif // TCP_MONITOR_DRIVER_H_
